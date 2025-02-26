
// import { useRef } from "react";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   TypedUseSelectorHook,
//   useDispatch,
//   useSelector,
//   Provider,
// } from "react-redux";
// import globalReducer from "@/state";
// import { api } from "@/state/api";
// import { setupListeners } from "@reduxjs/toolkit/query";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// /* REDUX PERSISTENCE */
// const createNoopStorage = () => {
//   return {
//     getItem(_key: any) {
//       return Promise.resolve(null);
//     },
//     setItem(_key: any, value: any) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key: any) {
//       return Promise.resolve();
//     },
//   };
// };

// const storage =
//   typeof window === "undefined"
//     ? createNoopStorage()
//     : createWebStorage("local");

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["global"],
// };
// const rootReducer = combineReducers({
//   global: globalReducer,
//   [api.reducerPath]: api.reducer,
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// /* REDUX STORE */
// export const makeStore = () => {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }).concat(api.middleware),
//   });
// };

// /* REDUX TYPES */
// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// /* PROVIDER */
// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const storeRef = useRef<AppStore>();
//   if (!storeRef.current) {
//     storeRef.current = makeStore();
//     setupListeners(storeRef.current.dispatch);
//   }
//   const persistor = persistStore(storeRef.current);

//   return (
//     <Provider store={storeRef.current}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }


"use client"; // Ensure this runs only on the client side

import { useMemo } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import globalReducer from "@/state";
import { api } from "@/state/api";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/* 🔹 REDUX PERSISTENCE: Fix storage for SSR in Next.js */
const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

// Ensure local storage is only used on the client side
const storage =
  typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"], // Persist only "global" state
};

/* 🔹 COMBINE REDUCERS */
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* 🔹 CREATE REDUX STORE */
export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });

/* 🔹 REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* 🔹 PROVIDER COMPONENT */
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => {
    const s = makeStore();
    setupListeners(s.dispatch);
    return s;
  }, []);

  const persistor = useMemo(() => persistStore(store), [store]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        {children}
      </PersistGate>
    </Provider>
  );
}

/* 🔹 DEBUGGING: Log API URL to ensure it's set */
console.log("✅ API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
