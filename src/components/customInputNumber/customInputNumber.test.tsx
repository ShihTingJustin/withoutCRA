import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import CustomInputNumber from './CustomInputNumber';

describe('Test Button component', () => {
  const component = <CustomInputNumber max={10} min={0} value={5} />;
  const disabledComponent = <CustomInputNumber disabled={true} max={10} min={0} value={5} />;

  it('[Render] match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('[Render] toBeInTheDocument', () => {
    render(component);
    const element = screen.getByTestId('customInputNumber');
    expect(element).toBeInTheDocument();
  });

  it('[Function] Props check', () => {
    render(component);
    const element = screen.getByTestId('customInputNumber-input');
    expect(element).toHaveValue('5');
  });

  it('[Function] Props check', () => {
    render(disabledComponent);
    const element = screen.getByTestId('customInputNumber-input');
    fireEvent.change(element, { target: { value: 10 } });
    expect(element).toHaveValue('5');
  });

  it('[Function] fireEvent.change', () => {
    render(component);
    const element = screen.getByTestId('customInputNumber-input');
    fireEvent.change(element, { target: { value: 10 } });
    expect(element).toHaveValue('10');
  });

  it('[Function] fireEvent.change', () => {
    render(component);
    const element = screen.getByTestId('customInputNumber-input');
    fireEvent.change(element, { target: { value: 0 } });
    expect(element).toHaveValue('0');
  });
});
