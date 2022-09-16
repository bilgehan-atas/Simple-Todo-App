import React, { useContext, useRef, useState } from "react";
import "./app.css";
import Mainheader from "./components/MainHeader/MainHeader";
import Main from "./components/Main/Main";
import { UiContext } from "./store/ui-context";

const App = () => {
  const { selectedTheme, userName, userNameChanger } = useContext(UiContext);
  const [isInputValid, setIsInputValid] = useState(false);
  const userNameRef = useRef();
  const userNameInputHandler = (event) => {
    event.preventDefault();
    userNameChanger(userNameRef.current.value);
  };

  const validationHandler = () => {
    userNameRef.current.value.length < 3
      ? setIsInputValid(false)
      : setIsInputValid(true);
  };

  return (
    <div className="App" >
      <React.Fragment>
        {!userName.userName ? (
          <div className="user_name_input_container">
            <form className="user_name_input">
              <p>How should we call you?</p>
              <input
                placeholder="user name..."
                onChange={validationHandler}
                ref={userNameRef}
                maxLength="12"
                onKeyPress={(event) => {
                  if (!/^[a-zA-Z0-9_]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <button
                type="submit"
                onClick={userNameInputHandler}
                disabled={!isInputValid}
              >
                Let Me In
              </button>
            </form>
          </div>
        ) : (
          <>
            <Mainheader />
            <Main />
          </>
        )}
      </React.Fragment>
    </div>
  );
};
export default App;
