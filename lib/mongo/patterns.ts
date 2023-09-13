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
}
export  const getAllPatterns = async (data: {username: string} ) => {
    const response = await fetch(`/api/user/${data.username}`, {
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

