import { createStore, applyMiddleware, combineReducers } from "redux";
import markerReducer from "../Reducers/reducer";
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducers = combineReducers({
    markers: markerReducer
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ["markers"]
}
const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = createStore(persistedReducer, applyMiddleware(logger));

export const persistor = persistStore(store);