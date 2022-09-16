import "./AddToDo.css";
import React, { useContext, useRef, useState } from "react";
import postItem from "../api/postItem";
import { UiContext } from "../store/ui-context";
import { ItemsContext } from "../store/items-context";
import { ReactComponent as LoadingSVG } from "../images/loading.svg";

const AddToDo = (props) => {
  const inputRef = useRef(null);
  const { addToDoHandler } = useContext(UiContext);
  const { itemsLoader } = useContext(ItemsContext)
  const [isInputValid, setIsInputValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationHandler = () => {
    inputRef.current.value.length < 3
      ? setIsInputValid(false)
      : setIsInputValid(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    validationHandler();
    if (isInputValid === true) {
      const newItem = {
        content: inputRef.current.value,
        isCompleted: false,
      };
      setIsLoading(true);
      postItem(newItem).then((response) => {
        if (response.error) {
          props.isOkHandler("Something went terribly wrong!")
        } else {
          itemsLoader("postItem", {...newItem, id: response.id});
          props.isOkHandler("A new Item has been added");
          addToDoHandler();
        }
        setIsLoading(false);
      });
    }
  };

  return (
    <React.Fragment>
      <div className="AddToDo_container">
        <div className="AddToDo_sub_container">
          <div className="AddToDo_text">
            <textarea
              id="text_input"
              ref={inputRef}
              onChange={validationHandler}
              maxLength="280"
              placeholder="Tip: If you use multiple lines, first line is the title&#10;...and the following is description.&#10;Max 280 characters allowed. You know, as big as a tweet."
            ></textarea>
          </div>
          <div className="AddToDo_bottom_container">
            <button
              type="button"
              id="button_cancel"
              onClick={addToDoHandler}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              id="button_accept"
              onClick={submitHandler}
              disabled={!isInputValid || isLoading}
            >
              {isLoading ? <LoadingSVG /> : <span>Add ToDo</span>}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddToDo;
