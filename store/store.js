import favoritesReducer from "../reducers/favoritesReducer";
import cartReducer from "../reducers/cartReducer";
import { createStore, combineReducers } from "redux";
import productsReducer from "../reducers/productsReducer";
import userInfoReducer from "../reducers/userInfoReducer";

const rootReducer = combineReducers({
  userInfoReducer: userInfoReducer,
  favoritesReducer: favoritesReducer,
  cartReducer: cartReducer,
  productsReducer: productsReducer,
});
const store = createStore(rootReducer);

export default store;
