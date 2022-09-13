import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import RoomAllocation from './RoomAllocation';

describe('Test Button component', () => {
  const component = <RoomAllocation guest={10} room={3} guestLimit={4} />;

  it('[Render] match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('[Render] toBeInTheDocument', () => {
    render(component);
    const element = screen.getByTestId('roomAllocation');
    expect(element).toBeInTheDocument();
  });
});
