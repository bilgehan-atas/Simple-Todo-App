import { createContext, useEffect, useState } from "react";
import getItems from "../api/getItems";

export const ItemsContext = createContext([]);

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [itemsByCompletion, setItemsByCompletion] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(null);
  const [searchContent, setSearchContent] = useState(null);
  const [showCompletedItems, setShowCompletedItems] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getItems();
      if (result.error) {
        setIsError(result.error);
      } else {
        setItems(result);
        setItemsByCompletion(
          result.filter((element) => element.isCompleted === showCompletedItems)
        );
        setFilteredItems(
          result.filter((element) => element.isCompleted === showCompletedItems)
        );
        setIsError(null);
        setIsLoaded(true);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    // console.log("useeffect filte",items)
    filterItems();
  }, [items, itemsByCompletion, searchContent]);

  useEffect(() => {
    // console.log("useefefet completion",items)
    setItemsByCompletion(
      items.filter((element) => element.isCompleted === showCompletedItems)
    );
  }, [items, showCompletedItems]);

  const itemsLoader = (type, object) => {
    if (type === "deleteItem") {
      const index = items.map((e)=> {return e.id}).indexOf(object.id)
      const newItems = items;
      items.splice(index, 1);
      setItems(newItems);
      setItemsByCompletion(
        items.filter((element) => element.isCompleted === showCompletedItems)
      );
      setFilteredItems(
        items.filter((element) => element.isCompleted === showCompletedItems)
      );
    }
    if (type === "postItem") {
      const newItems = items;
      newItems.unshift(object)
      setItems(newItems);
      setItemsByCompletion(
        items.filter((element) => element.isCompleted === showCompletedItems)
      );
      setFilteredItems(
        items.filter((element) => element.isCompleted === showCompletedItems)
      );
    }
    if (type === "putItem") {
      const index = items.map((e)=> {return e.id}).indexOf(object.id)
      const newItem = items[index]["isCompleted"] = object.isCompleted;
      const newItems = items;
      items.splice(index, 1, newItem);
      setItems(newItems);
      setItemsByCompletion(
        items.filter((element) => element.isCompleted === showCompletedItems)
      );
      setFilteredItems(
        items.filter((element) => element.isCompleted === showCompletedItems)
      );
    }
  }

  const filterItems = () => {
    const newItems = itemsByCompletion.filter(
      (item) =>
        !searchContent ||
        item?.content?.toLowerCase().includes(searchContent.toLowerCase())
    );
    setFilteredItems(newItems);
  };

  const value = {
    items,
    filteredItems,
    itemsLoader,
    isLoaded,
    isError,
    searchContent,
    setSearchContent,
    showCompletedItems,
    setShowCompletedItems,
  };
  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
