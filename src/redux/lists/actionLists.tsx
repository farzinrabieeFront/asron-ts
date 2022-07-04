import axios from "axios";

const fetchListsRequest = () => {
  return {
    type: "FETCH_LISTS_REQUEST",
  };
};
const fetchListsSuccess = (lists: any) => {
  return {
    type: "FETCH_LISTS_SUCCESS",
    payload: { lists },
  };
};

export const actionLists = () => {
  return (dispatch: any) => {
    dispatch(fetchListsRequest());

    axios
      .get(`https://62bfe35ec134cf51cec58701.mockapi.io/api/crud/users`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchListsSuccess(response.data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log("error", error);
      });
  };
};
