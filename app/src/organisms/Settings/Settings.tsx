import { Select } from "../../molecules/select/Select";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeAccentBeat, changeDefaultBeat } from "../../store/metronomeSlice";
import { SOUNDS } from "../../utils/sounds";
import "./settings.scss";

export const Settings = () => {
    const dispatch = useAppDispatch()
    const defaultBeatSample = useAppSelector((state) => state.metronome.defaultBeat)
    const accentBeatSample = useAppSelector((state) => state.metronome.accentBeat)
    
  return (
    <div className="settings">
      <div className="settings__item">
        <span> Default beat</span>
        <Select
        onChange={(e) => dispatch(changeDefaultBeat(e.target.value))}
          defaultValue={defaultBeatSample}
          options={SOUNDS}
        />
      </div>
      <div className="settings__item">
        <span> Accent beat</span>
        <Select
          onChange={(e) => dispatch(changeAccentBeat(e.target.value))}
          defaultValue={accentBeatSample}
          options={SOUNDS}
        />
      </div>
    </div>
  );
};
