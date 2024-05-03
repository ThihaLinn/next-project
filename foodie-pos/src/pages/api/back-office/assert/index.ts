import { imageUpload } from "@/util/fileUpload";
import { Request, Response } from "express";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    if (req.method === "POST") {
      if (req.file) {
        res.send(404).send("file not fonud");
      }
      imageUpload(req, res, (error) => {
        if (error) {
          return res.status(500).send("Internal Server Error.");
        }
        const file = req.file as Express.MulterS3.File;
        const imgUrl = file.location;
        return res.status(200).json({ imgUrl });
      });
    } else {
      res.send(405).send("Method not allowed.");
    }
  }
}
