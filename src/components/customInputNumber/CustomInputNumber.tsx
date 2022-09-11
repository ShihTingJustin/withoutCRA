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

    const handleInputEventManually = (value: string) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      ).set;
      nativeInputValueSetter.call(inputRef.current, value);

      const inputEvent = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(inputEvent);
    };

    const handleMinus = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const newValue = stateValue - step;
      const isValueValid = newValue >= min;
      if (isValueValid) {
        setValue(newValue);
        handleInputEventManually(String(newValue));
      }
    };

    const handleAdd = () => {
      if (disabled) return;
      const newValue = stateValue + step;
      const isValueValid = newValue <= max;
      if (isValueValid) {
        setValue(newValue);
        handleInputEventManually(String(newValue));
      }
    };

    return (
      <div className="input-number-root">
        <Button disabled={disabled} onClick={handleMinus}>
          <span>
            <AiOutlineMinus size={30} color={disabled ? '#c0c0c0' : '#1e9fd2'} />
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
            <AiOutlinePlus size={30} color={disabled ? '#c0c0c0' : '#1e9fd2'} />
          </span>
        </Button>
      </div>
    );
  }
);

export default CustomInputNumber;
