package com.r0lex.eventmanager.service;

import com.esri.core.geometry.Geometry;
import com.esri.core.geometry.OperatorImportFromWkt;
import com.esri.core.geometry.WktImportFlags;
import com.github.davidmoten.grumpy.core.Position;
import com.github.davidmoten.rtree.Entry;
import com.github.davidmoten.rtree.RTree;
import com.github.davidmoten.rtree.geometry.Geometries;
import com.github.davidmoten.rtree.geometry.Point;
import com.github.davidmoten.rtree.geometry.Rectangle;
import com.r0lex.eventmanager.model.database.Location;
import com.r0lex.eventmanager.model.database.Performer;
import com.r0lex.eventmanager.repository.LocationsRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import rx.Observable;
import rx.Single;

import javax.annotation.PostConstruct;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SpatialService {
    @Autowired
    private LocationsRepository locationsRepository;
    private RTree<String, Point> rtree = RTree.star().create();

    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        insertRtree();
    }

    private void insertRtree() {
        System.out.println("[SpatialService]Create Rtree!");

        locationsRepository.findAll()
                .doOnComplete(() -> System.out.println("[SpatialService]Rtree Size: " + rtree.size()))
                .subscribe(location -> {
                    com.esri.core.geometry.Point point = (com.esri.core.geometry.Point)
                            OperatorImportFromWkt.local()
                                    .execute(WktImportFlags.wktImportDefaults,
                                            Geometry.Type.Point, location.getPoint_wkt(), null);
                    rtree = rtree.add(location.getId(), Geometries.point(point.getX(), point.getY())); });
    }

    private Observable<Location> searchCloserPlaces(final Point gpsPoint,
                                                               final Double searchDistanceInKm) {
        final Position from = Position.create(gpsPoint.y(), gpsPoint.x());
        final Rectangle bound = createBounds(from, searchDistanceInKm);
        return rtree
                .search(bound)
                .filter(objectIdPointEntry -> {
                    Point p = objectIdPointEntry.geometry();
                    Position pos = Position.create(p.y(), p.x());
                    return from.getDistanceToKm(pos) < searchDistanceInKm;
                })
                .map(entry -> locationsRepository.findById(entry.value()).block());
    }

    public Flux<Location> getLocations() {
        return locationsRepository.findAll();
    }

    public Flux<Location> getLocationByName(final String name) {
        return locationsRepository.findAllByNameContainsIgnoreCase(name);
    }

    public Flux<Location> getCloserPlaces(final Point gpsPoint, final Double searchDistanceInKm) {
        return Flux.fromIterable(searchCloserPlaces(gpsPoint, searchDistanceInKm)
                .toList()
                .toBlocking()
                .single()
        );
    }

    public Mono<Location> getLocationById(String id) {
        return locationsRepository.findById(id);
    }

    public Flux<Location> getCloserPlacesByCategory(final Point gpsPoint,
                                                    final Double searchDistanceInKm,
                                                    final String category) {
        return Flux.fromIterable(searchCloserPlaces(gpsPoint, searchDistanceInKm)
                .filter(location -> location.getAmenity().contentEquals(category))
                .toList()
                .toBlocking()
                .single()
        );
    }

    private static Rectangle createBounds(@NotNull final Position from, final double distanceKm) {
        Position north = from.predict(distanceKm, 0);
        Position south = from.predict(distanceKm, 180);
        Position east = from.predict(distanceKm, 90);
        Position west = from.predict(distanceKm, 270);
        return Geometries.rectangle(west.getLon(), south.getLat(), east.getLon(), north.getLat());
    }
}
