import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import * as S from './map.styled';
import { MapSettings } from 'const';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = leaflet
        .map(mapRef.current)
        .setView(MapSettings.view.point, MapSettings.view.zoom);

      leaflet
        .tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        )
        .addTo(map);

      leaflet
        .marker(
          MapSettings.view.point,
          {
            icon: leaflet.icon(MapSettings.marker)
          }
        )
        .bindPopup('Мы находимся по адресу Санкт-Петербург, Набережная реки Карповка, д 5')
        .addTo(map);
    }
  }, [mapRef]);

  return <S.MapContainer ref={mapRef} />;
};

export default Map;
