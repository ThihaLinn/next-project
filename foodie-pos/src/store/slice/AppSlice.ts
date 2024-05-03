import { disableMenu } from "@/types/disableMenu";
import { Dispatch } from "@reduxjs/toolkit";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "@/config";
import { setMenu } from "./MenuSlice";
import { setMenuCategory } from "./MenuCategorySlice";
import { setCompany } from "./CompanySlice";
import { setMenuCategoryMenu } from "./MenuCategoryMenu";
import { setLocation } from "./LocationSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { setDisableMenuCategory } from "./DisableMenuCategorySlice";
import { setDisableMenu } from "./DisableMenuSlice";
import { setAddonCategories } from "./AddonCategorySlice";
import { getAppData, uploadAssertParams } from "@/types/app";
import { setMenuAddonCategory } from "./MenuAddonCategorySlice";
import { setAddon } from "./AddonSlice";
import { setTable } from "./TableSlice";
import { setOrder } from "./OrderSlice";
import { setOrderCartItem } from "./OrderCartItemSlice";
import { setOrderCartItemMenu } from "./OrderCartItemMenuSlice";
import { setOrderCartItemMenuAddon } from "./OrderCartItemMenuAddonSlice";
export interface Appslice {
  init: boolean;
  selectedLocation: Location | null;
  isloading: boolean;
  error: Error | null;
}

const initialState: Appslice = {
  init: false,
  selectedLocation: null,
  isloading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "app/fetchData",
  async ({ tableId }: getAppData, thunkApi) => {
    const dataFromServer = tableId
      ? await fetch(`${config.orderApiUrl}/app?tableId=${tableId}`)
      : await fetch(`${config.backofficeUrl}/app`);
    const response = await dataFromServer.json();
    const {
      menus,
      menuCategories,
      company,
      menuCategoryMenus,
      locations,
      disableMenuCategory,
      disableMenu,
      addOnCategories,
      menuAddOnCategories,
      addOns,
      tables,
      order,
      orderCartItem,
      orderCartItemMenu,
      orderCartItemMenuAddon,
    } = response;
    thunkApi.dispatch(setInit());
    thunkApi.dispatch(setMenu(menus));
    thunkApi.dispatch(setMenuCategory(menuCategories));
    thunkApi.dispatch(setAddonCategories(addOnCategories));
    thunkApi.dispatch(setCompany(company));
    thunkApi.dispatch(setMenuCategoryMenu(menuCategoryMenus));
    thunkApi.dispatch(setLocation(locations));
    thunkApi.dispatch(setDisableMenuCategory(disableMenuCategory));
    thunkApi.dispatch(setDisableMenu(disableMenu));
    thunkApi.dispatch(setMenuAddonCategory(menuAddOnCategories));
    thunkApi.dispatch(setAddon(addOns));
    thunkApi.dispatch(setTable(tables));
    thunkApi.dispatch(setOrder(order));
    thunkApi.dispatch(setOrderCartItem(orderCartItem));
    thunkApi.dispatch(setOrderCartItemMenu(orderCartItemMenu));
    thunkApi.dispatch(setOrderCartItemMenuAddon(orderCartItemMenuAddon));
    let location: any = localStorage.getItem("selectedLocationId");
    if (location) {
      location = JSON.parse(location);
      thunkApi.dispatch(setSelectedLocation(location));
    }
  }
);

export const createImageUrl = createAsyncThunk(
  "app/createImgUrl",
  async (payload: uploadAssertParams, thunkApi) => {
    const { file, onSuccess } = payload;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${config.backofficeUrl}/assert`, {
      method: "POST",
      body: formData,
    });

    const dataFromServer = await response.json();
    const { imgUrl } = dataFromServer;
    onSuccess && onSuccess(imgUrl);
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state) => {
      state.init = true;
    },
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
    getSelectedLocation: (state) => {
      state.selectedLocation;
    },
  },
});
export const { setInit, setSelectedLocation } = appSlice.actions;

export default appSlice.reducer;
