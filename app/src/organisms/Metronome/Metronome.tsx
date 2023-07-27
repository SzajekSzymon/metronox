"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../../molecules/Icon/Icon";
import "./metronome.scss";
import { Input } from "../../molecules/Input/Input";

const clickSound = new Audio('/sounds/metronome_1.wav');

export const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState<number>(100);



  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (isPlaying) {
      intervalId = setInterval(playClick, (60 / tempo) * 1000);
      console.log(tempo);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, tempo]);

  const handleTempoChange = (value: number) => {
    if (value >= 30 && value <= 320) {
      setTempo(value);
    }
  };

  const playClick = () => {
    clickSound.currentTime = 0;
    clickSound.play();
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

      <div className="metronome__settings">
        <Icon
          className="icon__circleMinus"
          iconName="circle-minus"
          alt="increase tempo"
          onClick={() => setTempo(tempo - 5)}
        />

        <Input
          labelText="BPM"
          value={tempo}
          type="number"
          name="bpm"
          min="30"
          max="320"
          onChangeHandler={(value) => setTempo(value)}
        />

        <Icon
          iconName="circle-plus"
          className="icon__circlePlus"
          alt="increase tempo"
          onClick={() => setTempo(tempo + 5)}
        />
      </div>
    </div>
  );
};
