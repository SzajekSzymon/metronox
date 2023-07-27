"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../../molecules/Icon/Icon";
import "./metronome.scss";
import { Input } from "../../molecules/Input/Input";
import { MetronomeSettings } from "./MetronomeSettings";

const clickSound = new Audio('/sounds/metronome_2.wav');
const accentClickSound = new Audio('/sounds/metronome_1.wav');


export const MIN_TEMPO = 30;
export const MAX_TEMPO = 280;

export const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState<number>(100);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4); // Number of beats per measure (4/4 by default)
  const [accentBeat, setAccentBeat] = useState(1); // Accent the first beat by default

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
    <MetronomeSettings tempo={tempo} handleTempoChange={handleTempoChange} />
    </div>
  );
};
