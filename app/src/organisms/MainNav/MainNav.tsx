"use client";
import { useState } from "react";
import { Icon } from "../../molecules/Icon/Icon";
import "./mainNav.scss";
import classNames from "classnames";

export const MainNav = () => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  return (
    <>
      <div id="main-nav" className="columns-1">
        <Icon iconName="logo" className="icon__logo" alt={"logo"} />
        <Icon
          iconName="menuBars"
          className="icon__bars"
          alt={"menu"}
          onClick={() => setSideBarOpen(!sideBarOpen)}
        />
      </div>
      <div
        className={classNames("sideBar", {
          "sideBar--open": sideBarOpen,
        })}
      >
      
      </div>
    </>
  );
};
