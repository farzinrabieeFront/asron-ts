const initialState = {
  loading: false,
  lists: [],
  error: "",
  pagination: 1,
};

const reducerLists = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_LISTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_LISTS_SUCCESS":
      return {
        ...state,
        loading: false,
        lists: payload.lists,
        pagination: payload.pagination,
      };
    default:
      return state;
  }
};
export default reducerLists;
