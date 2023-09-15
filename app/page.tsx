"use client";
import Image from "next/image";
import { Metronome } from "./src/organisms/Metronome/Metronome";
import { Modal } from "./src/molecules/modal/Modal";
import { FloatingSettings } from "./src/organisms/FloatingSettings/FloatingSettings";
import { useEffect, useState } from "react";
import { Settings } from "./src/organisms/Settings/Settings";
import { useAppDispatch, useAppSelector } from "./src/store/hooks";
import { Pattern } from "./src/organisms/Pattern/Pattern";
import { savePattern, updatePattern } from "@/lib/mongo/patterns";
import { useSession } from "next-auth/react";
import { userActions } from "./src/store/userSlice";
import { patternActions } from "./src/store/patternSlice";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPatternMode = useAppSelector((state) => state.metronome.patternMode);
  const patterns = useAppSelector((state) => state.user.patterns);
  const pattern = useAppSelector((state) => state.pattern);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.setUserEmail(session?.user?.email || ""));

    dispatch(userActions.getAllUserPatterns());
  }, [dispatch, session?.user?.email]);

  const handleSavePattern = async () => {
    if (session?.user?.email && isPatternMode) {
      const result = await savePattern({
        ...pattern,
        owner: session?.user?.email,
      });
      
      dispatch(userActions.getAllUserPatterns());

      dispatch(
        patternActions.setProject({
          ...pattern,
          _id: result.id,
          owner: session?.user?.email,
        })
      );
    }
  };

  const handleUpdatePattern = () => {
    if (session?.user?.email && isPatternMode && pattern._id) {
      dispatch(patternActions.requestUpdatePattern());
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      {isPatternMode ? <Pattern /> : <Metronome />}

      <FloatingSettings
        handleOpenSettings={() => setIsModalOpen(true)}
        handleUpdatePattern={handleUpdatePattern}
        handleSavePattern={handleSavePattern}
        isUpdate={pattern._id !== null}
      />
      <Modal
        isOpen={isModalOpen}
        name="Settings"
        handleCloseModal={() => setIsModalOpen(false)}
      >
        <Settings closeModal={() => setIsModalOpen(false)} />
      </Modal>
    </main>
  );
}
