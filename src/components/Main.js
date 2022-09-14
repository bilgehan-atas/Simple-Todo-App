import React, { useContext, useState } from "react";
import "./Main.css";
import ItemCard from "./ItemCard";
import { ItemsContext } from "../store/items-context";
import { UiContext } from "../store/ui-context";
import AddToDo from "./AddToDo";

const Main = () => {
  const { filteredItems, isLoaded, isError, showCompletedItems ,setShowCompletedItems } = useContext(ItemsContext);
  const { isAddToDoOpen } = useContext(UiContext);
  const [isOk, setIsOk] = useState(null);
  const isOkHandler = (string) => {
    setIsOk(string);
    setTimeout(() => setIsOk(null), 3000);
  };
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredItems.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const currentDate = new Date();
  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
  const locale = userLocale ? userLocale : "en-us";
  const date = currentDate.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <React.Fragment>
      <div className="main_container">
        {isAddToDoOpen.isAddToDoOpen && <AddToDo isOkHandler={isOkHandler} />}
        {isLoaded === false && isError === null && (
          <p className="main_notification">Loading...</p>
        )}
        {isLoaded === true &&
          isError === null &&
          filteredItems.length === 0 && (
            <p className="main_notification">There is nothing to see here.</p>
          )}
        {isError !== null && (
          <>
            <p className="main_notification">
              Obi-Wan Kenobi felt a great disturbance in the API...
            </p>
          </>
        )}
        {isLoaded === true && filteredItems.length > 0 && (
          <>
            <div className="main_title_container">
              <p className="main_m_title">Today</p>
              <p className="main_m_date">{date}</p>
              <p className="main_s_title">{ showCompletedItems === false ?<>Your ToDo's to be completed:</> : <>Your completed ToDo's:</>}</p>
            </div>
            <div className="main_show_button">
              <span
                onClick={() => {setShowCompletedItems((prev)=>!prev)}}
              >
                Show{" "}
                {showCompletedItems === false ? "completed" : "uncompleted"}{" "}
                Todo's
              </span>
            </div>
            <ItemCard
            currentItems = {currentItems}
            totalItems = {filteredItems.length}
            currentPage = {currentPage}
            setCurrentPage = {setCurrentPage}
            totalPages = {totalPages}
            isOkHandler = {isOkHandler}
            />
          </>
        )}
        {isOk !== null && (
          <div className="main_notification_container">
            <div className="main_notification">{isOk}</div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Main;
