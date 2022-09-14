async function PutItem(newItem, id) {
    try {
      const response = await fetch(
        `https://631359a3b466aa9b0397c51e.mockapi.io/b/todos/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(newItem),
          headers: {
            "Content-Type": "application/json",
          },
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
  
  export default PutItem;
  