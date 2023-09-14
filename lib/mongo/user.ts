export  const getAllUserPatterns = async (data: {username: string} ) => {
  if(data.username) {
    const response = await fetch(`/api/user/${data.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json()
  }
  return []
}