import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { reducer as authReducer } from "./Auth/reducer"
import {reducer as categoryReducer} from "./Category/reducer"
import {reducer as productReducer} from "./Product/reducer"
const rootReducer = combineReducers({
    authReducer,categoryReducer,productReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));