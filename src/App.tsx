import React from 'react';

import RoomAllocation from './components/roomAllocation/RoomAllocation';

import '../style/global.scss';

const App = () => {
  return <RoomAllocation guest={10} room={3} onChange={(result) => console.log(result)} />;
};

export default App;
