import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    colorPalette: "blue",
    color: "hsl(221.2 83.2% 53.3%)",
    theme: "light",
  },
  reducers: {
    selectTheme: (
      state,
      action: {
        payload: {
          colorPalette: string;
          color: string;
          theme: string;
        };
      }
    ) => {
      state.colorPalette = action.payload.colorPalette;
      state.color = action.payload.color;
      state.theme = action.payload.theme;
    },
  },
});

export const { selectTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
