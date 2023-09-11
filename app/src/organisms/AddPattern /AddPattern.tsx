import { useState } from "react";
import { InputNumber } from "../../molecules/InputNumber/InputNumber";
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
import { patternActions } from "../../store/patternSlice";
import { InputCheckbox } from "../../molecules/InputCheckbox/InputCheckbox";

export type PatternType = {
  tempo: number;
  metre: number;
  accent: number;
  name: string;
  loops: number;
  silent: boolean;
};

const DEFAULT_PATTERN_VALUES: PatternType = {
  tempo: 100,
  metre: 4,
  accent: 1,
  name: "Pattern",
  loops: 4,
  silent: false,
};

export const AddPattern = ({
  modalClose,
  patternId,
}: {
  modalClose: () => void;
  patternId: number | null;
}) => {
  console.log(patternId);
  const dispatch = useAppDispatch();
  const currentEditPattern = useAppSelector((state) =>
    typeof patternId === 'number' ? state.pattern.patterns[patternId] : null
  );
  const [newPattern, setNewPattern] = useState(currentEditPattern || DEFAULT_PATTERN_VALUES);

  const handleSetNewPattern = (
    key: keyof PatternType,
    value: number | string | boolean
  ) => {
    setNewPattern({
      ...newPattern,
      [key]: value,
    });
  };

  const handleSaveNewPattern = () => {
    dispatch(patternActions.addPattern(newPattern));
    modalClose();
  };

  const handleEditPattern = () => {
    dispatch(patternActions.editPattern({pattern: newPattern, id: patternId}));
    modalClose();
  }

  const handleRemovePattern = () => {
    dispatch(patternActions.requestRemovePattern({index: patternId}));
    modalClose();
  };

  return (
    <>
      <div className="addPattern">
        <div className="addPattern__item">
          <span> Tempo</span>
          <InputNumber
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
          <InputNumber
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
          <InputNumber
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
          <InputNumber
            labelText=""
            value={newPattern.loops}
            type="number"
            name="loops"
            min={1}
            max={20}
            onChangeHandler={(value) => handleSetNewPattern("loops", value)}
          />
        </div>
        <div className="addPattern__item">
          <span> silent loops</span>
          <Select
          onChange={(e) => handleSetNewPattern("silent", e.target.value === 'true')}
          defaultValue={newPattern.silent.toString()}
          options={[{
            value: 'true',
            label: 'on'
          }, {
            value: 'false',
            label: 'off',
          }]}
        />
        </div>
      </div>
      <div className="footer">
        <Button label="Cancel" onClick={modalClose} />
        <Button label="Remove" onClick={handleRemovePattern} />
        <Button label="Save" onClick={currentEditPattern  ? handleEditPattern : handleSaveNewPattern} />
      </div>
    </>
  );
};
