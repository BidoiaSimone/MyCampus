import { formatFloor } from './format-floor';

describe('formatFloor', () => {
  it('names the ground floor', () => {
    expect(formatFloor(0)).toBe('Ground floor');
  });

  it('numbers upper floors and basements', () => {
    expect(formatFloor(2)).toBe('Floor 2');
    expect(formatFloor(-1)).toBe('Basement 1');
  });

  it('returns null when the floor is unknown', () => {
    expect(formatFloor(null)).toBeNull();
    expect(formatFloor(undefined)).toBeNull();
  });
});
