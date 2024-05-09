import AddonCategoryComponent from "@/components/AddonCategoryComponent";
import OrderLayout from "@/components/OrderLayout";
import QuantityComponent from "@/components/QuantityComponent";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { setAddon } from "@/store/slice/AddonSlice";
import { addCartItem, updateCartItem } from "@/store/slice/cartItemSlice";
import { cartItem } from "@/types/cartItem";
import { Box, Button, Typography } from "@mui/material";
import { AddOnCategory, Addon, Menu } from "@prisma/client";
import { log } from "console";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function index() {
  const router = useRouter();
  const menuId = Number(router.query.menuId);
  const tableId = Number(router.query.tableId);
  const cartItemId: string = router.query.cartItemId as string;

  const menus = useAppSelector((state) => state.menu.menus);

  const dispatch = useAppDispatch();

  const menu = menus.find((m) => m.id === menuId);

  const menuAddonCagtegory = useAppSelector(
    (state) => state.menuAddonCategory.menuAddonCategories
  ).filter((row) => row.menuId === menu?.id);

  const addonCategoryIds = menuAddonCagtegory.map((row) => row.addOnCategoryId);

  const addonCategory = useAppSelector(
    (state) => state.addonCategory.addonCategories
  ).filter((ac) => addonCategoryIds.includes(ac.id));

  const addon = useAppSelector((state) => state.addon.addons).filter((a) =>
    addonCategory.find((ac) => ac.id === a.addOnCategoryId)
  );

  const [selectMenu, setSelectMenu] = useState<Menu>();
  const [selectAddon, setSelectAddon] = useState<Addon[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const [addonCategories, setAddonCategory] =
    useState<AddOnCategory[]>(addonCategory);
  const [addons, setAddons] = useState<Addon[]>(addon);
  const [disable, setDisable] = useState<boolean>();

  useEffect(() => {
    setSelectMenu(menu);
    setAddons(addon);
    setAddonCategory(addonCategory);
    setDisable(true);
    setItems(cartItems);
  }, [menus]);

  const cartItems = useAppSelector((state) => state.cartItem.cartItems);

  const [items, setItems] = useState<cartItem[]>();

  const cartItem = items?.find((item) => item.id === cartItemId);

  console.log(items);

  useEffect(() => {
    if (cartItem) {
      setSelectAddon(cartItem.addons);
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  useEffect(() => {
    const requiredLength = addonCategory.filter(
      (ac) => ac.isRequired === true
    ).length;

    const selectLength = selectAddon
      .map((a) => a.addOnCategoryId)
      .map((id) => addonCategory.find((ac) => ac.id === id))
      .filter((ac) => ac?.isRequired === true).length;

    setDisable(requiredLength !== selectLength);
  }, [selectAddon]);

  const handleCartItem = () => {
    dispatch(
      addCartItem({
        id: nanoid(7),
        menu: selectMenu as Menu,
        addons: selectAddon,
        quantity: quantity,
      })
    );
    router.push(`/order?tableId=${tableId}`);
  };

  const handleUpdateCartItem = () => {

    dispatch(
      updateCartItem({
        id: cartItem?.id as string,
        menu: selectMenu as Menu,
        addons: selectAddon,
        quantity: quantity,
      })
    );
    router.push(`/order/cart?tableId=${tableId}`);
  };

  return (
    <OrderLayout>
      <Box sx={{ width: "80%", mx: "auto", mt: "50px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={selectMenu?.imgUrl || "/default-menu.png"}
            alt="menu-image"
            width={150}
            height={150}
            priority
            style={{
              borderRadius: "50%",
              margin: "0 auto",
            }}
          />
          <Typography variant="h6">{selectMenu?.name}</Typography>
        </Box>
        <AddonCategoryComponent
          addonCategories={addonCategories}
          addons={addons}
          selectAddon={selectAddon}
          setSelectAddon={setSelectAddon}
        ></AddonCategoryComponent>
        <QuantityComponent
          quantity={quantity}
          setQuantity={setQuantity}
        ></QuantityComponent>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            disabled={disable}
            variant="contained"
            sx={{ width: "200px" }}
            onClick={
              cartItemId ? () => handleUpdateCartItem() : () => handleCartItem()
            }
          >
            {cartItemId ? "Update cart item" : "Add to cart"}
          </Button>
        </Box>
      </Box>
    </OrderLayout>
  );
}

export default index;
