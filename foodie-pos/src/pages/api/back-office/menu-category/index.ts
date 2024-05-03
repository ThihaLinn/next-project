import { initialState } from "./../../../../store/slice/userSlice";
import { Company } from "@prisma/client";
import { companySlice } from "../../../../store/slice/CompanySlice";

import { useAppSelector } from "@/store/app/hook";
import { prisma } from "@/util/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);

  if (req.method == "GET") {
    res.status(200).send("Successfully receive.");
  } else if (req.method === "POST") {
    const { name, disable, companyId, locationId } = JSON.parse(req.body);
    const valid = name && companyId && disable !== undefined && locationId;

    console.log(disable);

    if (!valid) {
      return res.status(400).send("Bad Request.");
    }
    const menuCategory = await prisma.menuCategory.create({
      data: { name, disable, companyId },
    });
    if (disable === true) {
      let disableMenuCategory = await prisma.disableMenuCategory.create({
        data: { locationId, menuCategoryId: menuCategory.id },
      });
      return res.status(200).json({ menuCategory, disableMenuCategory });
    }
    return res.status(200).json({ menuCategory });
  } else if (req.method === "PUT") {
    const { id, name, disable, locationId } = JSON.parse(req.body);

    const valid = id && name && disable != undefined && locationId;

    if (!valid) {
      return res.status(400).send("Bad Request.");
    }

    const initial = (await prisma.disableMenuCategory.findFirst({
      where: { locationId, menuCategoryId: id },
    }))
      ? true
      : false;

    console.log("initials", initial);
    console.log(disable);

    const menuCategory = await prisma.menuCategory.update({
      data: { name, disable },
      where: { id },
    });

    if (initial === disable) {
      console.log(menuCategory);
      return res.status(200).json({ menuCategory });
    } else {
      const exit = await prisma.disableMenuCategory.findFirst({
        where: { menuCategoryId: menuCategory.id },
      });
      if (!exit) {
        const disableMenuCategory = await prisma.disableMenuCategory.create({
          data: { menuCategoryId: menuCategory.id, locationId },
        });
        const disableMenuCategories =
          await prisma.disableMenuCategory.findMany();
        return res.status(200).json({ menuCategory, disableMenuCategories });
      } else {
        const disableMenuCategory = await prisma.disableMenuCategory.delete({
          where: { id: exit?.id },
        });
        const disableMenuCategories =
          await prisma.disableMenuCategory.findMany();

        return res.status(200).json({ menuCategory, disableMenuCategories });
      }
    }
  } else if (req.method === "DELETE") {
    const id = Number(req.query.id);

    console.log(id);

    if (!id) {
      return res.status(400).send("Bad Request.");
    }
    const location = await prisma.menuCategory.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).json({ location });
  }
}
