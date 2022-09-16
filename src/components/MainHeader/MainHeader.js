import "./mainHeader.css";
import { ReactComponent as MenuSwitchSVG } from "../../images/menu_switch.svg";
import { ReactComponent as MenuAddSVG } from "../../images/menu_add.svg";
import SearchInput from "./SearchInput"
import { useContext, useState } from "react";
import { UiContext } from "../../store/ui-context";

const Mainheader = () => {
  const { addToDoHandler, isAddToDoOpen, selectedTheme, themeChanger, userName, logOutHandler} =
    useContext(UiContext);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div className="main_header_container">
      <div className="main_header_sub_container">
        <div className="main_header">
          <div className="menu_switch">
            <button id={`${isSideMenuOpen && "active"}`}
              type="button"
              onClick={() => setIsSideMenuOpen((prev) => !prev)}
            >
              <MenuSwitchSVG />
            </button>
            {isSideMenuOpen && (
              <div className="menu_container">
                <div className="theme_switch_container">
                  <p>Dark Mode</p>
                  <div className="theme_switch">
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          selectedTheme.selectedTheme === "light" ? false : true
                        }
                        onChange={themeChanger}
                      />
                      <span className="theme_switch_slider" />
                    </label>
                  </div>
                </div>
                <div className="menu_sub">
                  <button id="sub_menu_button" onClick={logOutHandler}>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="menu_searchbar_container">
            <SearchInput cstyle="menu_searchbar" />
          </div>
          <div className="menu_add_todo_button">
            <button type="button" id={`${isAddToDoOpen.isAddToDoOpen && "active"}`} onClick={addToDoHandler}>
              <MenuAddSVG />
            </button>
          </div>
          <div className="menu_user">
            <button type="button">
              {userName ? userName.userName : "Not Logged In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainheader;
