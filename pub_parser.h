#ifndef PUB_PARSER_H
#define PUB_PARSER_H

// For the DynamicHandler class
#include <osmium/dynamic_handler.hpp>
// For the WKT factory
#include <osmium/geom/wkt.hpp>
// Allow any format of input files (XML, PBF, ...)
#include <osmium/io/any_input.hpp>
// For osmium::apply()
#include <osmium/visitor.hpp>
#include <osmium/index/map/sparse_file_array.hpp>
using pub_index_type = osmium::index::map::SparseFileArray<osmium::unsigned_object_id_type, osmium::Location>;
#include <osmium/handler/node_locations_for_ways.hpp>
using pub_location_handler_type = osmium::handler::NodeLocationsForWays<pub_index_type>;

#include <iostream>
#include <cstring>

#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/stdx.hpp>
#include <mongocxx/uri.hpp>

/**
 * @brief The PubParser class
 * amenity -> pub, bar, biergarten, cafe, fast_food, food_court, ice_cream, restaurant
 * amenity -> arts_center, casino, cinema, community_center, nightclub, theatre
 */
class PubParser : public osmium::handler::Handler {
    osmium::geom::WKTFactory<> m_factory;
    mongocxx::instance instance{};
    mongocxx::client client{mongocxx::uri{"mongodb://localhost:27017"}};
    mongocxx::database database;
    mongocxx::collection collection;

    bsoncxx::builder::stream::document bsonBuilder;
public:
    PubParser()
        : database(client["event_manager"]),
          collection(database["location"])
    {}

    void node(const osmium::Node & currentNode) {
        const osmium::TagList & tags = currentNode.tags();

        if (tags.has_key("amenity") && tags.has_key("name")) {
            const char * amenity = tags["amenity"];
            const char * name = tags["name"];
            //std::cout << "out\t" << name << "\t" << amenity << std::endl;
            if (amenity && name
                &&( !std::strcmp(amenity, "pub")
                        || !std::strcmp(amenity, "bar")
                        || !std::strcmp(amenity, "nightclub")
                        || !std::strcmp(amenity, "cafe")
                        || !std::strcmp(amenity, "restaurant")
                        || !std::strcmp(amenity, "fast_food")
                        || !std::strcmp(amenity, "theatre")
                        || !std::strcmp(amenity, "arts_centre")
                        || !std::strcmp(amenity, "biergarten")
                        || !std::strcmp(amenity, "ice_cream")
                        || !std::strcmp(amenity, "food_court")
                        || !std::strcmp(amenity, "community_center")
                        || !std::strcmp(amenity, "cinema")
                        || !std::strcmp(amenity, "casino")
                        )) {
                std::map<std::string, std::string> documents;
                documents["name"] = name;
                documents["amenity"] = amenity;
                documents["point_wkt"] = m_factory.create_point(currentNode);

                if (tags.has_key("addr:postcode")) {
                    documents["postcode"] = tags["addr:postcode"];
                }
                if (tags.has_key("addr:city")) {
                    documents["city"] = tags["addr:city"];
                }
                if (tags.has_key("addr:street")) {
                    documents["street"] = tags["addr:street"];
                }
                if (tags.has_key("addr:housenumber")) {
                    documents["housenumber"] = tags["addr:housenumber"];
                }
                if (tags.has_key("capacity")) {
                    documents["capacity"] = tags["capacity"];
                }
                if (tags.has_key("email")) {
                    documents["email"] = tags["email"];
                }
                if (tags.has_key("facebook")) {
                    documents["facebook"] = tags["facebook"];
                }
                if (tags.has_key("opening_hours")) {
                    documents["opening_hours"] = tags["opening_hours"];
                }
                if (tags.has_key("website")) {
                    documents["website"] = tags["website"];
                }
                if (tags.has_key("wheelchair")) {
                    documents["wheelchair"] = tags["wheelchair"];
                }

                for (auto & doc : documents) {
                    bsonBuilder << doc.first << doc.second;
                }

                bsoncxx::document::value pubDocument = bsonBuilder << bsoncxx::builder::stream::finalize;

                bsoncxx::stdx::optional<mongocxx::result::insert_one> result =
                 collection.insert_one(pubDocument.view());
                std::cout << name << "\t" << amenity << std::endl;
            } // if amenity & name
        } // if has_key
    }

    static void parse(std::string filePath) {
        osmium::handler::DynamicHandler handler;
        handler.set<PubParser>();
        osmium::io::Reader inputFile{filePath, osmium::osm_entity_bits::node | osmium::osm_entity_bits::way};
        osmium::apply(inputFile, handler);
    }
};

#endif // PUB_PARSER_H
