import { useContext } from "react";
import { ItemsContext } from "../../store/items-context";
import { ReactComponent as MenuSearchBarSVG } from "../../images/menu_searchbar.svg";
import "./searchInput.css"

const SearchInput = (props) => {
  const { setSearchContent } = useContext(ItemsContext);
  return (
    <div className={`${props.cstyle} searchbar`}>
      <MenuSearchBarSVG />
      <input
        placeholder="Search"
        onChange={(e) => setSearchContent(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchInput;
