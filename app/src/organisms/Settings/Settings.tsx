import { InputCheckbox } from "../../molecules/InputCheckbox/InputCheckbox";
import { InputText } from "../../molecules/InputText/InputText";
import { Select } from "../../molecules/select/Select";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeAccentBeat,
  changeDefaultBeat,
} from "../../store/metronomeSlice";
import { patternActions } from "../../store/patternSlice";
import { SOUNDS } from "../../utils/sounds";
import "./settings.scss";

export const Settings = () => {
  const dispatch = useAppDispatch();
  const defaultBeatSample = useAppSelector(
    (state) => state.metronome.defaultBeat
  );
  const accentBeatSample = useAppSelector(
    (state) => state.metronome.accentBeat
  );
  const isPatternMode = useAppSelector((state) => state.metronome.patternMode);
  const pattern = useAppSelector((state) => state.pattern);

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
      {isPatternMode && (
        <>
          <div className="settings__item">
            <span> Name</span>

            <InputText
              labelText="Name"
              value={pattern.projectName || "pattern"}
              type="text"
              name="Name"
              onChangeHandler={(value) =>
                dispatch(patternActions.changeProjectName(value))
              }
            />
          </div>

          <div className="settings__item">
            <span> Public</span>
            <Select
              onChange={(e) => {
                dispatch(
                  patternActions.changePublic(e.target.value === "true")
                );
              }}
              defaultValue={pattern.public.toString()}
              options={[
                {
                  value: "true",
                  label: "on",
                },
                {
                  value: "false",
                  label: "off",
                },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
};
