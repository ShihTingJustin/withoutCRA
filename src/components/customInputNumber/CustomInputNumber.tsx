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
    const { min = 0, max, step = 1, value = 0, disabled, onChange, onBlur, ...inputProps } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current);

    const [stateValue, setValue] = useState<number>(Number(value));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      const notNumber = Number.isNaN(value);
      if (notNumber) return e.preventDefault();
      onChange(e);
      setValue(value);
    };

    const handleMinus = () => {
      const newValue = stateValue - step;
      const isValueValid = newValue >= min;
      if (isValueValid) setValue(newValue);
    };

    const handleAdd = () => {
      const newValue = stateValue + step;
      const isValueValid = newValue <= max;
      if (isValueValid) setValue(newValue);
    };

    return (
      <div className="input-number-root">
        <Button onClick={handleMinus}>
          <span>
            <AiOutlineMinus size={30} color="#79b5d6" />
          </span>
        </Button>
        <input value={stateValue} ref={inputRef} onChange={handleChange} {...inputProps} />
        <Button onClick={handleAdd}>
          <span>
            <AiOutlinePlus size={30} color="#79b5d6" />
          </span>
        </Button>
      </div>
    );
  }
);

export default CustomInputNumber;
