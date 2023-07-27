"use client";
import Image from "next/image";
import { Metronome } from "./src/organisms/Metronome/Metronome";
import { Modal } from "./src/molecules/modal/Modal";
import { FloatingSettings } from "./src/organisms/FloatingSettings/FloatingSettings";
import { useState } from "react";

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Metronome />
      <FloatingSettings handleOpenSettings={() => setIsModalOpen(true) }/>
      <Modal isOpen={isModalOpen} handleCloseModal={() => setIsModalOpen(false)}>
        <>eloo</>
      </Modal>
    </main>
  );
}
