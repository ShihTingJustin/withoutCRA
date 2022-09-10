import React from 'react';

import './button.scss';

const Button = ({
  children,
  disabled,
  onClick
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="button-root">
      <button data-disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
