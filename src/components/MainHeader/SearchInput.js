import { useContext } from "react";
import { ItemsContext } from "../../store/items-context";
import { ReactComponent as MenuSearchBarSVG } from "../../images/menu_searchbar.svg";
import "./searchInput.css";

const SearchInput = (props) => {
  const { setSearchContent } = useContext(ItemsContext);

  let filterTiming;
  const filterFunc = (e) => {
    clearTimeout(filterTiming);
    filterTiming = setTimeout(() => {
      setSearchContent(e);
    }, 300);
  };

  return (
    <div className={`${props.cstyle} searchbar`}>
      <MenuSearchBarSVG />
      <input
        placeholder="Search"
        onChange={(e) => filterFunc(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchInput;
