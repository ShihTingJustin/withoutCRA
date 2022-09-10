import React from 'react';

import '../style/global.scss';

import CustomInputNumber from './components/customInputNumber/CustomInputNumber';

const App = () => {
  return <CustomInputNumber max={10} min={0} step={2} onChange={(e) => console.log(e)} />;
};

export default App;
