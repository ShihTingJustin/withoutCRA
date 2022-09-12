import React from 'react';
import useLongPress from '../../hooks/useLongPress';

import './button.scss';

const Button = ({
  children,
  disabled,
  onClick
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) => {
  const { handleMouseDown, handleMouseUp } = useLongPress({ onClick });

  return (
    <div data-testid="button" className="button-root">
      <button
        data-disabled={disabled}
        onClick={onClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
