cmake_minimum_required(VERSION 2.8)

project(event-manager-osm-parser)

set(BSON_LIBRARY "/usr/lib/x86_64-linux-gnu/")
find_package(libbson-1.0 1.7 REQUIRED)
message ("--   libbson found version \"${BSON_VERSION}\"")
message ("--   libbson include path \"${BSON_INCLUDE_DIRS}\"")
message ("--   libbson libraries \"${BSON_LIBRARIES}\"")

set(MONGOC_LIBRARY "/usr/lib/x86_64-linux-gnu/")
find_package(libmongoc-1.0 1.7 REQUIRED)
message ("--   mongoc found version \"${MONGOC_VERSION}\"")
message ("--   mongoc include path \"${MONGOC_INCLUDE_DIRS}\"")
message ("--   mongoc libraries \"${MONGOC_LIBRARIES}\"")

find_package(libmongocxx REQUIRED)
message ("--   mongocxx found version \"${LIBMONGOCXX_VERSION}\"")
message ("--   mongocxx include path \"${LIBMONGOCXX_INCLUDE_DIRS}\"")
message ("--   mongocxx libraries \"${LIBMONGOCXX_LIBRARIES}\"")
find_package(libbsoncxx REQUIRED)
message ("--   bsoncxx found version \"${LIBBSONCXX_VERSION}\"")
message ("--   bsoncxx include path \"${LIBBSONCXX_INCLUDE_DIRS}\"")
message ("--   bsoncxx libraries \"${LIBBSONCXX_LIBRARIES}\"")

list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")
find_package(Osmium REQUIRED COMPONENTS io gdal)

find_package(Boost 1.65.1 REQUIRED)
if (Boost_FOUND)
    message(STATUS "Boost include dirs: ${Boost_INCLUDE_DIRS}")
    message(STATUS "Boost libraries: ${Boost_LIBRARIES}")
    message(STATUS "Boost version: ${Boost_VERSION}")
endif()

include_directories(
    ${Boost_INCLUDE_DIRS}
    ${OSMIUM_INCLUDE_DIR}
    ${BSON_INCLUDE_DIRS}
    ${MONGOC_INCLUDE_DIRS}
    ${LIBMONGOCXX_INCLUDE_DIRS}
    ${LIBBSONCXX_INCLUDE_DIRS}
        )

add_executable(${PROJECT_NAME}
    "city_parser.h"
    "pub_parser.h"
    "main.cpp")
target_link_libraries(
    ${PROJECT_NAME}

    ${Boost_LIBRARIES}
    ${OSMIUM_LIBRARIES}
    ${MONGOC_LIBRARIES}
    ${BSON_LIBRARIES}
    ${LIBMONGOCXX_LIBRARIES}
    ${LIBBSONCXX_LIBRARIES}
    )
