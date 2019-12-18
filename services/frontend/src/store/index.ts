import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";

import { userReducer } from "./user/reducers";

const rootReducer = combineReducers({
  user: userReducer
})

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
)
export default store;