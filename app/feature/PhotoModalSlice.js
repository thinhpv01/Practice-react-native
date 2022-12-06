import { createSlice } from "@reduxjs/toolkit";

const photoModalSlice = createSlice({
  name: "photoModal",
  initialState: {
    isPhotoVisible: false,
    photoData: null,
  },
  reducers: {
    setPhotoVisible(state, action) {
      state.isPhotoVisible = true;
      state.photoData = action.payload;
    },
    setPhotoInvisible(state, action) {
      state.isPhotoVisible = false;
      state.photoData = null;
    },
  },
});
const { actions, reducer } = photoModalSlice;

export const { setPhotoVisible, setPhotoInvisible } = actions;
export default reducer;
