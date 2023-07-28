"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../../molecules/Icon/Icon";
import "./metronome.scss";
import { MetronomeSettings } from "./MetronomeSettings";
import { useAppSelector } from "../../store/hooks";



export const MIN_TEMPO = 30;
export const MAX_TEMPO = 280;

export const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState<number>(100);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4); // Number of beats per measure (4/4 by default)
  const [accentBeat, setAccentBeat] = useState(1); // Accent the first beat by default

  const defaultBeatSample = useAppSelector((state) => state.metronome.defaultBeat)
  const accentBeatSample = useAppSelector((state) => state.metronome.accentBeat)

  const clickSound = new Audio(defaultBeatSample);
  const accentClickSound = new Audio(accentBeatSample);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    let beat = 0;

    if (isPlaying) {
      intervalId = setInterval(() => {
        if (beat === accentBeat - 1) {
          accentClickSound.currentTime = 0;
          accentClickSound.play();
        } else {
          clickSound.currentTime = 0;
          clickSound.play();
        }

        beat = (beat + 1) % beatsPerMeasure;
      }, (60 / tempo) * 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, tempo, beatsPerMeasure, accentBeat]);

  const handleTempoChange = (value: number) => {
    if (value >= MIN_TEMPO && value <= MAX_TEMPO) {
      setTempo(value);
    }
  };

  const handleBeatsPerMeasureChange = (value: number) => {
    if (value >= 1 && value <= 8) {
      setBeatsPerMeasure(value);
    }
  };

  const handleAccentChange = (value: number) => {
    if(value >= 1 && value <= beatsPerMeasure)
    setAccentBeat(value);
  };

  return (
    <div className="metronome container">
      {isPlaying ? (
        <Icon
          iconName="metronome-stop"
          className="icon__metronomeStop"
          alt={"metronome"}
          onClick={() => setIsPlaying(false)}
        />
      ) : (
        <Icon
          iconName="metronome-play"
          className="icon__metronomePlay"
          alt={"metronome"}
          onClick={() => setIsPlaying(true)}
        />
      )}
      <MetronomeSettings
        tempo={tempo}
        beatsPerMeasure={beatsPerMeasure}
        accentBeat={accentBeat}
        handleTempoChange={handleTempoChange}
        handleAccentChange={handleAccentChange}
        handleBeatsPerMeasureChange={handleBeatsPerMeasureChange}
      />
    </div>
  );
};
