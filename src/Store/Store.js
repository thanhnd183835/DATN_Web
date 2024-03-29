import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "../Redux/auth/auth.slice";
import { messageReducer } from "../Redux/message/message.slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import postReducer from "../Redux/post/post.slice";
import userReducer from "../Redux/user/user.slice";
import notificationReducer from "../Redux/notification/notification.slice";
import socketReducer from "../Redux/socket/socket.slice";
import cartReducer from "../Redux/cart/cart.slice";
import chatReducer from "../Redux/chat/chat.slice";
import orderReducer from "../Redux/order/order.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  // transaction: transactionReducer,
  message: messageReducer,
  post: postReducer,
  user: userReducer,
  notification: notificationReducer,
  socket: socketReducer,
  cart: cartReducer,
  chat: chatReducer,
  order: orderReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,

  blacklist: ["age"],
  // blacklist: ['age'], //blacklisting a store attribute name, will not persist that store attribute.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
