import React from 'react';

import './button.scss';

const Button = ({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="button-root">
      <button onClick={onClick}>{children}</button>
    </div>
  );
};

export default Button;
