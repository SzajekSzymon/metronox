export  const getAllUserPatterns = async (data: {username: string} ) => {
    const response = await fetch(`/api/user/${data.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json()
}