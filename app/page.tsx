"use client";
import Image from "next/image";
import { Metronome } from "./src/organisms/Metronome/Metronome";
import { Modal } from "./src/molecules/modal/Modal";
import { FloatingSettings } from "./src/organisms/FloatingSettings/FloatingSettings";
import { useEffect, useState } from "react";
import { Settings } from "./src/organisms/Settings/Settings";
import { useAppDispatch, useAppSelector } from "./src/store/hooks";
import { Pattern } from "./src/organisms/Pattern/Pattern";
import { getAllUserPatterns, savePattern } from "@/lib/mongo/patterns";
import { useSession } from "next-auth/react";
import { userActions } from "./src/store/userSlice";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPatternMode = useAppSelector((state) => state.metronome.patternMode);
  const pattern = useAppSelector((state) => state.pattern);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.getAllUserPatterns());

  }, [dispatch])
  
  
  const handleSavePattern = () => {
    if(session?.user?.email && isPatternMode) {
      savePattern({user: session?.user?.email, ...pattern})
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      {isPatternMode ? <Pattern/> : <Metronome />}

      <FloatingSettings handleOpenSettings={() => setIsModalOpen(true)} handleSavePattern={handleSavePattern} />
      <Modal
        isOpen={isModalOpen}
        name="Settings"
        handleCloseModal={() => setIsModalOpen(false)}
      >
        <Settings />
      </Modal>
    </main>
  );
}
