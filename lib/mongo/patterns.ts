import { PatternState } from "@/app/src/store/patternSlice";

interface savePatternProps extends PatternState  {
  owner: string,
}

export  const savePattern = async (data: savePatternProps ) => {
    const response = await fetch("/api/pattern", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response.json();
}
export  const getAllPatterns = async () => {
    const response = await fetch(`/api/pattern`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json()
}

export const getAllPatternsSharedForUser = async (data: {username: string} ) => {
  if(data.username) {
    const response = await fetch(`/api/shared/${data.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json()
  }
 
  return []
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

export  const deletePattern = async (data: {pattern: PatternState | null, index: number} ) => {
  const response = await fetch("/api/pattern", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
      return response.json()
}

