import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPage, searchCountry } from "../../redux/actions/";
import CardsContainer from "../CardsContainer/CardsContainer";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const filters = useSelector((state) => state.filters);
  const order = useSelector((state) => state.orderBy);
  const search = useSelector((state) => state.searchBy);
  const page = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(searchCountry(search, filters));
  }, [dispatch, search, filters]);
  useEffect(() => {
    dispatch(resetPage());
  }, [dispatch, countries, order]);

  return (
    <div className="home">
      <div className="home_shell">
        <div className="bar">
          <SearchBar />
          <Filters search={search} />
        </div>
        <Pagination key={"top"} />
        <CardsContainer
          countries={countries.slice(
            page.pointer,
            page.pointer + (page.current === 0 ? 9 : 10)
          )}
        />
        <Pagination key={"bottom"} />
      </div>
    </div>
  );
}

export default Home;
