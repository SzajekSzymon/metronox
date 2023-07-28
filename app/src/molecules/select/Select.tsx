import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import './select.scss';


type Option = {
  value: string;
  label: string;
};


interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: Option[],

}

export const Select = ({ options, ...selectProps }: SelectProps) => {
  return (
    <select {...selectProps}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {" "}
          {option.label}
        </option>
      ))}
    </select>
  );
};
