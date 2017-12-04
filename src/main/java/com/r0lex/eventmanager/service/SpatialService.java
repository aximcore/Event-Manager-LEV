package com.r0lex.eventmanager.service;

import com.esri.core.geometry.Geometry;
import com.esri.core.geometry.OperatorImportFromWkt;
import com.esri.core.geometry.WktImportFlags;
import com.github.davidmoten.rtree.Entry;
import com.github.davidmoten.rtree.RTree;
import com.github.davidmoten.rtree.geometry.Geometries;
import com.github.davidmoten.rtree.geometry.Point;
import com.r0lex.eventmanager.model.database.Location;
import com.r0lex.eventmanager.repository.LocationsRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;
import rx.Observable;
import rx.Single;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SpatialService {
    @Autowired
    private LocationsRepository locationsRepository;
    private RTree<ObjectId, Point> rtree = RTree.star().create();

    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        insertRtree();
    }

    private void insertRtree() {
        System.out.println("[SpatialService]Create Rtree!");

        locationsRepository.findAll()
                .subscribe(location -> {
                    com.esri.core.geometry.Point point = (com.esri.core.geometry.Point)
                            OperatorImportFromWkt.local()
                                    .execute(WktImportFlags.wktImportDefaults,
                                            Geometry.Type.Point, location.getPoint_wkt(), null);
                    rtree = rtree.add(location.get_id(), Geometries.point(point.getX(), point.getY())); });

        System.out.println("[SpatialService]Rtree Size: " + rtree.size());
    }

    public List<Location> getCloserAmenities(Point gpsPoint, Double maxDistance) {
        return rtree
                .search(gpsPoint, maxDistance)
                .map(entry -> locationsRepository.findBy_id(entry.value()).block())
                .toList()
                .toBlocking()
                .single();
    }
}
