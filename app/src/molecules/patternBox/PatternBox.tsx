import { useState } from "react";
import { Settings } from "../../organisms/Settings/Settings";
import { Icon } from "../Icon/Icon";
import "./patternBox.scss";
import { Modal } from "../modal/Modal";
import {
  AddPattern,
  PatternType,
} from "../../organisms/AddPattern /AddPattern";
import classNames from "classnames";

type PatternBoxType = {
  items: PatternType[];
  currentPatternIndex: number;
  isPlaying: boolean;
};

export const PatternBox = ({ items, currentPatternIndex, isPlaying }: PatternBoxType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatternId, setCurrentPatternId] = useState<number | null>(null);
  return (
    <div className="patternBox__wrapper">
      <div className="patternBox__container">
        {items.map((item, id) => (
          <div
            onClick={() => {
              setCurrentPatternId(id);
              setIsModalOpen(true);
            }}
            className="patternBox__item"
            style={{animationDuration: isPlaying && currentPatternIndex === id ? `${60 / item.tempo}s`  : '0s' }}
            key={id}
          >
            <span>{`tempo: ${item.tempo}`} </span>
            <span>{`metre: ${item.metre}`} </span>
            <span>{`accent: ${item.accent}`} </span>
            <span>{`loops: ${item.loops}`} </span>
            <span>{`name: ${item.name}`} </span>
            <span>{`silent: ${item.silent}`} </span>
          </div>
        ))}
      </div>
      <Icon
        className="icon__circlePlus"
        iconName="circle-plus"
        alt="increase tempo"
        onClick={() => {
          setCurrentPatternId(null);
          setIsModalOpen(true);
        } }
      />
      <Modal
        isOpen={isModalOpen}
        name="Add Pattern"
        handleCloseModal={() => {
          setIsModalOpen(false);
          setCurrentPatternId(null);
        }}
      >
        <AddPattern
          patternId={currentPatternId}
          modalClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
