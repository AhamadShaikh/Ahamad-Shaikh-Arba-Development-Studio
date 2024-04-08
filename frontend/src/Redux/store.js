import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { reducer as authReducer } from "./Auth/reducer"
import { reducer as categoryReducer } from "./Category/reducer"
import { reducer as productReducer } from "./Product/reducer"
import { reducer as userReducer } from "./Profile/reducer"

const rootReducer = combineReducers({
    authReducer, categoryReducer, productReducer, userReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));