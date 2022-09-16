import { createContext, useEffect, useState } from "react";
import getItems from "../api/getItems";

export const ItemsContext = createContext([]);

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchContent, setSearchContent] = useState(null);
  const [showCompletedItems, setShowCompletedItems] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getItems();
      if (result.error) {
        setErrorMessage(result.error);
      } else {
        setItems(result);
        setFilteredItems(
          result.filter((element) => element.isCompleted === showCompletedItems)
        );
        setErrorMessage(null);
        setIsLoaded(true);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    filterItems();
  }, [showCompletedItems, searchContent]);

  const itemsLoader = (type, object) => {
    if (type === "deleteItem") {
      const index = items.map((e)=> {return e.id}).indexOf(object.id)
      const newItems = items;
      items.splice(index, 1);
      setItems(newItems);
    }
    if (type === "postItem") {
      const newItems = items;
      newItems.unshift(object)
      setItems(newItems);
    }
    if (type === "putItem_Complete") {
      const index = items.map((e)=> {return e.id}).indexOf(object.id)
      const newItems = items;
      newItems[index]["isCompleted"] = object.isCompleted;
      setItems(newItems);
    }
    if (type === "putItem_Edit") {
      const index = items.map((e)=> {return e.id}).indexOf(object.id)
      const newItems = items;
      newItems[index] = object;
      setItems(newItems);
    }
    filterItems();
  }

  const filterItems = () => {
    const newItems = items.filter(
      (item) =>
        !searchContent ||
        item?.content?.toLowerCase().includes(searchContent.toLowerCase())
    );
    setFilteredItems(newItems.filter((element) => element.isCompleted === showCompletedItems))
  };

  const value = {
    items,
    filteredItems,
    itemsLoader,
    isLoaded,
    errorMessage,
    searchContent,
    setSearchContent,
    showCompletedItems,
    setShowCompletedItems,
  };
  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
