async function deleteItem(id) {
    try {
      const response = await fetch(
        `https://631359a3b466aa9b0397c51e.mockapi.io/b/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      await response.json();
      if (response.ok) {
        return response;
      }
  
      throw new Error();
    } catch (Error) {
      return { error : Error };
    }
  }
  
  export default deleteItem;
  
