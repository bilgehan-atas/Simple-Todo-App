import React, { useContext, useRef, useState } from "react";
import "./ItemCard.css";
import { ReactComponent as LoadingSVG } from "../images/loading.svg";
import { ReactComponent as EditSVG } from "../images/edit.svg";
import { ReactComponent as DeleteSVG } from "../images/delete.svg";
import PutItem from "../api/PutItem";
import DeleteItem from "../api/DeleteItem";
import { ItemsContext } from "../store/items-context";

const ItemCard = ({
  currentItems,
  totalItems,
  currentPage,
  setCurrentPage,
  totalPages,
  isOkHandler,
}) => {
  const { itemsLoader } = useContext(ItemsContext);
  const [isEditOpen, setIsEditOpen] = useState(null);
  const inputRef = useRef(null);
  const [isInputValid, setIsInputValid] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const validationHandler = () => {
    inputRef.current.value.length < 3
      ? setIsInputValid(false)
      : setIsInputValid(true);
  };

  const completeHandler = (id, bool) => {
    setIsLoading(id);
    PutItem({ isCompleted: !bool }, id).then((response) => {
      if (response.error) {
        isOkHandler("There has been a problem on checking ToDo");
      } else {
        itemsLoader().then(() => {
          isOkHandler("The ToDo has been updated!");
        });
      }
      setIsLoading(null);
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    validationHandler();
    if (isInputValid === true) {
      const newItem = {
        content: inputRef.current.value,
        isCompleted: false,
      };
      const id = isEditOpen;
      setIsLoading(id);
      PutItem(newItem, id).then((response) => {
        if (response.error) {
          setIsError(true);
        } else {
          itemsLoader().then(() => {
            setIsEditOpen(null);
            setIsInputValid(false);
            isOkHandler("A ToDo has been changed!");
          });
        }
        setIsLoading(null);
      });
    }
  };

  const deleteHandler = (id) => {
    setIsLoading(id);
    DeleteItem(id).then((response) => {
      if (response.error) {
        isOkHandler("We had a problem deleting the ToDo!");
      } else {
        itemsLoader().then(() => {
          setDeleteConfirmation(null);
          isOkHandler("The ToDo has been removed!");
        });
      }
      setIsLoading(null);
    });
  };

  const pgSliceStart =
    currentPage - 5 <= 0 ? 0
      : currentPage + 5 >= totalPages ? totalPages - 10
      : currentPage - 5;
  const pgSliceEnd = currentPage + 5 < 10 ? 10 : currentPage + 5;

  return (
    <>
      <ul className="ItemCard_container">
        {currentItems.map((element) => {
          return (
            <li className="ItemCard_item" key={element.id}>
              {isEditOpen !== element.id ? (
                <>
                  <div
                    className="ItemCard_completion_icon"
                    id={`${isLoading === element.id && "reloading"}`}
                  >
                    <input
                      type="checkbox"
                      value={element.isCompleted}
                      checked={element.isCompleted}
                      onChange={() =>
                        completeHandler(element.id, element.isCompleted)
                      }
                      disabled={isLoading === element.id}
                    />
                  </div>
                  <div>
                    <p
                      className={`${
                        element.content.includes("\n")
                          ? "ItemCard_description_nl"
                          : "ItemCard_description"
                      }`}
                    >
                      {element.content}
                    </p>
                  </div>
                  <div className="ItemCard_edit_icon">
                    <button
                      id="edit_button"
                      type="button"
                      onClick={() => setIsEditOpen(element.id)}
                      disabled={isLoading === element.id}
                    >
                      <EditSVG />
                    </button>
                    <button
                      id="delete_button"
                      type="button"
                      onClick={() => setDeleteConfirmation(element.id)}
                      disabled={isLoading === element.id}
                    >
                      <DeleteSVG />
                    </button>
                    {deleteConfirmation === element.id && (
                      <div className="ItemCard_confirmation">
                        <button
                          id="button_cancel"
                          onClick={() => setDeleteConfirmation(null)}
                          disabled={isLoading === element.id}
                        >
                          Cancel
                        </button>
                        <button
                          id="button_accept"
                          onClick={() => deleteHandler(element.id)}
                          disabled={isLoading === element.id}
                        >
                          {isLoading === element.id ? (
                            <LoadingSVG />
                          ) : (
                            <span>Confirm</span>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="ItemCard_edit_container">
                    <div className="ItemCard_edit_textarea_container">
                      <textarea
                        id="text_input"
                        ref={inputRef}
                        placeholder={element.content}
                        maxLength="280"
                        onFocus={() => {
                          if (inputRef.current.value === "") {
                            inputRef.current.value = element.content;
                          }
                        }}
                        onChange={validationHandler}
                      ></textarea>
                    </div>
                    <div className="ItemCard_edit_info">
                      {isError && (
                        <p>
                          Obi-Wan Kenobi felt a great disturbance in the API
                        </p>
                      )}
                    </div>
                    <div className="ItemCard_edit_buttons">
                      <button
                        id="button_cancel"
                        onClick={() => {
                          setIsEditOpen(null);
                          setIsError(null);
                          setIsInputValid(false);
                        }}
                        disabled={isLoading === element.id}
                      >
                        <span>Cancel</span>
                      </button>{" "}
                      <button
                        id="button_accept"
                        type="submit"
                        value="submit"
                        disabled={!isInputValid || isLoading === element.id}
                        onClick={submitHandler}
                      >
                        {isLoading === element.id ? (
                          <LoadingSVG />
                        ) : (
                          <span>Edit ToDO</span>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
      <div className="Pages_container">
        <div className="Pages_desc">
          Showing <b>{currentItems.length}</b> out of <b>{totalItems}</b>{" "}
          entries
        </div>
        {totalPages > 1 && (
          <ul className="Pages_pagination">
            <li
              className={`${
                currentPage === 1
                  ? "Pages_page_link disabled"
                  : "Pages_page_link "
              }`}
            >
              <span
                onClick={() =>
                  setCurrentPage((prev) => (prev === 1 ? prev : prev - 1))
                }
              >
                Previous
              </span>
            </li>
            {[...Array(totalPages).keys()]
              .slice(pgSliceStart, pgSliceEnd)
              .map((page, i) => {
                return (
                  <li
                    key={i}
                    className={`${
                      currentPage === page + 1
                        ? "Pages_page_link active"
                        : "Pages_page_link"
                    }`}
                  >
                    <span
                      onClick={() => setCurrentPage(page + 1)}
                      className="Pages_page_link"
                    >
                      {page + 1}
                    </span>
                  </li>
                );
              })}
            <li
              className={`${
                currentPage === totalPages
                  ? "Pages_page_link disabled"
                  : "Pages_page_link "
              }`}
            >
              <span
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev === totalPages ? prev : prev + 1
                  )
                }
              >
                Next
              </span>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default ItemCard;
