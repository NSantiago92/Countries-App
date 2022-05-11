import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getActivities,
  getContinents,
  addFilter,
  removeFilter,
  setOrder,
  clearFilters,
} from "../../redux/actions";
import FilterTag from "../FilterTag/FilterTag";
import "./Filters.css";

//FIX: missing key prop somewhere
function Filters({ search }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goAdd = useCallback(() => navigate("/add"), [navigate]);
  const allContinents = useSelector((state) => state.continents);
  const allActivities = useSelector((state) => state.activities);
  const filters = useSelector((state) => state.filters);
  const order = useSelector((state) => state.orderBy);

  useEffect(() => {
    dispatch(getActivities());
    dispatch(getContinents());
  }, [dispatch]);

  function handleAddFilter(e) {
    const [type, value] = JSON.parse(e.target.value);
    dispatch(addFilter(type, value));
    e.target.value = "none";
  }
  function handleSetOrder(e) {
    const { prop, ord } = JSON.parse(e.target.value);
    dispatch(setOrder(prop, ord));
  }
  const onClose = (type, id) => {
    dispatch(removeFilter(type, id));
  };
  return (
    <>
      <div className="filters_shell">
        <div className="selects_shell">
          <div className="filterby_shell">
            <select
              name="filterBy"
              id="filter"
              className="filterby_select"
              onChange={handleAddFilter}
            >
              <option value="none">{"--Filter by--"}</option>
              <optgroup label="Continent">
                {allContinents
                  .filter((cont) => !filters.continents.includes(cont))
                  .map((cont, i) => (
                    <option
                      className="continents"
                      key={cont + i}
                      value={`["continents","${cont}"]`}
                    >
                      {cont}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Activity">
                {allActivities
                  .filter(({ id }) => !filters.activities.includes(id))
                  .map(({ name, id }) => (
                    <option
                      key={name + id}
                      id={id}
                      className="activities"
                      value={`["activities",${id}]`}
                    >
                      {name}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>
          <div className="orderby_shell">
            <select
              name="orderBy"
              value={JSON.stringify(order)}
              onChange={handleSetOrder}
              className="orderby_select"
            >
              <option value={`{"prop":"name","ord":"ASC"}`}>Name A-Z</option>
              <option value={`{"prop":"name","ord":"DESC"}`}>Name Z-A</option>
              <option value={`{"prop":"population","ord":"ASC"}`}>
                Population ASC
              </option>
              <option value={`{"prop":"population","ord":"DESC"}`}>
                Population DESC
              </option>
            </select>
          </div>
          <button
            onClick={() => dispatch(clearFilters())}
            className="clear_btn"
          >
            Clear Filters
          </button>
        </div>
        <div className="tags_shell">
          <div className="country_tags">
            <p>Showing countries in: </p>
            {filters.continents.map((cont, i) => (
              <React.Fragment key={cont + i}>
                <span>
                  {i !== 0 &&
                    (i === filters.continents.length - 1 ? " or " : ", ")}
                </span>
                <FilterTag
                  onClose={onClose}
                  type={"continents"}
                  id={cont}
                  text={cont}
                />
              </React.Fragment>
            ))}
          </div>
          <div className="activity_tags">
            <p>Where you can: </p>
            {filters.activities.map((actId, i) => (
              <React.Fragment key={"act" + actId}>
                <span>
                  {i !== 0 &&
                    (i === filters.activities.length - 1 ? " and " : ", ")}
                </span>
                <FilterTag
                  onClose={onClose}
                  type={"activities"}
                  id={actId}
                  text={allActivities.find(({ id }) => id === actId).name}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="activity_btn_shell">
          <button className="activity_btn" onClick={goAdd}>
            Add activity
          </button>
        </div>
      </div>
      <div style={{ fontSize: "larger" }}>
        {search && (
          <p>
            Showing results for: <b>{search}</b>{" "}
          </p>
        )}
      </div>
    </>
  );
}

export default Filters;
