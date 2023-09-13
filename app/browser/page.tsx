"use client";

import { useSession } from "next-auth/react";
import { PatternList } from "../src/molecules/patternList/PatternList";
import { useEffect } from "react";
import { useAppDispatch } from "../src/store/hooks";
import { userActions } from "../src/store/userSlice";

export default function Home() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {},
      });
      const dispatch = useAppDispatch();
    
      useEffect(() => {
        dispatch(userActions.setUserEmail(session?.user?.email || ""));
    
        dispatch(userActions.getAllUserPatterns());
      }, [dispatch, session?.user?.email]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between "></main>
    // <PatternList/>
  );
}
