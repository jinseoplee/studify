import React from "react";
import '../../Style/UI/Paging.css';
import Pagination from "react-js-pagination";

const Paging = ({page, total, setPage }) => {

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={5}
      totalItemsCount={total}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage}
    />
  );
};

export default Paging;