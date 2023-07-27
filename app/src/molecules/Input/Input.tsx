import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import "./input.scss";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChangeHandler: (value: number) => void;
  name: string;
  labelText: string;
  value: number;
}

export const Input = ({
  labelText,
  name,
  onChangeHandler,
  value,
  ...inputProps
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    const max = parseInt(inputRef.current?.getAttribute("max") || "0", 10);
    const min = parseInt(inputRef.current?.getAttribute("min") || "0", 10);

    if (value < min) {
      onChangeHandler(min);
    } else if (value > max) {
      onChangeHandler(max);
    }

    setInnerValue(value);
  }, [onChangeHandler, value]);

  const handleInputBlur = (enteredValue: string) => {
    if (inputRef.current) {
      const max = parseInt(inputRef.current?.getAttribute("max") || "0", 10);
      const min = parseInt(inputRef.current?.getAttribute("min") || "0", 10);

      const enteredValueAsNumber = parseInt(enteredValue);

      if (enteredValueAsNumber < min) {
        onChangeHandler(min);
      } else if (enteredValueAsNumber > max) {
        onChangeHandler(max);
      }

      return onChangeHandler(enteredValueAsNumber);
    }
  };

  return (
    <div className="input container">
      <label htmlFor={name}> {labelText} </label>
      <input
        {...inputProps}
        onBlur={(e) => handleInputBlur(e.target.value)}
        onChange={(e) => setInnerValue(parseInt(e.target.value))}
        value={innerValue}
        ref={inputRef}
        name={name}
        type="number"
      />
    </div>
  );
};
