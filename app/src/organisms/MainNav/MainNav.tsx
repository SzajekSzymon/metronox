"use client";
import { useState } from "react";
import { Icon } from "../../molecules/Icon/Icon";
import { useSession, signIn, signOut } from "next-auth/react";
import "./mainNav.scss";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setProject } from "../../store/patternSlice";

export const MainNav = () => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });

  const patterns = useAppSelector((state) => state.user.patterns);
  const pattern = useAppSelector((state) => state.pattern);

  const dispatch = useAppDispatch();

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

        <ul>
          {patterns?.map((el, id) => (
            <li
              onClick={() => {
                dispatch(setProject(el));
                console.log('pattern load')
                console.log(pattern)
              }}
              key={id}
            >
              {el.projectName}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
