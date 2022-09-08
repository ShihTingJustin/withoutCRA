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
    const { min, max, step, value = '', disabled, onChange, onBlur, ...inputProps } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current);

    const [stateValue, setValue] = useState<ValueType>(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const notNumber = Number.isNaN(Number(e.target.value));
      if (notNumber) return e.preventDefault();

      onChange(e);
      setValue(e.target.value);
    };

    return (
      <div className="input-number-root">
        <Button>
          <span>
            <AiOutlineMinus size={30} color="#79b5d6" />
          </span>
        </Button>
        <input value={stateValue} ref={inputRef} onChange={handleChange} {...inputProps} />
        <Button>
          <span>
            <AiOutlinePlus size={30} color="#79b5d6" />
          </span>
        </Button>
      </div>
    );
  }
);

export default CustomInputNumber;
