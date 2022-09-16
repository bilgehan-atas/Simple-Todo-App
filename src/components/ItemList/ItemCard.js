import React, { useContext, useRef, useState } from "react";
import putItem from "../../api/putItem";
import deleteItem from "../../api/deleteItem";
import { ItemsContext } from "../../store/items-context";
import { ReactComponent as LoadingSVG } from "../../images/loading.svg";
import { ReactComponent as EditSVG } from "../../images/edit.svg";
import { ReactComponent as DeleteSVG } from "../../images/delete.svg";
import "./itemCard.css";

const ItemCard = ({ element, notificationHandler }) => {
  const { itemsLoader } = useContext(ItemsContext);
  const inputRef = useRef(null);
  const [isInputValid, setIsInputValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const validationHandler = () => {
    inputRef.current.value.length < 3
      ? setIsInputValid(false)
      : setIsInputValid(true);
  };

  const completeHandler = (id, bool) => {
    setIsLoading(true);
    putItem({ isCompleted: !bool }, id).then((response) => {
      if (response.error) {
        notificationHandler("There has been a problem on checking ToDo");
      } else {
        itemsLoader("putItem_Complete", { isCompleted: !bool, id });
        notificationHandler("The ToDo has been updated!");
      }
      setIsLoading(false);
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    validationHandler();
    if (isInputValid) {
      const newItem = {
        content: inputRef.current.value,
        isCompleted: false,
      };
      setIsLoading(true);
      putItem(newItem, element.id).then((response) => {
        if (response.error) {
          setErrorMessage(true);
        } else {
          itemsLoader("putItem_Edit", {...newItem, id: element.id});
          setIsEditOpen(false);
          setIsInputValid(false);
          notificationHandler("A ToDo has been changed!");
        }
        setIsLoading(false);
      });
    }
  };

  const deleteHandler = (id) => {
    setIsLoading(true);
    deleteItem(id).then((response) => {
      if (response.error) {
        notificationHandler("We had a problem deleting the ToDo!");
      } else {
        itemsLoader("deleteItem", { id: id });
        setDeleteConfirmation(false);
        notificationHandler("The ToDo has been removed!");
      }
      setIsLoading(false);
    });
  };

  return (
    <li className="ItemCard_item" key={element.id}>
      {!isEditOpen ? (
        <>
          <div
            className="ItemCard_completion_icon"
            id={`${isLoading && "reloading"}`}
          >
            <input
              type="checkbox"
              value={element.isCompleted}
              checked={element.isCompleted}
              onChange={() => completeHandler(element.id, element.isCompleted)}
              disabled={isLoading}
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
              onClick={() => setIsEditOpen(true)}
              disabled={isLoading}
            >
              <EditSVG />
            </button>
            <button
              id="delete_button"
              type="button"
              onClick={() => setDeleteConfirmation(true)}
              disabled={isLoading}
            >
              <DeleteSVG />
            </button>
            {deleteConfirmation && (
              <div className="ItemCard_confirmation">
                <button
                  id="button_cancel"
                  onClick={() => setDeleteConfirmation(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  id="button_accept"
                  onClick={() => deleteHandler(element.id)}
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSVG /> : <span>Confirm</span>}
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
              {errorMessage && (
                <p>Obi-Wan Kenobi felt a great disturbance in the API</p>
              )}
            </div>
            <div className="ItemCard_edit_buttons">
              <button
                id="button_cancel"
                onClick={() => {
                  setIsEditOpen(false);
                  setErrorMessage(null);
                  setIsInputValid(false);
                }}
                disabled={isLoading}
              >
                <span>Cancel</span>
              </button>{" "}
              <button
                id="button_accept"
                type="submit"
                value="submit"
                disabled={!isInputValid || isLoading}
                onClick={submitHandler}
              >
                {isLoading ? <LoadingSVG /> : <span>Edit ToDO</span>}
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default ItemCard;
