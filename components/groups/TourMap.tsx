"use client";

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
  MapRoute,
  type MapRef,
} from "@/components/ui/map";
import { useState, useMemo, useEffect, useRef } from "react";
import { Trip } from "@/lib/tripsData";
import { cn } from "@/lib/utils";

// Mapping of locations to high-precision coordinates
const locationCoords: Record<string, [number, number]> = {
  // Cities & Major Towns
  "Addis Ababa": [38.7468, 9.0192],
  "Gondar": [37.4667, 12.6000],
  "Lalibela": [39.0476, 12.0317],
  "Mekele": [39.4753, 13.4927],
  "Debark": [37.8916, 13.1593],
  "Jinka": [36.6508, 5.7874],
  "Turmi": [36.4883, 4.9681],
  "Konso": [37.4333, 5.3333],
  "Arba Minch": [37.5500, 6.0333],
  "Berhale": [40.0167, 13.8667],

  // Simien Mountains
  "Simien Camp": [38.0378, 13.2215], // Sankaber/Geech area
  "Imet Gogo": [38.1885, 13.2575],
  "Chennek": [38.1865, 13.2625],

  // Danakil Depression (Afar)
  "Afar Desert Camp": [40.3167, 14.0833], // Hamad Ela
  "Afar Camp": [40.3167, 14.0833],
  "Dallol": [40.2989, 14.2417],
  "Dallol Camp": [40.2989, 14.2417],
  "Erta Ale": [40.6614, 13.6033],
  "Erta Ale Base Camp": [40.5833, 13.6000],
  "Erta Ale Base": [40.5833, 13.6000],
  "Erta Ale Rim": [40.6614, 13.6033],

  // Omo Valley & South
  "Mago National Park": [36.3333, 5.6667],
  "Lake Chamo": [37.5833, 5.8333],
  "Key Afer": [36.5833, 5.5167],
  "Arbore": [36.75, 5.0],
  "Murulle": [36.1950, 5.1764], // Karo region
};

interface TourMapProps {
  trip: Trip;
}

