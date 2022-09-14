import { createContext, useEffect, useState } from "react";
import GetItems from "../api/GetItems";

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
      const result = await GetItems();
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
    filterItems();
  }, [items, itemsByCompletion, searchContent]);

  useEffect(() => {
    setItemsByCompletion(
      items.filter((element) => element.isCompleted === showCompletedItems)
    );
  }, [items, showCompletedItems]);

  const itemsLoader = async () => {
    const result = await GetItems();
    if (result.error) {
      setIsError(result.error);
    } else {
      setItems(result);
    }
  };

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
