import { Table } from '@prisma/client';
import { prisma } from "@/util/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateLinkForQRCode, qrCodeImageUpload } from '@/util/fileUpload';

export default async function handler(req: NextApiRequest,res: NextApiResponse,) {
    if(req.method === "GET"){
        res.status(200).send("Successfully receive.")
    }else if(req.method==="POST"){
        const {name,locationId} = JSON.parse(req.body)
        const valid = name && locationId
        if(!valid) {
            return res.status(400).send("Bad Request.")
        }
        let table = await prisma.table.create({data: {name,locationId,assetUrl:""}})

        const assetUrl = await qrCodeImageUpload(table.id)

        table = await prisma.table.update({data:{assetUrl},where:{id:table.id}})
        
        return res.status(200).json({table}) 
    }
    else if(req.method==="PUT"){
        const {id,name} = JSON.parse(req.body)
        const valid = id && name
        if(!valid) {
            return res.status(400).send("Bad Request.")
        }
        const table = await prisma.table.update({data:{name},where:{id}})
        return res.status(200).json({table}) 

    }
    else if(req.method === "DELETE"){

        const id  = Number(req.query.id)

        console.log(id)

        if(!id){
            return res.status(400).send("Bad Request.")
        }
        const table  = await prisma.table.update({data:{isArchived:true},where :{id}})
        return res.status(200).json({table}) 

    }
}
