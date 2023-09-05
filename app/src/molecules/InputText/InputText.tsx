import {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
  } from "react";
  import "./inputText.scss";
  
  interface InputProps
    extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {
    onChangeHandler: (value: string) => void;
    name: string;
    labelText: string;
    value: string;
  }
  
  export const InputText = ({
    labelText,
    name,
    onChangeHandler,
    value,
    ...inputProps
  }: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [innerValue, setInnerValue] = useState(value);
  
  
    const handleInputBlur = (enteredValue: string) => {
        return onChangeHandler(enteredValue);
    };
  
    return (
      <div className="input container">
        <label htmlFor={name}> {labelText} </label>
        <input
          {...inputProps}
          onBlur={(e) => handleInputBlur(e.target.value)}
          onChange={(e) => setInnerValue(e.target.value)}
          value={innerValue}
          ref={inputRef}
          name={name}
          type="text"
        />
      </div>
    );
  };
  