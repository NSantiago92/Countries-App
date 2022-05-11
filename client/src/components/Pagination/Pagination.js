import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, prevPage, lastPage, firstPage } from "../../redux/actions";
import "./Pagination.css";

function Pagination() {
  const dispatch = useDispatch();
  const { total, current } = useSelector((state) => state.pages);
  return (
    <div className="pagination_shell">
      <button onClick={() => dispatch(firstPage())}>First</button>
      <button onClick={() => dispatch(prevPage())}>Prev</button>
      <div>
        {current + 1}/{total + 1}
      </div>
      <button onClick={() => dispatch(nextPage())}>Next</button>
      <button onClick={() => dispatch(lastPage())}>Last</button>
    </div>
  );
}

export default Pagination;
