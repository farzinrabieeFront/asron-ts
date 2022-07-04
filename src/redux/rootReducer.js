import { combineReducers } from "redux";
import reducerLists from "./lists/reducerLists";

const rootReducer = combineReducers({
  listsState: reducerLists,
});
export default rootReducer;
