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

/**
 * @brief The PubParser class
 * amenity -> pub, bar, biergarten, cafe, fast_food, food_court, ice_cream, restaurant
 * amenity -> arts_center, casino, cinema, community_center, nightclub, theatre
 */
class PubParser : public osmium::handler::Handler {
    osmium::geom::WKTFactory<> m_factory;
public:
    void node(const osmium::Node & currentNode) {
        const osmium::TagList & tags = currentNode.tags();

        if (tags.has_key("amenity") && tags.has_key("name")) {
            const char * amenity = tags["amenity"];
            const char * name = tags["name"];

            if (amenity && name
                    && !(
                        std::strcmp(amenity, "pub")
                        || std::strcmp(amenity, "bar") // TODO etc
                        )) {
                // TODO mysql insert
            }
        }

    }

    static void parse(std::string filePath) {
        osmium::handler::DynamicHandler handler;
        handler.set<PubParser>();
        osmium::io::Reader inputFile{filePath, osmium::osm_entity_bits::node};
        osmium::apply(inputFile, handler);
    }
};

#endif // PUB_PARSER_H
