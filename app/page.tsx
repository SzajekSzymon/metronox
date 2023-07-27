import Image from 'next/image'
import { Metronome } from './src/organisms/Metronome/Metronome'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Metronome />
    </main>
  )
}
