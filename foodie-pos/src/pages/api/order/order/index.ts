import { cartItem } from "@/types/cartItem";
import { OrderStatus } from "@prisma/client";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/util/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    const { cartItems, tableId, totalPrice } = JSON.parse(req.body);

    const order = await prisma.order.findFirst({
      where: { tableId, status: OrderStatus.PROCESS },
    });
    const orderSeq = order ? order.orderSeq : nanoid(7);

    //add-order
    if (order) {
      const updatedOrderPrice = order.totalPrice + totalPrice;
      await prisma.order.update({
        data: { totalPrice: updatedOrderPrice },
        where: { id: order.id },
      });
      for (let cartItem of cartItems) {
        const orderCartItem = await prisma.orderCartItem.create({
          data: {
            itemId: cartItem.id,
            quantity: cartItem.quantity,
            status: "PENDING",
            orderId: order.id,
          },
        });
        const orderCartItemMenu = await prisma.orderCartItemMEnu.create({
          data: {
            orderCartItemItemId: orderCartItem.id,
            menuId: cartItem.menu.id,
          },
        });
        for (let addon of cartItem.addons) {
          const orderCartItemMenuAddon =
            await prisma.orderCartItemMenuAddon.create({
              data: {
                orderCartItemMEnuId: orderCartItemMenu.id,
                addonId: addon.id,
              },
            });
        }
      }

      const orderCartItem = await prisma.orderCartItem.findMany({
        where: { orderId: order.id },
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
        order,
        orderCartItem,
        orderCartItemMenu,
        orderCartItemMenuAddon,
      });
    }

    //new-order
    const newOrder = await prisma.order.create({
      data: { tableId, totalPrice, orderSeq, status: "PROCESS" },
    });
    for (let cartItem of cartItems) {
      const orderCartItem = await prisma.orderCartItem.create({
        data: {
          itemId: cartItem.id,
          quantity: cartItem.quantity,
          status: "PENDING",
          orderId: newOrder.id,
        },
      });

      const orderCartItemMenu = await prisma.orderCartItemMEnu.create({
        data: {
          orderCartItemItemId: orderCartItem.id,
          menuId: cartItem.menu.id,
        },
      });

      for (let addon of cartItem.addons) {
        const orderCartItemMenuAddon =
          await prisma.orderCartItemMenuAddon.create({
            data: {
              orderCartItemMEnuId: orderCartItemMenu.id,
              addonId: addon.id,
            },
          });
      }
    }

    const orderCartItem = await prisma.orderCartItem.findMany({
      where: { orderId: newOrder.id },
    });
    const orderCartItemMenu = await prisma.orderCartItemMEnu.findMany({
      where: {
        orderCartItemItemId: {
          in: orderCartItem.map((orderCartItem) => orderCartItem.id),
        },
      },
    });
    const orderCartItemMenuAddon = await prisma.orderCartItemMenuAddon.findMany(
      {
        where: {
          orderCartItemMEnuId: {
            in: orderCartItemMenu.map(
              (orderCartItemMenu) => orderCartItemMenu.id
            ),
          },
        },
      }
    );

    return res.status(200).json({
      order:newOrder,
      orderCartItem,
      orderCartItemMenu,
      orderCartItemMenuAddon,
    });
  }
}
