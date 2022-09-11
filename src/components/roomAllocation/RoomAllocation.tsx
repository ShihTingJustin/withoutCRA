import React, { useEffect, useState, useRef } from 'react';

import CustomInputNumber from '../customInputNumber/CustomInputNumber';

import './roomAllocation.scss';

type TotalGuest = { adult: number; child: number };

const adultMinimum = 1;

const Room = ({
  guestLimit,
  yetDistributedCount,
  disabled,
  onChange
}: {
  guestLimit: number;
  yetDistributedCount: number;
  disabled?: boolean;
  minusDisabled?: boolean;
  plusDisabled?: boolean;
  onChange: (value: TotalGuest) => void;
}) => {
  const [guestCount, setGuestCount] = useState({ adult: adultMinimum, child: 0 });

  const guestCountRef = useRef(0);

  const roomDisabled = yetDistributedCount === 0 || guestCountRef.current === guestLimit;

  const handleChange = (guestType: string, value: number) => {
    setGuestCount((prev) => ({ ...prev, [guestType]: value }));
  };

  useEffect(() => {
    onChange(guestCount);
    guestCountRef.current = Object.values(guestCount).reduce((acc, curr) => acc + curr);
  }, [guestCount]);

  return (
    <div className="roomAllocation-root__guest-input-wrap__room">
      <div className="counter">房間 : {guestCount.adult + guestCount.child} 人</div>
      <div className="row">
        <div className="guest-type">
          <p>大人</p>
          <span>年齡 20+</span>
        </div>
        <CustomInputNumber
          name="CustomInputNumber"
          max={guestLimit - guestCount.child}
          min={adultMinimum}
          value={guestCount.adult}
          disabled={disabled}
          plusDisabled={roomDisabled}
          yetDistributedCount={yetDistributedCount}
          onBlur={(e) => console.log(e)}
          onChange={(e) => {
            handleChange('adult', Number(e.target.value));
          }}
        />
      </div>
      <div className="row">
        <div className="guest-type">
          <p>小孩</p>
        </div>
        <CustomInputNumber
          name="CustomInputNumber"
          max={guestLimit - guestCount.adult}
          min={0}
          value={guestCount.child}
          disabled={disabled}
          plusDisabled={roomDisabled}
          yetDistributedCount={yetDistributedCount}
          onBlur={(e) => console.log(e)}
          onChange={(e) => {
            handleChange('child', Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

const RoomAllocation = ({
  guest,
  room,
  guestLimit,
  onChange
}: {
  guest: number;
  room: number;
  guestLimit: number;
  onChange: (result: TotalGuest[]) => void;
}) => {
  const result = useRef<TotalGuest[]>([]);

  const [yetDistributedCount, setYetDistributedCount] = useState<number>(guest);

  const handleChange = (index: number, value: TotalGuest) => {
    // get data for parent onChange callback
    if (!result.current[index]) {
      result.current[index] = { adult: 0, child: 0 };
    }
    result.current[index] = value;
    onChange(result.current);

    // calculate totalGuestCount then update yetDistributedCount
    const totalGuestCount = result.current.reduce((total, singleRoom) => {
      const roomCount = Object.values(singleRoom).reduce((acc, curr) => acc + curr);
      return (total += roomCount);
    }, 0);
    setYetDistributedCount(guest - totalGuestCount);
  };

  return (
    <div className="roomAllocation-root">
      <div className="roomAllocation-root__room-info-wrap">
        <div className="total-guest-room">
          住客人數 : {guest} 人 / {room} 房
        </div>
        <div className="yet-distribute-counter">尚未分配人數 : {yetDistributedCount} 人</div>
      </div>
      <div className="roomAllocation-root__guest-input-wrap">
        {Array.from({ length: room }, (_, index) => (
          <Room
            key={index}
            guestLimit={guestLimit}
            yetDistributedCount={yetDistributedCount}
            disabled={guest === room}
            onChange={(value) => handleChange(index, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomAllocation;
