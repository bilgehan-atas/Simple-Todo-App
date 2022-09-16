import React, { useContext, useState } from "react";
import "./main.css";
import ItemList from "../ItemList/ItemList";
import { ItemsContext } from "../../store/items-context";
import { UiContext } from "../../store/ui-context";
import AddToDo from "../AddToDo/AddToDo";

const Main = () => {
  const {
    filteredItems,
    isLoaded,
    errorMessage,
    showCompletedItems,
    setShowCompletedItems,
  } = useContext(ItemsContext);
  const { isAddToDoOpen } = useContext(UiContext);
  const [notificationText, setNotificationText] = useState(null);
  const notificationHandler = (string) => {
    setNotificationText(string);
    setTimeout(() => setNotificationText(null), 3000);
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

  const completedItemsHandler = () => {
    setShowCompletedItems((prev) => !prev);
    setCurrentPage(1);
  };

  return (
    <React.Fragment>
      <div className="main_container">
        {isAddToDoOpen.isAddToDoOpen && <AddToDo notificationHandler={notificationHandler} />}
        {!isLoaded && errorMessage === null && (
          <p className="main_notification">Loading...</p>
        )}
        {isLoaded &&
          errorMessage === null &&
          filteredItems.length === 0 && (
            <p className="main_notification">There is nothing to see here.</p>
          )}
        {errorMessage !== null && (
          <>
            <p className="main_notification">
              Obi-Wan Kenobi felt a great disturbance in the API...
            </p>
          </>
        )}
        {isLoaded && !!filteredItems.length && (
          <>
            <div className="main_title_container">
              <p className="main_m_title">Today</p>
              <p className="main_m_date">{date}</p>
              <p className="main_s_title">
                {!showCompletedItems ? (
                  <>Your ToDo's to be completed:</>
                ) : (
                  <>Your completed ToDo's:</>
                )}
              </p>
            </div>
            <div className="main_comleted_handler">
              <span onClick={completedItemsHandler}>
                Show{" "}
                {!showCompletedItems ? "completed" : "uncompleted"}{" "}
                Todo's
              </span>
            </div>
            <ItemList
              currentItems={currentItems}
              totalItems={filteredItems.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              notificationHandler={notificationHandler}
            />
          </>
        )}
        {notificationText !== null && (
          <div className="main_notification_container">
            <div className="main_notification">{notificationText}</div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Main;
