cmake_minimum_required(VERSION 2.8)

project(event-manager-osm-parser)

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
        )

add_executable(${PROJECT_NAME}
    "pub_parser.h"
    "main.cpp")
target_link_libraries(${PROJECT_NAME} ${OSMIUM_LIBRARIES})
