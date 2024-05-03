import { disableMenu } from "./../../../../types/disableMenu";
import { Main } from "next/document";

import { prisma } from "@/util/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { log } from "console";
import { MenuCategoryMenu } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    res.status(200).send("Successfully receive.");
  }
  if (req.method === "POST") {
    const { name, price, menuCategoryIds, locationId, disable, imgUrl } =
      JSON.parse(req.body);
    const valid =
      name &&
      price !== undefined &&
      menuCategoryIds.length > 0 &&
      locationId &&
      disable != undefined;

    if (!valid) {
      return res.status(400).send("Bad Request.");
    }

    console.log("Really", name, price, menuCategoryIds, locationId, disable);

    let menu;
    imgUrl
      ? (menu = await prisma.menu.create({ data: { name, price, imgUrl } }))
      : (menu = await prisma.menu.create({ data: { name, price } }));

    const menuCategoryMenu = await prisma.$transaction(
      menuCategoryIds.map((menuCategoryId: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuId: menu.id, menuCategoryId },
        })
      )
    );

    if (imgUrl) {
    }

    if (disable === true) {
      let disableMenu = await prisma.disableMenu.create({
        data: { locationId, menuId: menu.id },
      });
      return res.status(200).json({ menu, menuCategoryMenu, disableMenu });
    }
    return res.status(200).json({ menu, menuCategoryMenu });
  } else if (req.method === "PUT") {
    const { id, name, disable, price, locationId, menuCategoryIds } =
      JSON.parse(req.body);

    if (
      !id &&
      name &&
      disable == undefined &&
      price != undefined &&
      menuCategoryIds > 0
    ) {
      return res.status(400).send("Bad Request.");
    }

    if (menuCategoryIds) {
      const menuCategoriesMenus = await prisma.menuCategoryMenu.findMany({
        where: { menuId: id },
      });
      // Remove
      const toRemove = menuCategoriesMenus.filter(
        (item) => !menuCategoryIds.includes(item.menuCategoryId)
      );
      if (toRemove.length) {
        await prisma.menuCategoryMenu.deleteMany({
          where: { id: { in: toRemove.map((item) => item.id) } },
        });
      }
      // Add
      const toAdd = menuCategoryIds.filter(
        (menuCategoryId: number) =>
          !menuCategoriesMenus.find(
            (item) => item.menuCategoryId === menuCategoryId
          )
      );
      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((menuCategoryId: number) =>
            prisma.menuCategoryMenu.create({
              data: { menuId: id, menuCategoryId },
            })
          )
        );
      }
    }
    const menuCategoryMenu = await prisma.menuCategoryMenu.findMany();

    const initial = (await prisma.disableMenu.findFirst({
      where: { locationId, menuId: id },
    }))
      ? true
      : false;
    const menu = await prisma.menu.update({
      data: { name, price, disable },
      where: { id },
    });

    console.log(initial, disable);

    if (initial === disable) {
      return res.status(200).json({ menu, menuCategoryMenu });
    } else {
      const exit = await prisma.disableMenu.findFirst({
        where: { menuId: menu.id },
      });
      if (!exit) {
        const disableMenu = await prisma.disableMenu.create({
          data: { menuId: menu.id, locationId },
        });
        const disableMenus = await prisma.disableMenu.findMany();
        return res.status(200).json({ menu, disableMenus, menuCategoryMenu });
      } else {
        const disableMenu = await prisma.disableMenu.delete({
          where: { id: exit.id },
        });
        const disableMenus = await prisma.disableMenu.findMany();

        return res.status(200).json({ menu, disableMenus, menuCategoryMenu });
      }
    }
  } else if (req.method === "DELETE") {
    const id = Number(req.query.id);

    console.log(id);

    if (!id) {
      return res.status(400).send("Bad Request.");
    }
    const menu = await prisma.menu.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).json({ menu });
  }
}
