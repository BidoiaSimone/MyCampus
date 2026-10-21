import { fireEvent, render, screen } from '@testing-library/react-native';

import { OptionCard } from './option-card';

describe('OptionCard', () => {
  it('shows title and subtitle and reacts to a tap', async () => {
    const onPress = jest.fn();
    await render(
      <OptionCard title="Microwave" subtitle="Ground floor" emoji="🍲" onPress={onPress} />,
    );

    expect(screen.getByText('Microwave')).toBeTruthy();
    expect(screen.getByText('Ground floor')).toBeTruthy();

    await fireEvent.press(screen.getByRole('button', { name: 'Microwave, Ground floor' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
