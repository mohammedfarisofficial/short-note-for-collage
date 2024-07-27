import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
//reducers
import authReducer from "./reducers/authSlice.js";
import uiReducer from "./reducers/uiSlice.js";
import dataReducer from "./reducers/dataSlice.js";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  data: dataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

export const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  },
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
