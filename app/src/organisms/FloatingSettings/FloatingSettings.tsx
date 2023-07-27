import { Icon } from "../../molecules/Icon/Icon";
import './floatingSettings.scss';

type FloatingSettingsProps = {
    handleOpenSettings: () => void
}

export const FloatingSettings = ({handleOpenSettings} : FloatingSettingsProps) => {
  return (
    <div className="floatingSettings">
      <div className="floatingSettings__container">
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
