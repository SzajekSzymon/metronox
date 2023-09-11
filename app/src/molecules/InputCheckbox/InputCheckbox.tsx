import { useEffect, useState } from "react";
import "./inputCheckbox.scss";

interface InputProps {
  onChangeHandler: () => void;
  name: string;
  labelText: string;
  checked: boolean;
}

export const InputCheckbox = ({
  name,
  onChangeHandler,
  checked,
}: InputProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div className="checkbox">
      <label className="container">
        <input
          onChange={(e) => {
            onChangeHandler();
            setIsChecked(!isChecked);
          }}
          // defaultChecked={checked}
          checked={isChecked}
          name={name}
          type="checkbox"
        />
        <span className="checkmark" />
      </label>
    </div>
  );
};
