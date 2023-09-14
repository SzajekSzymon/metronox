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
export  const deleteProject = async (data: {username: string, id: string} ) => {
  if(data.username) {
    const response = await fetch(`/api/user/${data.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: data.id}),
    });
    return response.json();
  }
  return []
}

