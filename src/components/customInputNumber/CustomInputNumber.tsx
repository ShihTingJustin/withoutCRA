import React, { useState, useRef } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import Button from '../button/Button';

import './customInputNumber.scss';

type ValueType = string | number;
interface InputNumberProps<T extends ValueType = ValueType>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  value?: number;
  disabled?: boolean;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLSpanElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInputNumber = React.forwardRef(
  (props: InputNumberProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      min = 0,
      max,
      step = 1,
      value = 0,
      disabled = false,
      onChange,
      onBlur,
      ...inputProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current);

    const [stateValue, setValue] = useState<number>(Number(value));

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const value = Number(e.target.value);
      const notNumber = Number.isNaN(value);
      if (notNumber) return e.preventDefault();

      const isValueValid = value >= min && value <= max;
      if (isValueValid) {
        onChange(e);
        setValue(value);
      }
    };

    const handleMinus = () => {
      if (disabled) return;
      const newValue = stateValue - step;
      const isValueValid = newValue >= min;
      if (isValueValid) setValue(newValue);
    };

    const handleAdd = () => {
      if (disabled) return;
      const newValue = stateValue + step;
      const isValueValid = newValue <= max;
      if (isValueValid) setValue(newValue);
    };

    return (
      <div className="input-number-root">
        <Button disabled={disabled} onClick={handleMinus}>
          <span>
            <AiOutlineMinus size={30} color={disabled ? '#c0c0c0' : '#79b5d6'} />
          </span>
        </Button>
        <input
          data-disabled={disabled}
          value={stateValue}
          ref={inputRef}
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          {...inputProps}
        />
        <Button disabled={disabled} onClick={handleAdd}>
          <span>
            <AiOutlinePlus size={30} color={disabled ? '#c0c0c0' : '#79b5d6'} />
          </span>
        </Button>
      </div>
    );
  }
);

export default CustomInputNumber;
