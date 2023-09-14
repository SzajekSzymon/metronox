import { useSession } from "next-auth/react";
import { Icon } from "../../molecules/Icon/Icon";
import "./floatingSettings.scss";
import { useAppSelector } from "../../store/hooks";

type FloatingSettingsProps = {
  handleOpenSettings: () => void;
  handleSavePattern: () => void;
  handleUpdatePattern: () => void;
  isUpdate: boolean;
};

export const FloatingSettings = ({
  handleOpenSettings,
  handleSavePattern,
  handleUpdatePattern,
  isUpdate,
}: FloatingSettingsProps) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });

  const isPatternMode = useAppSelector((state) => state.metronome.patternMode);
  return (
    <div className="floatingSettings">
      <div className="floatingSettings__container">
        {session?.user?.email && isPatternMode && (
          <Icon
            iconName="disk"
            className="icon__disk"
            alt={"disk"}
            onClick={isUpdate ? handleUpdatePattern : handleSavePattern}
          />
        )}

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
