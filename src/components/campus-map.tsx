import { Map as MapView } from 'panelui-native/components/map';
import { Skeleton } from 'panelui-native/components/skeleton';
import { Text } from 'panelui-native/primitives/text';

import { CAMPUS_CENTER, CAMPUS_ZOOM } from '@/data/campus';
import { fetchBuildingLocations } from '@/data/places';
import { useAsync } from '@/hooks/use-async';
import { cameraForPoints } from '@/utils/map-camera';

type CampusMapProps = {
  className?: string;
};

/**
 * Mappa del campus con gli edifici.
 * Il disegno è di MapLibre (codice nativo): in Expo Go PanelUI mostra un avviso al suo posto,
 * serve una development build (vedi README).
 */
export function CampusMap({ className }: CampusMapProps) {
  const buildings = useAsync(fetchBuildingLocations, []);

  // La telecamera iniziale si applica una volta sola: si aspetta di sapere dove sono gli edifici.
  if (buildings.status === 'loading') {
    return <Skeleton className={className} label="Loading the campus map" />;
  }

  if (buildings.status === 'error' && __DEV__) {
    console.warn('Campus map: buildings not loaded.', buildings.error.message);
  }

  const points = buildings.data ?? [];
  const camera = cameraForPoints(points, { center: CAMPUS_CENTER, zoom: CAMPUS_ZOOM });

  return (
    <MapView {...camera} className={className}>
      {points.map((building) => (
        <MapView.Marker
          key={building.id}
          lngLat={[building.longitude, building.latitude]}
          accessibilityLabel={building.name}>
          <MapView.Label>{building.name}</MapView.Label>
          {building.address ? (
            <MapView.Popup title={building.name}>
              <Text size="sm" muted>
                {building.address}
              </Text>
            </MapView.Popup>
          ) : null}
        </MapView.Marker>
      ))}
      <MapView.Controls position="bottom-right" recenter />
    </MapView>
  );
}
