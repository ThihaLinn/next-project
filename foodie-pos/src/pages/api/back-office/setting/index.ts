import { prisma } from "@/util/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "PUT") {
    const { id, name, street, township, city } = JSON.parse(req.body);

    const company = await prisma.company.update({
      data: { name, street, township, city },
      where: { id },
    });

    res.status(200).json({ company });
  }
}
