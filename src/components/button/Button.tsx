import React from 'react';

import './button.scss';

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="button-root">
      <button>{children}</button>
    </div>
  );
};

export default Button;
