"use client";
import Image from "next/image";
import { Metronome } from "./src/organisms/Metronome/Metronome";
import { Modal } from "./src/molecules/modal/Modal";
import { FloatingSettings } from "./src/organisms/FloatingSettings/FloatingSettings";
import { useState } from "react";
import { Settings } from "./src/organisms/Settings/Settings";
import { useAppSelector } from "./src/store/hooks";
import { Pattern } from "./src/organisms/Pattern/Pattern";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPatternMode = useAppSelector((state) => state.metronome.patternMode);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      {isPatternMode ? <Pattern/> : <Metronome />}

      <FloatingSettings handleOpenSettings={() => setIsModalOpen(true)} />
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
