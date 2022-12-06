import { configureStore } from "@reduxjs/toolkit";
import photoModalReducer from "./feature/PhotoModalSlice";
const rootReducer = {
  photoModal: photoModalReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
