import { orderCartItemMenuAddonSlice } from "./../slice/OrderCartItemMenuAddonSlice";
import { orderCartItemMenuSlice } from "./../slice/OrderCartItemMenuSlice";
import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../slice/MenuSlice";
import userReducer from "../slice/userSlice";
import menuCategoryReducer from "../slice/MenuCategorySlice";
import menuCategoryMenuReducer from "../slice/MenuCategoryMenu";
import snackbarReducer from "../slice/SnackBarSlice";
import appReducer from "../slice/AppSlice";
import companyReducer from "../slice/CompanySlice";
import LocationReducer from "../slice/LocationSlice";
import disableMenuCategoryReducer from "../slice/DisableMenuCategorySlice";
import disableMenuReducer from "../slice/DisableMenuSlice";
import addOnCategoryReducer from "../slice/AddonCategorySlice";
import menuAddOnCategoryReducer from "../slice/MenuAddonCategorySlice";
import addonReducer from "../slice/AddonSlice";
import tableReducer from "../slice/TableSlice";
import cartItemReducer from "../slice/cartItemSlice";
import orderReducer from "../slice/OrderSlice";
import orderCartItemReducer from "../slice/OrderCartItemSlice";
import orderCartItemMenuReducer from "../slice/OrderCartItemMenuSlice";
import orderCartItemMenuAddonReducer from "../slice/OrderCartItemMenuAddonSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    company: companyReducer,
    menuCategory: menuCategoryReducer,
    menu: menuReducer,
    addonCategory: addOnCategoryReducer,
    addon: addonReducer,
    location: LocationReducer,
    table: tableReducer,
    order: orderReducer,
    menuCategoryMenu: menuCategoryMenuReducer,
    menuAddonCategory: menuAddOnCategoryReducer,
    disableMenu: disableMenuReducer,
    disableMenuCategory: disableMenuCategoryReducer,
    orderCartItem: orderCartItemReducer,
    odreCartItemMenu: orderCartItemMenuReducer,
    orderCartItemMenuAddon: orderCartItemMenuAddonReducer,
    user: userReducer,
    snackBar: snackbarReducer,
    cartItem: cartItemReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
