import "./itemList.css";
import ItemCard from "./ItemCard";

const ItemList = ({
  currentItems,
  totalItems,
  currentPage,
  setCurrentPage,
  totalPages,
  notificationHandler,
}) => {
  const pgSliceStart =
    currentPage - 5 <= 0
      ? 0
      : currentPage + 5 >= totalPages
      ? totalPages - 10
      : currentPage - 5;
  const pgSliceEnd = currentPage + 5 < 10 ? 10 : currentPage + 5;

  return (
    <>
      <ul className="ItemCard_container">
        {currentItems.map((element) => {
          return <ItemCard element={element} notificationHandler={notificationHandler} key={element.id}/>;
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

export default ItemList;
