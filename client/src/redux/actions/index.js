export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const ADD_FILTER = "ADD_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const SET_ORDER = "SET_ORDER";
export const SET_SEARCH = "SET_SEARCH";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const RESET_COUNTRY_DETAIL = "RESET_COUNTRY_DETAIL";
export const GET_CONTINENTS = "GET_CONTINENTS";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const LAST_PAGE = "LAST_PAGE";
export const FIRST_PAGE = "FIRST_PAGE";
export const RESET_PAGE = "RESET_PAGE";

const URL = process.env.REACT_APP_API;
const axios = require("axios");

export const searchCountry =
  (name = "", filters = { continents: [], activities: [] }) =>
  async (dispatch) => {
    const { continents, activities } = filters;
    const { data: payload } = await axios.get(`${URL}countries`, {
      params: {
        name,
        continents,
        activities,
      },
    });
    return dispatch({ type: SEARCH_COUNTRY, payload });
  };
export const getCountryDetail = (id) => async (dispatch) => {
  const { data: payload } = await axios.get(`${URL}countries/${id}`);
  return dispatch({ type: GET_COUNTRY_DETAIL, payload });
};
export const resetCountryDetail = () => {
  return { type: RESET_COUNTRY_DETAIL };
};
export const getContinents = () => async (dispatch) => {
  const { data: payload } = await axios.get(`${URL}continents`);
  return dispatch({ type: GET_CONTINENTS, payload });
};
export const getActivities = () => async (dispatch) => {
  const { data: payload } = await axios.get(`${URL}activity`);
  return dispatch({ type: GET_ACTIVITIES, payload });
};

export const addFilter = (type, value) => {
  return { type: ADD_FILTER, payload: { type, value } };
};
export const removeFilter = (type, value) => {
  return { type: REMOVE_FILTER, payload: { type, value } };
};
export const clearFilters = () => {
  return { type: CLEAR_FILTERS };
};

export const setOrder = (prop, ord) => {
  return { type: SET_ORDER, payload: { prop, ord } };
};

export const setSearch = (searchBy) => {
  return { type: SET_SEARCH, payload: { searchBy } };
};

export const nextPage = () => {
  return { type: NEXT_PAGE };
};
export const prevPage = () => {
  return { type: PREV_PAGE };
};
export const firstPage = () => {
  return { type: FIRST_PAGE };
};
export const lastPage = () => {
  return { type: LAST_PAGE };
};
export const resetPage = () => {
  return { type: RESET_PAGE };
};
