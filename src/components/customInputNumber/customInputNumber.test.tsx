import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import CustomInputNumber from './CustomInputNumber';

describe('Test Button component', () => {
  const component = <CustomInputNumber  />;

  it('[Render] match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('[Render] toBeInTheDocument', () => {
    render(component);
    const element = screen.getByTestId('customInputNumber');
    expect(element).toBeInTheDocument();
  });
});
