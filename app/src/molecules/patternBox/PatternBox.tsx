import { useState } from "react";
import { Settings } from "../../organisms/Settings/Settings";
import { Icon } from "../Icon/Icon";
import "./patternBox.scss";
import { Modal } from "../modal/Modal";
import {
  AddPattern,
  PatternType,
} from "../../organisms/AddPattern /AddPattern";

type PatternBoxType = {
  items: PatternType[]
}

export const PatternBox = ({items}: PatternBoxType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="patternBox__wrapper">
      <div className="patternBox__container">
        {items.map((item, id ) => (
          <div className="patternBox__item" key={id}>
            <span>{`tempo: ${item.tempo}`} </span>
            <span>{`metre: ${item.metre}`} </span>
            <span>{`accent: ${item.accent}`} </span>
            <span>{`loops: ${item.loops}`} </span>
            <span>{`name: ${item.name}`} </span>
            </div>
        ))}
      </div>
      <Icon
        className="icon__circlePlus"
        iconName="circle-plus"
        alt="increase tempo"
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        isOpen={isModalOpen}
        name="Add Pattern"
        handleCloseModal={() => setIsModalOpen(false)}
      >
        <AddPattern modalClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};
