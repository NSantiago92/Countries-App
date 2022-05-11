import {
  SEARCH_COUNTRY,
  GET_COUNTRY_DETAIL,
  RESET_COUNTRY_DETAIL,
  ADD_FILTER,
  REMOVE_FILTER,
  CLEAR_FILTERS,
  SET_ORDER,
  SET_SEARCH,
  GET_ACTIVITIES,
  GET_CONTINENTS,
  RESET_PAGE,
  NEXT_PAGE,
  FIRST_PAGE,
  LAST_PAGE,
  PREV_PAGE,
} from "../actions/index";

const initialState = {
  countries: [],
  activities: [],
  continents: [],
  filters: { continents: [], activities: [] },
  orderBy: { prop: "name", ord: "ASC" },
  searchBy: "",
  pages: { total: 0, current: 0, pointer: 0 },
  countryDetail: {},
};

const order = (v1, v2, ord) => {
  if (ord === "ASC") return v1 > v2 ? 1 : -1;
  return v2 > v1 ? 1 : -1;
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_COUNTRY: {
      const { prop, ord } = state.orderBy;
      const countries = action.payload.sort((fCountry, sCountry) =>
        order(fCountry[prop], sCountry[prop], ord)
      );
      return { ...state, countries };
    }
    case GET_COUNTRY_DETAIL: {
      return { ...state, countryDetail: action.payload };
    }
    case RESET_COUNTRY_DETAIL: {
      return { ...state, countryDetail: {} };
    }
    case GET_CONTINENTS:
      return { ...state, continents: action.payload };
    case GET_ACTIVITIES:
      return { ...state, activities: action.payload };
    case ADD_FILTER: {
      const { type, value } = action.payload;
      const newFilter = {
        ...state.filters,
        [type]: [...state.filters[type], value],
      };
      return { ...state, filters: newFilter };
    }
    case REMOVE_FILTER: {
      const { type, value } = action.payload;
      const newFilter = {
        ...state.filters,
        [type]: state.filters[type].filter((filter) => filter !== value),
      };
      return { ...state, filters: newFilter };
    }
    case CLEAR_FILTERS: {
      return {
        ...state,
        filters: { continents: [], activities: [] },
        orderBy: { prop: "name", ord: "ASC" },
        searchBy: "",
      };
    }
    case SET_ORDER: {
      const { prop, ord } = action.payload;

      const countries = state.countries.sort((fCountry, sCountry) =>
        order(fCountry[prop], sCountry[prop], ord)
      );
      return { ...state, countries, orderBy: { prop, ord } };
    }
    case SET_SEARCH: {
      const { searchBy } = action.payload;
      return { ...state, searchBy };
    }
    case RESET_PAGE: {
      const total = Math.floor(state.countries.length / 10);
      return { ...state, pages: { total, current: 0, pointer: 0 } };
    }
    case NEXT_PAGE: {
      const { current, total, pointer } = state.pages;
      if (current === total) return { ...state };
      return {
        ...state,
        pages: {
          total,
          current: current + 1,
          pointer: pointer + (current === 0 ? 9 : 10),
        },
      };
    }
    case PREV_PAGE: {
      const { current, total, pointer } = state.pages;
      if (current === 0) return { ...state };
      return {
        ...state,
        pages: {
          total,
          current: current - 1,
          pointer: current === 1 ? 0 : pointer - 10,
        },
      };
    }
    case LAST_PAGE: {
      const { total } = state.pages;
      const current = total;
      const pointer = current * 10 - 1;
      return {
        ...state,
        pages: {
          total,
          current,
          pointer: pointer < 0 ? 0 : pointer,
        },
      };
    }
    case FIRST_PAGE: {
      const { total } = state.pages;
      return {
        ...state,
        pages: {
          total,
          current: 0,
          pointer: 0,
        },
      };
    }
    default:
      return { ...initialState };
  }
};

export default rootReducer;
