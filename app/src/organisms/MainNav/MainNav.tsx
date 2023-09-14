"use client";
import { useState } from "react";
import { Icon } from "../../molecules/Icon/Icon";
import { useSession, signIn, signOut } from "next-auth/react";
import "./mainNav.scss";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { initialState, patternActions } from "../../store/patternSlice";
import Collapse from "../../molecules/Collapse/Collapse";
import Link from "next/link";
import { enablePatternMode } from "../../store/metronomeSlice";

export const MainNav = () => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });

  const patterns = useAppSelector((state) => state.user.patterns);
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
        {session && (
          <span className="userName">
            Hello {session.user?.name} ! <br />
          </span>
        )}
        <span
          onClick={() => {
            dispatch(enablePatternMode(false))
          }}
        >
          <Link href="/">Metronome</Link>
        </span>

        <span
              onClick={() => {
                dispatch(patternActions.setProject(initialState));
              }}
            >
              <Link href="/">New pattern</Link>
            </span>
        {session && (
          <>
            <Collapse title="Your patterns">
              <div>
                <ul>
                  {patterns?.map((el, id) => (
                    <li
                      onClick={() => {
                        dispatch(patternActions.setProject(el));
                      }}
                      key={id}
                    >
                      <Link href="/">{`- ${el.projectName}`}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Collapse>
          </>
        )}
        <span>
          <Link href="/browser">Find pattern</Link>
        </span>
        {session ? (
          <>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </div>
    </>
  );
};
