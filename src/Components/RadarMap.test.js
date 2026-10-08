import { render, screen } from '@testing-library/react';
import RadarMap, { DEFAULT_TILE_URL } from './RadarMap';

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div>{children}</div>,
  TileLayer: ({ url }) => <div data-testid="tile-layer" data-url={url}></div>,
  Marker: ({ children }) => <div>{children}</div>,
  Tooltip: ({ children }) => <div>{children}</div>,
}));

const stopLocation = { id: 'stop1', latitude: 52.5, longitude: 13.4 };
const dataSource = [{ key: '1', lineName: 'A', stopLocation }];
const movement = {
  line: { name: 'A', product: 'bus' },
  direction: 'Dir',
  location: { latitude: 52.51, longitude: 13.41 },
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({ movements: [movement] }) })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('RadarMap tile source', () => {
  test('loads tiles from the bare OSM host by default', async () => {
    render(<RadarMap stopLocation={stopLocation} dataSource={dataSource} />);

    const layer = await screen.findByTestId('tile-layer');
    expect(layer.dataset.url).toBe(DEFAULT_TILE_URL);
    expect(DEFAULT_TILE_URL).not.toContain('{s}');
  });

  test('tileUrl overrides the tile source', async () => {
    render(
      <RadarMap
        stopLocation={stopLocation}
        dataSource={dataSource}
        tileUrl="https://tiles.test/{z}/{x}/{y}.png"
      />
    );

    const layer = await screen.findByTestId('tile-layer');
    expect(layer.dataset.url).toBe('https://tiles.test/{z}/{x}/{y}.png');
  });
});
