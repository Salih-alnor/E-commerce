import reducer from '../reducers/reduce';
import cartReducer from '../reducers/cartReducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    reducer: reducer,
    cartReducer: cartReducer,
  });
const store = createStore(rootReducer);

export default store;