import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/actions";
import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    dispatch(setSearch(searchTerm));
    setSearchTerm("");
  }
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }
  return (
    <div className="search_shell">
      <form onSubmit={(e) => handleSearch(e)} className="search_form">
        <input
          className="search_bar"
          type="search"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e)}
          placeholder="Search..."
        />
      </form>
    </div>
  );
}

export default SearchBar;
