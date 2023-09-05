import { Icon } from "../../molecules/Icon/Icon";
import './floatingSettings.scss';

type FloatingSettingsProps = {
    handleOpenSettings: () => void
    handleSavePattern: () => void
}

export const FloatingSettings = ({handleOpenSettings, handleSavePattern} : FloatingSettingsProps) => {
  return (
    <div className="floatingSettings">
      <div className="floatingSettings__container">
      <Icon
          iconName="cog"
          className="icon__metronomeStop"
          alt={"cog"}
          onClick={handleSavePattern}
        />
      <Icon
          iconName="cog"
          className="icon__metronomeStop"
          alt={"cog"}
          onClick={handleOpenSettings}
        />
      </div>
    </div>
  );
};
