import { createStore } from "redux";
import rootReducer from "../Redux/Reducers";

const store = createStore(rootReducer);

export default store;
