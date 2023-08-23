import { useState } from "react";
import { Input } from "../../molecules/Input/Input";
import { Button } from "../../molecules/buttons/Button";
import { Select } from "../../molecules/select/Select";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeAccentBeat,
  changeDefaultBeat,
} from "../../store/metronomeSlice";
import { SOUNDS } from "../../utils/sounds";
import { MAX_TEMPO, MIN_TEMPO } from "../Metronome/Metronome";
import "./addPattern.scss";
import { addPattern } from "../../store/patternSlice";

export type PatternType = {
  tempo: number;
  metre: number;
  accent: number;
  name: string;
  loops: number;
};

const DEFAULT_PATTERN_VALUES: PatternType = {
  tempo: 100,
  metre: 4,
  accent: 1,
  name: "Pattern",
  loops: 4,
};

export const AddPattern = ({modalClose}: {modalClose: () => void}) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector(state => state.pattern);
  const [newPattern, setNewPattern] = useState(DEFAULT_PATTERN_VALUES);


console.log(store);

  const handleSetNewPattern = (
    key: keyof PatternType,
    value: number | string
  ) => {
    setNewPattern({
      ...newPattern,
      [key]: value,
    });
  };


  const handleSaveNewPattern = () => {
    dispatch(addPattern(newPattern));
    modalClose();
  }

  return (
    <>
      <div className="addPattern">
        <div className="addPattern__item">
          <span> Tempo</span>
          <Input
            labelText=""
            value={newPattern.tempo}
            type="number"
            name="bpm"
            min={MIN_TEMPO}
            max={MAX_TEMPO}
            onChangeHandler={(value) => handleSetNewPattern("tempo", value)}
          />
        </div>
        <div className="addPattern__item">
          <span> metre</span>
          <Input
            labelText=""
            value={newPattern.metre}
            type="number"
            name="metre"
            min={2}
            max={7}
            onChangeHandler={(value) => handleSetNewPattern("metre", value)}
          />
        </div>
        <div className="addPattern__item">
          <span> accent</span>
          <Input
            labelText=""
            value={newPattern.accent}
            type="number"
            name="metre"
            min={1}
            max={7}
            onChangeHandler={(value) => handleSetNewPattern("accent", value)}
          />
        </div>
        <div className="addPattern__item">
          <span> loops</span>
          <Input
            labelText=""
            value={newPattern.loops}
            type="number"
            name="loops"
            min={1}
            max={20}
            onChangeHandler={(value) => handleSetNewPattern("loops", value)}
          />
        </div>
      </div>
      <div className="footer">
        <Button label="Cancel" onClick={modalClose} />
        <Button label="Save" onClick={handleSaveNewPattern} />
      </div>
    </>
  );
};
