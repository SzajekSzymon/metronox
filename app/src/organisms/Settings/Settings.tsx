import { useSession } from "next-auth/react";
import { InputCheckbox } from "../../molecules/InputCheckbox/InputCheckbox";
import { InputNumber } from "../../molecules/InputNumber/InputNumber";
import { InputText } from "../../molecules/InputText/InputText";
import { Select } from "../../molecules/select/Select";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeAccentBeat,
  changeDefaultBeat,
} from "../../store/metronomeSlice";
import { initialState, patternActions } from "../../store/patternSlice";
import { SOUNDS } from "../../utils/sounds";
import "./settings.scss";
import { Button } from "../../molecules/buttons/Button";
import { deleteProject } from "@/lib/mongo/user";
import { userActions } from "../../store/userSlice";

export const Settings = ({closeModal}: {closeModal: () => void} ) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });
  const dispatch = useAppDispatch();
  const defaultBeatSample = useAppSelector(
    (state) => state.metronome.defaultBeat
  );
  const accentBeatSample = useAppSelector(
    (state) => state.metronome.accentBeat
  );
  const isPatternMode = useAppSelector((state) => state.metronome.patternMode);
  const pattern = useAppSelector((state) => state.pattern);

  const handleRemoveProject = async (id: string | null, username?: string | null) => {
    if(username && id) {
     await deleteProject({username, id});
     dispatch(userActions.getAllUserPatterns());
     dispatch(patternActions.setProject(initialState));
     closeModal();
    }
  }

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
            <span> Play in loop</span>
            <Select
              onChange={(e) =>
                dispatch(
                  patternActions.changePlayInLoop(e.target.value == "true")
                )
              }
              defaultValue={pattern.playInLoop.toString()}
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
          {pattern.playInLoop && (
            <div className="settings__item">
              <span> Timer (minutes)</span>
              <InputNumber
                labelText="Minutes"
                value={pattern.timer}
                type="number"
                name="bpm"
                min={0}
                max={20}
                onChangeHandler={(value) => {
                  dispatch(patternActions.setTimer(value));
                }}
              />
            </div>
          )}

          {session?.user?.email && (
            <>
              <div className="settings__item">
                <span> Name </span>

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
              <div className="settings__item">
                <span> Public for</span>
                <InputText
                  labelText="Emails"
                  value={pattern.emails?.join(" ") || ""}
                  type="text"
                  name="Emails"
                  onChangeHandler={(value) =>
                    dispatch(patternActions.setEmails(value))
                  }
                />
              </div>
              <div className="footer">
                <Button label="Remove project" onClick={() => handleRemoveProject(pattern._id, session?.user?.email)} />
                <Button label="Apply" onClick={() => closeModal()} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
