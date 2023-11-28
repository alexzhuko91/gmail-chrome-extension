import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type LayoutSettings = { value: string; imageUrl: string };

export interface ExtenstionState {
  isSettingsOpened: boolean;
  density: LayoutSettings | null;
  inboxType: LayoutSettings | null;
  readingPane: LayoutSettings | null;
}

const initialState: ExtenstionState = {
  isSettingsOpened: false,
  density: null,
  inboxType: null,
  readingPane: null,
};

export const gmailExtensionSlice = createSlice({
  name: "gmailExtension",
  initialState,
  reducers: {
    updateDensity: (state, action: PayloadAction<LayoutSettings>) => {
      state.density = action.payload;
    },
    updateInboxType: (state, action: PayloadAction<LayoutSettings>) => {
      state.inboxType = action.payload;
    },
    updateReadingPane: (state, action: PayloadAction<LayoutSettings>) => {
      state.readingPane = action.payload;
    },
    toggleIsSettingsOpened: (state) => {
      state.isSettingsOpened = !state.isSettingsOpened;
    },
  },
});

export const layoutSettingSelector = (state: RootState) => state.gmailExtension;
export const isSettingsOpenedSelector = (state: RootState) =>
  state.gmailExtension.isSettingsOpened;
export const densitySelector = (state: RootState) =>
  state.gmailExtension.density;
export const inboxTypeSelector = (state: RootState) =>
  state.gmailExtension.inboxType;
export const readingPaneSelector = (state: RootState) =>
  state.gmailExtension.readingPane;

export const {
  updateDensity,
  updateInboxType,
  updateReadingPane,
  toggleIsSettingsOpened,
} = gmailExtensionSlice.actions;

export default gmailExtensionSlice.reducer;
