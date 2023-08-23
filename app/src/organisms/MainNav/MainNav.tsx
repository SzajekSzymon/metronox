"use client";
import { useState } from "react";
import { Icon } from "../../molecules/Icon/Icon";
import { useSession, signIn, signOut } from "next-auth/react";
import "./mainNav.scss";
import classNames from "classnames";

export const MainNav = () => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });

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
        {session ? (
          <>
            Signed in as {session.user?.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </div>
    </>
  );
};
