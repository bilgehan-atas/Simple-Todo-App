async function getItems() {
    try {
      const response = await fetch(
        "https://631359a3b466aa9b0397c51e.mockapi.io/b/todos"
      );
      const result = await response.json();
      if (response.ok) {
        const items = [];
        for (const key in result) {
          items.push({
            id: result[key].id,
            content: result[key].content,
            isCompleted: result[key].isCompleted,
          })
        }
        return items.reverse();
      }
  
      throw new Error();
    } catch (Error) {
      return {error: Error};
    }
  }
  
  export default getItems;
