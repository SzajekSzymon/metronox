"use client";

import { useSession } from "next-auth/react";
import { PatternList } from "../src/molecules/patternList/PatternList";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import { userActions } from "../src/store/userSlice";
import { libraryActions } from "../src/store/librarySlice";
import classnames from "classnames";
import { InputText } from "../src/molecules/InputText/InputText";
import { PatternState } from "../src/store/patternSlice";
import { Button } from "../src/molecules/buttons/Button";

export default function Home() {
  const patterns = useAppSelector((state) => state.library.patterns);
  const patternsSharedForUser = useAppSelector(
    (state) => state.library.patternsSharedForUser
  );

  const [isPatternsSharedForUserMode, setIsPatternSharedForUserMode] =
    useState(false);

  const [filterValue, setFilterValue] = useState("");

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

  const filter = (patterns: PatternState[]) => {
    return patterns.filter(el => el.projectName?.includes(filterValue) || el.owner.trim().includes(filterValue) )
  }

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="search">
      <InputText
        labelText="Search"
        value={filterValue}
        type="text"
        name="Name"
        onChangeHandler={(value) => {
          setFilterValue(value);
        }}
      />
             <Button label="Search" onClick={() => {}} />
      </div>
      
      {session?.user?.email && (
        <div className="patternList__switch">
          <span
            className={classnames("", {
              active: !isPatternsSharedForUserMode,
            })}
            onClick={() => {
              setIsPatternSharedForUserMode(false);
            }}
          >
            All patterns{" "}
          </span>
          <span
            className={classnames("", {
              active: isPatternsSharedForUserMode,
            })}
            onClick={() => {
              setIsPatternSharedForUserMode(true);
            }}
          >
            Shared for me{" "}
          </span>
        </div>
      )}

      {isPatternsSharedForUserMode ? (
        <PatternList list={ filterValue !== '' ? filter(patternsSharedForUser) : patternsSharedForUser} />
      ) : (
        <PatternList list={ filterValue !== '' ? filter(patterns) : patterns} />
      )}
    </main>
  );
}
