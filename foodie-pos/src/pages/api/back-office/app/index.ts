import { OrderCartItemMenuAddon } from "@prisma/client";
import { prisma } from "@/util/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { send } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const { user } = session;
    const name = user?.name as string;
    const email = user?.email as string;
    const dataFromDb = await prisma.user.findFirst({ where: { email } });

    if (dataFromDb) {
      //Company
      const company = await prisma.company.findFirst({
        where: { id: dataFromDb.id },
      });
      //Location
      const locations = await prisma.location.findMany({
        where: { companyId: company?.id, isArchived: false },
      });
      //table
      const tables = await prisma.table.findMany({
        where: {
          locationId: { in: locations.map((location) => location.id) },
          isArchived: false,
        },
      });
      //categories
      const menucategories = await prisma.menuCategory.findMany({
        where: { companyId: company?.id, isArchived: false },
      });
      //menu
      const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
        where: {
          menuCategoryId: { in: menucategories.map((category) => category.id) },
        },
      });
      const menuIds = menuCategoryMenu.map((item) => item.menuId) as [];
      const menus = await prisma.menu.findMany({
        where: { id: { in: menuIds }, isArchived: false },
      });
      //addOnCategory
      const menuAddOnCategory = await prisma.menuAddOnCategory.findMany({
        where: { menuId: { in: menus.map((menu) => menu.id) } },
      });
      const addOnCategorIds = menuAddOnCategory.map(
        (item) => item.addOnCategoryId
      ) as [];
      const addOnCategories = await prisma.addOnCategory.findMany({
        where: { id: { in: addOnCategorIds }, isArchived: false },
      });

      //addOn
      const addOns = await prisma.addon.findMany({
        where: {
          addOnCategoryId: { in: addOnCategories.map((addOn) => addOn.id) },
          isArchived: false,
        },
      });
      const disableMenu = await prisma.disableMenu.findMany({
        where: { locationId: { in: locations.map((location) => location.id) } },
      });
      const disableMenuCategory = await prisma.disableMenuCategory.findMany({
        where: { locationId: { in: locations.map((location) => location.id) } },
      });

      //order
      const order = await prisma.order.findMany({
        where: { tableId: { in: tables.map((table) => table.id) } },
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

      const orderCartItemMenuAddon =
        await prisma.orderCartItemMenuAddon.findMany({
          where: {
            orderCartItemMEnuId: {
              in: orderCartItemMenu.map(
                (orderCartItemMenu) => orderCartItemMenu.id
              ),
            },
          },
        });

      return res.status(200).json({
        company,
        locations: locations,
        tables: tables,
        menuCategories: menucategories,
        menus: menus,
        addOnCategories: addOnCategories,
        addOns: addOns,
        menuCategoryMenus: menuCategoryMenu,
        menuAddOnCategories: menuAddOnCategory,
        disableMenuCategory,
        disableMenu,
        order,
        orderCartItem,
        orderCartItemMenu,
        orderCartItemMenuAddon
      });
    } else {
      const newCompany = await prisma.company.create({
        data: {
          name: "Default name",
          street: "Default street",
          township: "Default township",
          city: "Default city",
        },
      });
      const companyId = newCompany.id;
      const newUser = await prisma.user.create({
        data: { email, name, companyId },
      });
      const newLocaion = await prisma.location.create({
        data: {
          name: "Default name",
          street: "Default street",
          township: "Default township",
          city: "Default city",
          companyId,
        },
      });
      const locationId = newLocaion.id;
      const newTable = await prisma.table.create({
        data: {
          name: "Default name",
          assetUrl: "Default assertUrl",
          locationId,
        },
      });
      const newMenuCategory = await prisma.menuCategory.create({
        data: {
          name: "Default name",
          disable: true,
          companyId,
        },
      });
      const menuCategoryId = newMenuCategory.id;
      const newMenu = await prisma.menu.create({
        data: {
          name: "Default name",
          price: 100,
        },
      });
      const menuId = newMenu.id;
      const newMenuCategoryMenu = await prisma.menuCategoryMenu.create({
        data: {
          menuId: menuId,
          menuCategoryId: menuCategoryId,
        },
      });
      const newAddOnCategory = await prisma.addOnCategory.create({
        data: {
          name: "Default name",
        },
      });
      const newMenuAddOnCategory = await prisma.menuAddOnCategory.create({
        data: {
          menuId: menuId,
          addOnCategoryId: newAddOnCategory.id,
        },
      });
      const addOns = [
        {
          name: "Default nameOne",
          price: 100,
          addOnCategoryId: newAddOnCategory.id,
        },
        {
          name: "Default nameTwo",
          price: 50,
          addOnCategoryId: newAddOnCategory.id,
        },
        {
          name: "Default nameThree",
          price: 0,
          addOnCategoryId: newAddOnCategory.id,
        },
      ];
      const newAddons = await prisma.$transaction(
        addOns.map((addon) => prisma.addon.create({ data: addon }))
      );

      return res.status(200).json({
        company: newCompany,
        locations: [newLocaion],
        tables: [newTable],
        menuCategories: [newMenuCategory],
        menus: [newMenu],
        addOnCategories: [newAddOnCategory],
        addOns: [newAddons],
        menuCategoryMenus: [newMenuCategoryMenu],
        menuAddOnCategories: [newMenuAddOnCategory],
        order: [],
      });
    }
  } else {
    res.status(401).send("Unauthorized");
  }
}
