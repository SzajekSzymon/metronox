
type AvailableSound = 'metronome_1' | 'metronome_2'

export const SOUNDS_PATH = "/sounds";

export const SOUNDS: {
    value: string,
    label: AvailableSound,
}[] = [
  {
    value: `${SOUNDS_PATH}/metronome_1.wav`,
    label: `metronome_1`
  },
  {
    value: `${SOUNDS_PATH}/metronome_2.wav`,
    label: `metronome_2`
  }
];
