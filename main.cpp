#include <iostream>
#include "pub_parser.h"
#include "city_parser.h"

int main(int argc, char * argv[]) {
    if (argc != 2) {
        std::cerr << "usage: " << argv[0] << " osm_file_path" << std::endl;
        return -1;
    }
    CityParser::parse(argv[1]);
    //PubParser::parse(argv[1]);

    return 0;
}
