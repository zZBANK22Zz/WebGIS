'use client';

import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline } from '@react-google-maps/api';
import { locations, categories, routeInfo, Category } from '../data/locations';
import Image from 'next/image';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// คำนวณ center point จากพิกัดทั้งหมดของสถานที่
const calculateCenter = () => {
  const lats = locations.map(loc => loc.position.lat);
  const lngs = locations.map(loc => loc.position.lng);
  return {
    lat: lats.reduce((a, b) => a + b, 0) / lats.length,
    lng: lngs.reduce((a, b) => a + b, 0) / lngs.length,
  };
};

const center = calculateCenter();

const mapOptions = {
  zoom: 16, // ปรับ zoom level ให้เหมาะสมกับพื้นที่ใหม่
  mapTypeControl: true,
  streetViewControl: true, // เปิดใช้ Street View control
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = ['places', 'geometry'];

export default function CampusMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [routePath, setRoutePath] = useState<google.maps.LatLng[]>([]);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const streetViewServiceRef = useRef<google.maps.StreetViewService | null>(null);

  const filteredLocations = useMemo(() => {
    if (selectedCategory === 'all') return locations;
    return locations.filter(loc => loc.category === selectedCategory);
  }, [selectedCategory]);

  const getMarkerIcon = useCallback((category: Category) => {
    const color = categories[category].color;
    // Create a custom marker icon using SVG
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="${color}" stroke="#ffffff" stroke-width="2"/>
        </svg>
      `)}`,
      scaledSize: new google.maps.Size(24, 24),
      anchor: new google.maps.Point(12, 12),
    };
  }, []);

  // ฟังก์ชันสำหรับดึงเส้นทางตามถนนจริงจาก Google Maps
  const calculateRoute = useCallback(() => {
    if (!isLoaded || !window.google) return;

    if (!directionsServiceRef.current) {
      directionsServiceRef.current = new google.maps.DirectionsService();
    }

    const library = locations.find(loc => loc.id === 'library')!;
    const lectureHall = locations.find(loc => loc.id === 'lecture-hall')!;
    const sportsCenter = locations.find(loc => loc.id === 'sports-center')!;

    // สร้าง waypoints สำหรับเส้นทาง
    const waypoints = [
      {
        location: new google.maps.LatLng(lectureHall.position.lat, lectureHall.position.lng),
        stopover: true,
      },
    ];

    const request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(library.position.lat, library.position.lng),
      destination: new google.maps.LatLng(sportsCenter.position.lat, sportsCenter.position.lng),
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.WALKING, // ใช้โหมดเดิน
      optimizeWaypoints: false,
    };

    directionsServiceRef.current.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        // ดึงพิกัดทั้งหมดจากเส้นทาง
        const path: google.maps.LatLng[] = [];
        result.routes[0].legs.forEach((leg) => {
          leg.steps.forEach((step) => {
            step.path.forEach((point) => {
              path.push(point);
            });
          });
        });
        setRoutePath(path);
      } else {
        // ถ้า Directions API ไม่ทำงาน ให้ใช้เส้นทางแบบ fallback
        console.warn('Directions API failed, using fallback route:', status);
        const fallbackPath: google.maps.LatLng[] = [
          new google.maps.LatLng(library.position.lat, library.position.lng),
          new google.maps.LatLng(lectureHall.position.lat, lectureHall.position.lng),
          new google.maps.LatLng(sportsCenter.position.lat, sportsCenter.position.lng),
        ];
        setRoutePath(fallbackPath);
      }
    });
  }, [isLoaded]);

  // เรียกคำนวณเส้นทางเมื่อ component โหลดเสร็จ
  useEffect(() => {
    if (isLoaded && window.google) {
      calculateRoute();
      // สร้าง StreetViewService
      if (!streetViewServiceRef.current) {
        streetViewServiceRef.current = new google.maps.StreetViewService();
      }
    }
  }, [isLoaded, calculateRoute]);

  // ฟังก์ชันเปิด Street View ที่ตำแหน่งที่เลือก
  const openStreetView = useCallback((position: { lat: number; lng: number }) => {
    if (!isLoaded || !window.google || !mapRef.current) return;

    if (!streetViewServiceRef.current) {
      streetViewServiceRef.current = new google.maps.StreetViewService();
    }

    const panorama = mapRef.current.getStreetView();
    const svPosition = new google.maps.LatLng(position.lat, position.lng);

    streetViewServiceRef.current.getPanorama(
      { location: svPosition, radius: 50 },
      (data, status) => {
        if (status === google.maps.StreetViewStatus.OK) {
          panorama.setPosition(svPosition);
          panorama.setPov({
            heading: 270,
            pitch: 0,
          });
          panorama.setVisible(true);
        } else {
          // ถ้าไม่มี Street View ที่ตำแหน่งนี้ ให้เปิดในหน้าต่างใหม่
          const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${position.lat},${position.lng}`;
          window.open(streetViewUrl, '_blank');
        }
      }
    );
  }, [isLoaded]);

  // Callback สำหรับเมื่อแผนที่โหลดเสร็จ
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-red-600 mb-4">เกิดข้อผิดพลาดในการโหลดแผนที่</p>
          <p className="text-sm text-gray-600">กรุณาตรวจสอบ API Key ของ Google Maps</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดแผนที่...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        options={mapOptions}
        onLoad={onMapLoad}
      >
        {/* เส้นทางแนะนำ - เส้นเงาเพื่อความสวยงาม */}
        {routePath.length > 0 && (
          <Polyline
            path={routePath}
            options={{
              strokeColor: '#1e40af',
              strokeOpacity: 0.3,
              strokeWeight: 8,
              zIndex: 0,
              geodesic: false,
            }}
          />
        )}

        {/* เส้นทางแนะนำ - เส้นหลัก (ใช้เส้นทางถนนจริง) */}
        {routePath.length > 0 && (
          <Polyline
            path={routePath}
            options={{
              strokeColor: '#2563eb',
              strokeOpacity: 0.9,
              strokeWeight: 5,
              zIndex: 1,
              geodesic: false,
              icons: [
                {
                  icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 5,
                    strokeColor: '#ffffff',
                    strokeWeight: 2,
                    fillColor: '#2563eb',
                    fillOpacity: 1,
                  },
                  offset: '50%',
                  repeat: '80px',
                },
              ],
            }}
          />
        )}

        {/* Markers */}
        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            icon={getMarkerIcon(location.category)}
            onClick={() => setSelectedLocation(location.id)}
          />
        ))}

          {/* InfoWindow */}
          {selectedLocation && (
            <InfoWindow
              position={locations.find(loc => loc.id === selectedLocation)!.position}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="max-w-xs p-2">
                {(() => {
                  const loc = locations.find(l => l.id === selectedLocation)!;
                  return (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{categories[loc.category].icon}</span>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{loc.name}</h3>
                          <p className="text-sm text-gray-600">{loc.nameEn}</p>
                        </div>
                      </div>
                      <div className="relative w-full h-40 rounded overflow-hidden">
                        <Image
                          src={loc.image}
                          alt={loc.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-700">{loc.description}</p>
                      {loc.openingHours && (
                        <div className="text-xs text-gray-600">
                          <strong>เวลาเปิด-ปิด:</strong>
                          <pre className="whitespace-pre-wrap mt-1">{loc.openingHours}</pre>
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        {loc.website && (
                          <a
                            href={loc.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex-1 text-center py-1.5 px-2 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                          >
                            ดูข้อมูลเพิ่มเติม
                          </a>
                        )}
                        <button
                          onClick={() => openStreetView(loc.position)}
                          className="text-xs text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-3 py-1.5 rounded shadow-sm transition-all flex items-center gap-1"
                          title="เปิด Street View"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Street View
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

      {/* Street View Toggle Button */}
      <div className="absolute top-24 right-2 sm:right-4 z-10">
        <button
          onClick={() => {
            if (mapRef.current) {
              const panorama = mapRef.current.getStreetView();
              panorama.setVisible(!panorama.getVisible());
            }
          }}
          className="bg-white rounded-lg shadow-lg p-2.5 sm:p-3 hover:bg-gray-50 transition-colors flex items-center gap-2 group"
          title="เปิด/ปิด Street View"
        >
          <svg className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="hidden sm:inline text-xs sm:text-sm font-medium text-gray-700 group-hover:text-blue-600">
            Street View
          </span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="absolute top-24 left-2 sm:left-4 z-10 bg-white rounded-lg shadow-lg p-3 sm:p-4 space-y-2 max-w-[180px] sm:max-w-none">
        <h3 className="font-semibold text-xs sm:text-sm text-gray-800 mb-2">ประเภทสถานที่</h3>
        <button
          onClick={() => setSelectedCategory('all')}
          className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-100 text-blue-800 font-medium'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          ทั้งหมด
        </button>
        {Object.entries(categories).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key as Category)}
            className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-colors flex items-center gap-2 ${
              selectedCategory === key
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: cat.color }}
            />
            <span className="truncate">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Route Info */}
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 z-10 bg-white rounded-xl shadow-xl border border-gray-100 p-4 sm:p-5 max-w-[calc(100%-1rem)] sm:max-w-sm backdrop-blur-sm bg-white/98">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">{routeInfo.name}</h3>
            <p className="text-xs text-gray-500 mb-3">{routeInfo.nameEn}</p>
            <div className="space-y-2">
              {routeInfo.stops.map((stop, index) => {
                const location = locations.find(loc => loc.id === stop.id);
                if (!location) return null;
                return (
                  <div key={stop.id} className="flex items-center gap-2 text-xs sm:text-sm">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-semibold text-white shadow-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-gray-800 font-medium block truncate">{stop.name}</span>
                      <span className="text-gray-500 text-xs">{stop.nameEn}</span>
                    </div>
                    {index < routeInfo.stops.length - 1 && (
                      <svg className="w-4 h-4 text-blue-500 mx-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{routeInfo.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>{routeInfo.distance}</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-0.5 bg-blue-500 rounded"></div>
                <span>เส้นทางแนะนำบนแผนที่</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

