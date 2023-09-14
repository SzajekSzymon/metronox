"use client";

import { useSession } from "next-auth/react";
import { PatternList } from "../src/molecules/patternList/PatternList";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import { userActions } from "../src/store/userSlice";
import { libraryActions } from "../src/store/librarySlice";

export default function Home() {

    const patterns = useAppSelector((state) => state.library.patterns);
    
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

      console.log(patterns)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between "></main>
    // <PatternList/>
  );
}
