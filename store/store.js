import reducer from '../reducers/reduce';
import cartReducer from '../reducers/cartReducer';
import { createStore, combineReducers } from 'redux';
import productsReducer from '../reducers/productsReducer';

const rootReducer = combineReducers({
    reducer: reducer,
    cartReducer: cartReducer,
    productsReducer: productsReducer
  });
const store = createStore(rootReducer);

export default store;