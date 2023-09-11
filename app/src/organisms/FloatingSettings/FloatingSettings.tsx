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
          iconName="disk"
          className="icon__disk"
          alt={"disk"}
          onClick={isUpdate ? handleUpdatePattern : handleSavePattern}
        />
      <Icon
          iconName="cog"
          className="icon__cog"
          alt={"cog"}
          onClick={handleOpenSettings}
        />
      </div>
    </div>
  );
};
