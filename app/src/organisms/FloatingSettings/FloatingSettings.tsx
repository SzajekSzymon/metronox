import { Icon } from "../../molecules/Icon/Icon";
import './floatingSettings.scss';

type FloatingSettingsProps = {
    handleOpenSettings: () => void
    handleSavePattern: () => void
    handleUpdatePattern: () => void
    isUpdate: boolean
}

export const FloatingSettings = ({handleOpenSettings, handleSavePattern, handleUpdatePattern, isUpdate} : FloatingSettingsProps) => {
  return (
    <div className="floatingSettings">
      <div className="floatingSettings__container">
      <Icon
          iconName="cog"
          className="icon__metronomeStop"
          alt={"cog"}
          onClick={isUpdate ? handleUpdatePattern : handleSavePattern}
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
