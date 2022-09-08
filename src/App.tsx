import React from 'react';

import '../style/global.scss';

import CustomInputNumber from './components/customInputNumber/CustomInputNumber';

const App = () => {
  return <CustomInputNumber onChange={(e) => console.log(e)} />;
};

export default App;
