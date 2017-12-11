#pragma once
// For assembling multipolygons
#include <osmium/area/assembler.hpp>
#include <osmium/area/multipolygon_manager.hpp>
// For the DynamicHandler class
#include <osmium/dynamic_handler.hpp>
// For the WKT factory
#include <osmium/geom/wkt.hpp>
// Allow any format of input files (XML, PBF, ...)
#include <osmium/io/any_input.hpp>
// For osmium::apply()
#include <osmium/visitor.hpp>
#include <osmium/index/map/sparse_file_array.hpp>
using city_index_type = osmium::index::map::SparseFileArray<osmium::unsigned_object_id_type, osmium::Location>;
#include <osmium/handler/node_locations_for_ways.hpp>
using city_location_handler_type = osmium::handler::NodeLocationsForWays<city_index_type>;

#include <iostream>
#include <cstring>

#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/stdx.hpp>
#include <mongocxx/uri.hpp>

class CityParser : public osmium::handler::Handler {
    osmium::geom::WKTFactory<> m_factory;
    mongocxx::instance instance{};
    mongocxx::client client{mongocxx::uri{"mongodb://localhost:27017"}};
    mongocxx::database database;
    mongocxx::collection collection;

    bsoncxx::builder::stream::document bsonBuilder;
public:
    CityParser()
        : database(client["event_manager"]),
          collection(database["city"]) {}

    void area(const osmium::Area & area) {
        const osmium::TagList & tags = area.tags();

        if (!(tags.has_key("admin_level")
            && tags.has_key("boundary")
            && tags.has_key("type")
            && tags.has_key("name")))
            return;

        const char * adminLevel = tags["admin_level"];
        const char * boundary = tags["boundary"];
        const char * type = tags["type"];
        const char * name = tags["name"];

        if (adminLevel && boundary && type && name
                && (!std::strcmp(adminLevel, "8")
                 && !std::strcmp(boundary, "administrative")
                 && !std::strcmp(type, "boundary")))
        {
            bsonBuilder << "name" << name;
            bsonBuilder << "wkt" << m_factory.create_multipolygon(area);

            bsoncxx::document::value cityDocument = bsonBuilder << bsoncxx::builder::stream::finalize;

            bsoncxx::stdx::optional<mongocxx::result::insert_one> result =
             collection.insert_one(cityDocument.view());
            std::cout << name << std::endl;
        }
    }

    static void parse(std::string filePath) {
           osmium::handler::DynamicHandler handler;
           handler.set<CityParser>();

           osmium::io::File input_file{filePath};
           osmium::area::Assembler::config_type assembler_config;
           assembler_config.keep_type_tag = true; // FONTOS
           osmium::TagsFilter filter{false};
           filter.add_rule(true, "admin_level", "8");
           filter.add_rule(true, "boundary", "administrative");
           filter.add_rule(true, "name");
           filter.add_rule(true, "type", "boundary");

           osmium::area::MultipolygonManager<osmium::area::Assembler> mp_manager{assembler_config, filter};

           std::cerr << "Pass 1...\n";
           osmium::relations::read_relations(input_file, mp_manager);
           std::cerr << "Pass 1 done\n";

           std::cerr << "Memory:\n";
           osmium::relations::print_used_memory(std::cerr, mp_manager.used_memory());

           city_index_type index;
           city_location_handler_type location_handler{index};
           location_handler.ignore_errors();
           std::cerr << "Pass 2...\n";
           osmium::io::Reader reader{input_file};
           osmium::apply(reader, location_handler, mp_manager.handler([&handler](osmium::memory::Buffer&& buffer) {
               osmium::apply(buffer, handler);
           }));
           reader.close();
           std::cerr << "Pass 2 done\n";

           std::cerr << "Memory:\n";
           osmium::relations::print_used_memory(std::cerr, mp_manager.used_memory());

           std::vector<osmium::object_id_type> incomplete_relations_ids;
           mp_manager.for_each_incomplete_relation([&](const osmium::relations::RelationHandle& handle){
               incomplete_relations_ids.push_back(handle->id());
           });
           if (!incomplete_relations_ids.empty()) {
               std::cerr << "Warning! Some member ways missing for these multipolygon relations:";
               for (const auto id : incomplete_relations_ids) {
                   std::cerr << " " << id;
               }
               std::cerr << "\n";
           }
       }
};

