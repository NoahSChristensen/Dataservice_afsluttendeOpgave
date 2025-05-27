import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "./marker.png"
import markerIconShdow from "./marker_shadow.png"

const LeafletMap = ({lat, lon, zoom = 13, weather = ""}) => {
  // Reference til kortets container og selve kortet/instans
  const refMapContainer = useRef();
  const refMap = useRef();
  let refMarker = useRef();


  const myIcon = L.icon({
    iconUrl: markerIcon,
    
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    shadowAnchor: [0, 60],
    shadowSize: [60, 60],   
    shadowUrl: markerIconShdow,

    popupAnchor: [0, -50]

  })

  useEffect(() => {
    // Hvis IKKE kortet allerede findes, så lav det
    if (!refMap.current) {
      refMap.current = L.map(refMapContainer.current).setView(
        [lat, lon],
        zoom,
      );

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(refMap.current);

      // Markør
      refMarker.current = L.marker([lat, lon], {icon: myIcon})
      .addTo(refMap.current)
      .bindPopup(weather)
      .openPopup()

    // } else {
    //     // Ændringer i lat eller lon = nyt view
    //     refMap.current.setView([lat, lon])
    }

    // Ryd op efter map mv. når component "forlades" unmountes
    return () => {
        if(refMap.current) {
            refMap.current.remove();
            refMap.current = null;
            refMarker = null;
        }
    }

  }, [lat, lon]);

  return (
    <div ref={refMapContainer} id="mapContainer" className="h-[800px] w-full">

      <style>
        {`.leaflet-popup-content {font-weight: bold} .leaflet-popup-content::first-letter {text-transform:uppercase}`}
      </style>

      Kortet loades...
    </div>
  );
};

export default LeafletMap;
