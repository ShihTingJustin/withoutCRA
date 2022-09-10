import React, { useState } from 'react';

import CustomInputNumber from '../customInputNumber/CustomInputNumber';

import './roomAllocation.scss';

const Room = () => {
  const [guestCount, setGuestCount] = useState(1);

  return (
    <div className="roomAllocation-root__guest-input-wrap__room">
      <div className="counter">房間 : {guestCount} 人</div>
      <div className="row">
        <div className="guest-type">
          <p>大人</p>
          <span>年齡 20+</span>
        </div>
        <CustomInputNumber
          name="CustomInputNumber"
          max={10}
          min={0}
          step={1}
          onBlur={(e) => console.log(e)}
          onChange={(e) => console.log(e)}
        />
      </div>
      <div className="row">
        <div className="guest-type">
          <p>小孩</p>
        </div>
        <CustomInputNumber
          name="CustomInputNumber"
          max={10}
          min={0}
          step={1}
          onBlur={(e) => console.log(e)}
          onChange={(e) => console.log(e)}
        />
      </div>
    </div>
  );
};

const RoomAllocation = ({
  guest,
  room,
  onChange
}: {
  guest: number;
  room: number;
  onChange: (result: { adults: number; child: number }[]) => void;
}) => {
  return (
    <div className="roomAllocation-root">
      <div className="roomAllocation-root__room-info-wrap">
        <div className="total-guest-room">
          住客人數 : {guest} 人 / {room} 房
        </div>
        <div className="yet-distribute-counter">尚未分配人數 : {1} 人</div>
      </div>
      <div className="roomAllocation-root__guest-input-wrap">
        {Array.from({ length: room }, (_, index) => (
          <Room key={index} />
        ))}
      </div>
    </div>
  );
};

export default RoomAllocation;