export default function TourMap({ trip }: TourMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [selected, setSelected] = useState<{
    id: number;
    name: string;
    coords: [number, number];
    description: string;
  } | null>(null);

  const stops = useMemo(() => {
    const result: { id: number; name: string; coords: [number, number]; description: string }[] = [];

    const addisCoords: [number, number] = locationCoords["Addis Ababa"] || [38.7468, 9.0192];

    // Every tour map starts from Addis Ababa
    result.push({
      id: -1,
      name: "Addis Ababa",
      coords: addisCoords,
      description: "Starting point",
    });

    trip.itinerary.forEach((day, index) => {
      let coords: [number, number];
      if (day.lng !== undefined && day.lat !== undefined) {
        coords = [day.lng, day.lat];
      } else {
        coords = locationCoords[day.overnight] || addisCoords;
      }

      result.push({
        id: index,
        name: day.overnight || `Day ${day.day}`,
        coords,
        description: day.title,
      });
    });
    return result;
  }, [trip]);

  const routeCoordinates = useMemo(() => {
    return stops.map(s => s.coords);
  }, [stops]);

  const center: [number, number] = useMemo(() => {
    if (stops.length === 0) return [39.5, 9.0]; // General Ethiopia center
    const lats = stops.map(s => s.coords[1]);
    const lngs = stops.map(s => s.coords[0]);
    return [
      (Math.min(...lngs) + Math.max(...lngs)) / 2,
      (Math.min(...lats) + Math.max(...lats)) / 2,
    ];
  }, [stops]);

  // Fly to selected location
  useEffect(() => {
    if (selected && mapRef.current) {
      mapRef.current.flyTo({
        center: selected.coords,
        zoom: 10,
        duration: 2000,
        essential: true,
      });
    } else if (!selected && mapRef.current) {
      // Return to overview if nothing selected
      mapRef.current.flyTo({
        center: center,
        zoom: 5.8,
        duration: 1500,
      });
    }
  }, [selected, center]);

  // Tweak Map Internal Borders for White Theme
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const styleBorders = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (!isDark) {
        // Targeted layers in Carto Positron to make boundaries cleaner and more modern
        const borderLayers = ["admin-0-line", "admin-1-line", "admin-0-boundary", "admin-0-boundary-bg"];
        borderLayers.forEach(layerId => {
          if (map.getLayer(layerId)) {
            map.setPaintProperty(layerId, "line-color", "#d1d5db"); // Soft modern grey
            map.setPaintProperty(layerId, "line-width", 0.8);
          }
        });
      }
    };

    if (map.isStyleLoaded()) {
      styleBorders();
    }
    map.on("styledata", styleBorders);
    return () => {
      map.off("styledata", styleBorders);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row h-[500px] md:h-[600px] gap-0 rounded-3xl overflow-hidden border border-outline/40 dark:border-white/10 shadow-premium">
        
        {/* Sidebar */}
        <div className="bg-surface w-full md:w-80 p-6 overflow-y-auto border-r border-outline/40 dark:border-white/10 z-20">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">route</span>
            </div>
            <h2 className="font-headline text-xl text-on-surface">Journey Route</h2>
          </div>
          
          <div className="space-y-2">
            {stops.map((stop) => (
              <button
                key={stop.id}
                className={cn(
                  "w-full text-left p-3.5 rounded-2xl transition-all duration-400 flex items-center gap-3 border",
                  selected?.id === stop.id
                    ? "bg-primary/10 border-primary/20 shadow-sm"
                    : "bg-transparent border-transparent text-on-surface-variant hover:bg-surface-container hover:border-outline/20"
                )}
                onClick={() => setSelected(stop)}
              >
                <div className={cn(
                  "w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-500",
                  selected?.id === stop.id ? "bg-primary scale-110 shadow-[0_0_8px_rgba(var(--primary),0.5)]" : "bg-outline/60"
                )} />
                <div className="min-w-0">
                  <p className={cn(
                    "font-bold text-sm truncate",
                    selected?.id === stop.id ? "text-primary" : "text-on-surface"
                  )}>{stop.name}</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-60 truncate font-label">{stop.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative min-h-[300px]">
          <Map 
            ref={mapRef}
            center={center}
            zoom={5.8}
            className="w-full h-full"
          >
            
            <MapControls showZoom showLocate showFullscreen position="top-right" className="top-4 right-4" />

            {/* Route */}
            {routeCoordinates.length > 1 && (
              <MapRoute
                coordinates={routeCoordinates}
                color="#9a3412"
                width={2.5}
                opacity={0.4}
              />
            )}

            {/* Markers */}
            {stops.map((stop) => (
              <MapMarker
                key={stop.id}
                longitude={stop.coords[0]}
                latitude={stop.coords[1]}
                onClick={() => setSelected(stop)}
              >
                <MarkerContent>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 border-white shadow-premium transition-all duration-500 hover:scale-125",
                    selected?.id === stop.id ? "bg-primary scale-125 z-30" : "bg-stone-500/80"
                  )} />
                </MarkerContent>
                
                {selected?.id === stop.id && (
                  <MarkerPopup
                    longitude={stop.coords[0]}
                    latitude={stop.coords[1]}
                    closeButton
                    onClose={() => setSelected(null)}
                    className="z-50 min-w-[200px]"
                  >
                    <div className="p-1">
                      <p className="text-primary font-label text-[10px] uppercase tracking-widest mb-1">Overnight Stay</p>
                      <h3 className="font-headline text-on-surface font-semibold text-base mb-1.5">{stop.name}</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                        {stop.description}
                      </p>
                      <button className="w-full py-2 bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2">
                        View Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </MarkerPopup>
                )}
              </MapMarker>
            ))}

          </Map>
        </div>
      </div>
    </div>
  );
}
