// import { createStore, applyMiddleware, combineReducers } from "redux";
// import markerReducer from "../Reducers/reducer";
// import logger from 'redux-logger';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// const rootReducers = combineReducers({
//     markers: markerReducer
// });

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist : ["markers"]
// }
// const persistedReducer = persistReducer(persistConfig, rootReducers)

// export const store = () =>
//     createStore(persistedReducer, applyMiddleware(logger));

// export const persistor = persistStore(store());


import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import markerReducer from "../Reducers/reducer";
import logger from 'redux-logger';


const rootReducers = combineReducers({
    markers: markerReducer
});


const persistConfig = { // configuration object for redux-persist
    key: 'root',
    storage, // define which storage to use
    blacklist: ["markers"]
}

const persistedReducer = persistReducer(persistConfig, rootReducers) // create a persisted reducer

const store = createStore(
    persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
    applyMiddleware(logger) // add any middlewares here
)

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export { store, persistor }
