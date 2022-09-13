import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  Ref,
  InputHTMLAttributes,
  FocusEventHandler,
  FocusEvent,
  ChangeEvent
} from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import Button from '../button/Button';

import './customInputNumber.scss';

type ValueType = string | number;
interface InputNumberProps<T extends ValueType = ValueType>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  value?: number;
  disabled?: boolean;
  className?: string;
  minusDisabled?: boolean;
  plusDisabled?: boolean;
  yetDistributedCount?: number;
  onBlur?: FocusEventHandler<HTMLSpanElement>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInputNumber = forwardRef(
  (props: InputNumberProps, ref: Ref<HTMLInputElement | null>) => {
    const {
      min = 0,
      max = 10,
      step = 1,
      value = 0,
      disabled = false,
      minusDisabled = false,
      plusDisabled = false,
      yetDistributedCount = 0,
      onChange,
      onBlur,
      ...inputProps
    } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(ref, () => inputRef?.current);

    const [stateValue, setValue] = useState<number>(Number(value));
    const [stateMinusDisabled, setMinusDisabled] = useState(minusDisabled);
    const [statePlusDisabled, setPlusDisabled] = useState(plusDisabled);

    const finalMinusDisabled = disabled || minusDisabled || stateMinusDisabled;
    const finalPlusDisabled = disabled || plusDisabled || statePlusDisabled;

    useEffect(() => {
      setMinusDisabled(stateValue <= min);
      setPlusDisabled(stateValue >= max);

      if (stateValue >= min && stateValue <= max) {
        handleInputEventManually();
      }
    }, [stateValue, yetDistributedCount]);

    const correctValue = () => {
      if (stateValue < min) setValue(min);
      if (stateValue > max) {
        if (yetDistributedCount === 0) {
          setValue(min);
        } else {
          setValue(max);
        }
      }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      correctValue();
      onBlur?.(e);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const value = Number(e.target.value);
      const notNumber = Number.isNaN(value);
      if (notNumber) return e.preventDefault();
      setValue(value);
    };

    const handleInputEventManually = () => {
      correctValue();
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;
      nativeInputValueSetter?.call(inputRef.current, String(stateValue));

      const inputEvent = new Event('input', { bubbles: true });
      inputRef.current?.dispatchEvent(inputEvent);
      onChange?.(inputEvent as unknown as ChangeEvent<HTMLInputElement>);
    };

    const handleMinus = () => {
      if (finalMinusDisabled) return;
      setValue((prev) => {
        const newValue = prev - step;
        const isValueValid = newValue >= min;
        return isValueValid ? newValue : prev;
      });
    };

    const handleAdd = () => {
      if (finalPlusDisabled) return;
      setValue((prev) => {
        const newValue = prev + step;
        const isValueValid = newValue <= max;
        return isValueValid ? newValue : prev;
      });
    };

    return (
      <div data-testid="customInputNumber" className="input-number-root">
        <Button disabled={finalMinusDisabled} onClick={handleMinus}>
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
        <Button disabled={finalPlusDisabled} onClick={handleAdd}>
          <span>
            <AiOutlinePlus size={30} color={disabled ? '#c0c0c0' : '#1e9fd2'} />
          </span>
        </Button>
      </div>
    );
  }
);

export default CustomInputNumber;
