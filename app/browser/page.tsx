"use client";

import { useSession } from "next-auth/react";
import { PatternList } from "../src/molecules/patternList/PatternList";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import { userActions } from "../src/store/userSlice";
import { libraryActions } from "../src/store/librarySlice";
import classnames from "classnames";

export default function Home() {
  const patterns = useAppSelector((state) => state.library.patterns);
  const patternsSharedForUser = useAppSelector(
    (state) => state.library.patternsSharedForUser
  );

  const [isPatternsSharedForUserMode, setIsPatternSharedForUserMode] =
    useState(false);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.setUserEmail(session?.user?.email || ""));
    dispatch(libraryActions.getAllPatterns());
    dispatch(userActions.getAllUserPatterns());
  }, [dispatch, session?.user?.email]);

  return (
    <main className="flex min-h-screen flex-col items-center ">
      {session?.user?.email && (
        <div className="patternList__switch">
          <span
            className={classnames("", {
              active: !isPatternsSharedForUserMode,
            })}
            onClick={() => setIsPatternSharedForUserMode(false)}
          >
            All patterns{" "}
          </span>
          <span
            className={classnames("", {
              active: isPatternsSharedForUserMode,
            })}
            onClick={() => setIsPatternSharedForUserMode(true)}
          >
            Shared for me{" "}
          </span>
        </div>
      )}

      {isPatternsSharedForUserMode ? (
        <PatternList list={patternsSharedForUser} />
      ) : (
        <PatternList list={patterns} />
      )}
    </main>
  );
}
