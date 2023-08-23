"use client";
import { ReactElement, useEffect } from "react";
import "./modal.scss";
import { Icon } from "../Icon/Icon";

type ModalProps = {
  children: ReactElement;
  isOpen: boolean;
  name: string;
  handleCloseModal: () => void;
};

export const Modal = ({
  isOpen,
  handleCloseModal,
  name,
  children,
}: ModalProps) => {
  if (!document.body.classList.contains("body-scroll-lock")) {
    document.body.classList.add("body-scroll-lock");
  }

  return (
    isOpen && (
      <div className="modal modal__wrapper" onClick={handleCloseModal}>
        <div
          className="modal__container"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="modal__container__header">
            <span>{name}</span>
            <Icon
              iconName="close"
              className="icon__close"
              alt={"close"}
              onClick={handleCloseModal}
            />
          </div>
          <div className="modal__container__content">{children}</div>
        </div>
      </div>
    )
  );
};
