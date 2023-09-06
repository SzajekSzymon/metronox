import { PatternState } from "@/app/src/store/patternSlice";

interface savePatternProps extends PatternState  {
  user: string,
}

export  const savePattern = async (data: savePatternProps ) => {
    const response = await fetch("/api/pattern", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
}
export  const getAllUserPatterns = async ( ) => {
    const response = await fetch("/api/pattern", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json()
}
export  const updatePattern = async (data: PatternState ) => {
  const response = await fetch("/api/pattern", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
      return response.json()
}

