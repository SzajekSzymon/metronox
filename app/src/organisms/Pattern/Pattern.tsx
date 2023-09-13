import { useEffect, useState } from "react";
import { Icon } from "../../molecules/Icon/Icon";
import { PatternBox } from "../../molecules/patternBox/PatternBox";
import { Modal } from "antd";
import { Settings } from "../Settings/Settings";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { enablePatternMode } from "../../store/metronomeSlice";
import TabulatureEditor from "../TabulatureEditor/TabulatureEditor";
import "./pattern.scss";

export const Pattern = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const patterns = useAppSelector((state) => state.pattern.patterns);
  const pattern = useAppSelector((state) => state.pattern);

  const dispatch = useAppDispatch();

  const defaultBeatSample = useAppSelector(
    (state) => state.metronome.defaultBeat
  );
  const accentBeatSample = useAppSelector(
    (state) => state.metronome.accentBeat
  );

  const clickSound = new Audio(defaultBeatSample);
  const accentClickSound = new Audio(accentBeatSample);

  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const currentPattern = patterns[currentPatternIndex];

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    let beat = 0;
    let loopCount = 0;

    if (isPlaying && currentPattern) {
      intervalId = setInterval(() => {
        if (beat % currentPattern.metre === currentPattern.accent - 1) {
          accentClickSound.currentTime = 0;
          if (!currentPattern.silent) {
            accentClickSound.play();
          }
        } else {
          clickSound.currentTime = 0;
          if (!currentPattern.silent) {
            clickSound.play();
          }
        }

        beat = (beat + 1) % currentPattern.metre;

        if (beat === 0) {
          loopCount++;
        }

        if (loopCount >= currentPattern.loops) {
          setCurrentPatternIndex(
            (prevIndex) => (prevIndex + 1) % patterns.length
          );
          loopCount = 0;
          if (currentPatternIndex + 1 >= patterns.length) {
            if (pattern.playInLoop) {
              setCurrentPatternIndex(0);
            } else {
              setIsPlaying(false);
            }
          }
        }
      }, (60 / currentPattern.tempo) * 1000);
    }

    // patternItems[currentPatternIndex].style.animationDuration = `${0}s`

    return () => clearInterval(intervalId);
  }, [
    accentClickSound,
    clickSound,
    currentPattern,
    currentPatternIndex,
    isPlaying,
    patterns,
  ]);

  return (
    <div className="metronome container">
      <Icon
        iconName="fire"
        className="icon__fire"
        alt={"fire"}
        onClick={() => dispatch(enablePatternMode(false))}
      />
      {isPlaying ? (
        <Icon
          iconName="metronome-stop"
          className="icon__metronomeStop"
          alt={"metronome"}
          onClick={() => {
            setIsPlaying(false);
            setCurrentPatternIndex(0);
          }}
        />
      ) : (
        <Icon
          iconName="metronome-play"
          className="icon__metronomePlay"
          alt={"metronome"}
          onClick={() => setIsPlaying(true)}
        />
      )}
      <div className="projectName"> {pattern.projectName?.toUpperCase()}</div>

      <PatternBox
        isPlaying={isPlaying}
        currentPatternIndex={currentPatternIndex}
        items={patterns}
      />
    </div>
  );
};