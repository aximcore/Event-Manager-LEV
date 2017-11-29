package com.r0lex.eventmanager.service;

import com.esri.core.geometry.Geometry;
import com.esri.core.geometry.OperatorImportFromWkt;
import com.esri.core.geometry.WktImportFlags;
import com.github.davidmoten.rtree.RTree;
import com.github.davidmoten.rtree.geometry.Geometries;
import com.github.davidmoten.rtree.geometry.Point;
import com.r0lex.eventmanager.model.database.Location;
import com.r0lex.eventmanager.repository.LocationsRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class SpatialService {
    @Autowired
    private LocationsRepository locationsRepository;
    private RTree<ObjectId, Point> rtree;

    @PostConstruct
    private void insertRtree() {
        System.out.println("Create Rtree!");
        rtree = RTree.star().create();
        locationsRepository.findAll()
                    .doOnNext(location -> {
                    com.esri.core.geometry.Point point = (com.esri.core.geometry.Point)
                            OperatorImportFromWkt.local()
                                    .execute(WktImportFlags.wktImportDefaults,
                                            Geometry.Type.Point, location.getPointWkt(), null);
                    rtree = rtree.add(location.get_id(), Geometries.point(point.getX(), point.getY())); })
                    .doOnError(throwable -> throwable.printStackTrace());
    }

    public List<Location> getCloserAmenities(Point gpsPoint, Double maxDistance) {
        return rtree.search(gpsPoint, maxDistance)
                .map(entry -> locationsRepository.findBy_id(entry.value()))
                .toList()
                .toBlocking()
                .single();
    }
}
