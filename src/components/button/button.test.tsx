import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import Button from './Button';
import { AiOutlineMinus } from 'react-icons/ai';

describe('Test Button component', () => {
  const component = (
    <Button onClick={() => {}}>
      <span>
        <AiOutlineMinus size={30} color="#1e9fd2" />
      </span>
    </Button>
  );

  it('[Render] match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('[Render] toBeInTheDocument', () => {
    render(component);
    const element = screen.getByTestId('button');
    expect(element).toBeInTheDocument();
  });
});
