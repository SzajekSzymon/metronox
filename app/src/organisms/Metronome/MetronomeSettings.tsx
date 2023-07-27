import { Icon } from "../../molecules/Icon/Icon";
import { Input } from "../../molecules/Input/Input";
import { MAX_TEMPO, MIN_TEMPO } from "./Metronome";

type MetonomeSettingsProps = {
  tempo: number;
  handleTempoChange: (value: number) => void;
  handleBeatsPerMeasureChange?: () => void;
  handleAccentChange?: () => void;
};

export const MetronomeSettings = ({
  tempo,
  handleTempoChange,
  handleBeatsPerMeasureChange,
  handleAccentChange,
}: MetonomeSettingsProps) => {
  const buttonTempoChange = (
    value: number,
    action: "increase " | "decrease"
  ) => {
   
    if (value % 5 !== 0 && action === "increase ") {
        console.log('dupa')
      const newTempo = value - (value % 5);
      handleTempoChange(newTempo);
      return;
    }

    if (value % 5 !== 0 && action === "decrease") {
      const newTempo = value + (5 - (value % 5));

      handleTempoChange(newTempo);
      return;
    } 

    handleTempoChange(value);

  };

  return (
    <div className="metronome__settings">
      <Icon
        className="icon__circleMinus"
        iconName="circle-minus"
        alt="increase tempo"
        onClick={() => buttonTempoChange(tempo - 5, "decrease")}
      />

      <Input
        labelText="BPM"
        value={tempo}
        type="number"
        name="bpm"
        min={MIN_TEMPO}
        max={MAX_TEMPO}
        onChangeHandler={(value) => handleTempoChange(value)}
      />

      <Icon
        iconName="circle-plus"
        className="icon__circlePlus"
        alt="increase tempo"
        onClick={() => buttonTempoChange(tempo + 5, "increase ")}
      />
    </div>
  );
};
