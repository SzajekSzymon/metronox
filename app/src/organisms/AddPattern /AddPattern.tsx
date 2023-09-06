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

export const AddPattern = ({
  modalClose,
  patternId,
}: {
  modalClose: () => void;
  patternId: number | null;
}) => {
  const dispatch = useAppDispatch();
  const currentEditPattern = useAppSelector((state) =>
    patternId ? state.pattern.patterns[patternId] : null
  );
  const [newPattern, setNewPattern] = useState(DEFAULT_PATTERN_VALUES);

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
    dispatch(patternActions.addPattern(newPattern));
    modalClose();
  };

  const handleEditPattern = () => {
    dispatch(patternActions.editPattern({pattern: newPattern, id: patternId}));
    modalClose();
  };

  return (
    <>
      <div className="addPattern">
        <div className="addPattern__item">
          <span> Tempo</span>
          <InputNumber
            labelText=""
            value={currentEditPattern?.tempo || newPattern.tempo}
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
            value={currentEditPattern?.metre || newPattern.metre}
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
            value={currentEditPattern?.accent || newPattern.accent}
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
            value={currentEditPattern?.loops || newPattern.loops}
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
        <Button label="Save" onClick={currentEditPattern ? handleEditPattern : handleSaveNewPattern} />
      </div>
    </>
  );
};
