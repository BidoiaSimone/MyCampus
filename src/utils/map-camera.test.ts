import { cameraForPoints } from './map-camera';

const fallback = { center: [12.25, 45.47] as [number, number], zoom: 16 };

describe('cameraForPoints', () => {
  it('uses the campus default when there are no buildings', () => {
    expect(cameraForPoints([], fallback)).toEqual(fallback);
  });

  it('centres on the only building', () => {
    expect(cameraForPoints([{ latitude: 45.48, longitude: 12.26 }], fallback)).toEqual({
      center: [12.26, 45.48],
      zoom: 16,
    });
  });

  it('frames every building with some margin', () => {
    const camera = cameraForPoints(
      [
        { latitude: 45.478, longitude: 12.254 },
        { latitude: 45.48, longitude: 12.258 },
      ],
      fallback,
    );
    if (!('bounds' in camera)) throw new Error('expected bounds');
    const [west, south, east, north] = camera.bounds;
    expect(west).toBeLessThan(12.254);
    expect(east).toBeGreaterThan(12.258);
    expect(south).toBeLessThan(45.478);
    expect(north).toBeGreaterThan(45.48);
  });
});
