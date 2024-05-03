import { disableMenu } from "./../../../../types/disableMenu";
import { Menu, MenuCategory } from "@prisma/client";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/util/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { AssistWalkerTwoTone } from "@mui/icons-material";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tableId = Number(req.query.tableId);

  //Table
  const table = await prisma.table.findFirst({
    where: { id: tableId, isArchived: false },
  });

  //Location
  const location = await prisma.location.findFirst({
    where: { id: table?.locationId },
  });

  console.log(location,table);

  //Company
  const company = await prisma.company.findFirst({
    where: { id: location?.companyId },
  });

  const disableMenuCategories = await prisma.disableMenuCategory.findMany({
    where: { locationId: location?.id },
  });

  const disablemenuCategoryIds = disableMenuCategories.map(
    (dmc) => dmc.menuCategoryId
  );

  const menuCategories = await prisma.menuCategory.findMany({
    where: { companyId: company?.id, isArchived: false },
  });

  //MenuCategory
  const validMenuCategories = menuCategories.filter(
    (mc) => !disablemenuCategoryIds.includes(mc.id)
  );

  const validMenuCategoryIds = validMenuCategories.map((vmc) => vmc.id);

  const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
    where: { menuCategoryId: { in: validMenuCategoryIds } },
  });

  const MenusIds = menuCategoryMenu.map((mcm) => mcm.menuId) as [];

  const menus = await prisma.menu.findMany({
    where: { id: { in: MenusIds }, isArchived: false },
  });

  const disableMenus = await prisma.disableMenu.findMany({
    where: { locationId: location?.id },
  });

  const disableMenuIds = disableMenus.map((dm) => dm.menuId);

  //Menus
  const ValidMenus = menus.filter((m) => !disableMenuIds.includes(m.id));

  const validMenuIds = ValidMenus.map((vm) => vm.id);

  const menuAddOnCategory = await prisma.menuAddOnCategory.findMany({
    where: { menuId: { in: validMenuIds } },
  });

  const addonCategoryIds = menuAddOnCategory.map(
    (mac) => mac.addOnCategoryId
  ) as [];

  //AddonCategories
  const addonCategories = await prisma.addOnCategory.findMany({
    where: { id: { in: addonCategoryIds }, isArchived: false },
  });

  const validAddonCategoryIds = addonCategories.map((ac) => ac.id);

  //addon
  const addons = await prisma.addon.findMany({
    where: {
      addOnCategoryId: { in: validAddonCategoryIds },
      isArchived: false,
    },
  });

  //order
  const order = await prisma.order.findMany({
    where: { tableId, status: "PROCESS" },
  });

  const orderCartItem = await prisma.orderCartItem.findMany({
    where: { orderId: { in: order.map((order) => order.id) } },
  });

  const orderCartItemMenu = await prisma.orderCartItemMEnu.findMany({
    where: {
      orderCartItemItemId: {
        in: orderCartItem.map((orderCartItem) => orderCartItem.id),
      },
    },
  });

  const orderCartItemMenuAddon = await prisma.orderCartItemMenuAddon.findMany({
    where: {
      orderCartItemMEnuId: {
        in: orderCartItemMenu.map((orderCartItemMenu) => orderCartItemMenu.id),
      },
    },
  });

  return res.status(200).json({
    company,
    locations: [location],
    tables: [table],
    menuCategories: validMenuCategories,
    menus: ValidMenus,
    addOnCategories: addonCategories,
    addOns: addons,
    menuCategoryMenus: menuCategoryMenu,
    menuAddOnCategories: menuAddOnCategory,
    disableMenuCategory: [],
    disableMenu: [],
    order,
    orderCartItem,
    orderCartItemMenu,
    orderCartItemMenuAddon,
  });

  // const validMenus = menus.filter(m => !disableMenuIds.includes(m.id))

  //Menu
}
