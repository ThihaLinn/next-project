import { createMenuCategory } from './../../../../store/slice/MenuCategorySlice';
import { prisma } from "@/util/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest,res: NextApiResponse,) {


    const method = req.method
    console.log(method);
    

    if(method==="GET"){
        res.status(200).send("GET METHOD")
    }
    else if(method==="POST"){
        const {name,price,addonCategoryId} = JSON.parse(req.body)

        const valid = name && price !== undefined && addonCategoryId  > 0

         console.log(name,price,addonCategoryId)
        if(!valid){
            res.status(400).send("Bad Request Error")
        }

        const addon = await prisma.addon.create({data:{name,price,addOnCategoryId:addonCategoryId}})

        return res.status(200).json({addon})
        
    }
    else if(method==="PUT"){
        const {id,name,price,addonCategoryId} = JSON.parse(req.body)
       
        const valid = name && price !== undefined && addonCategoryId  > 0

        console.log(id,name,price,addonCategoryId)
        if(!valid){
            res.status(400).send("Bad Request Error")
        }

        const addon = await prisma.addon.update({data:{name,price,addOnCategoryId:addonCategoryId},where:{id}})

    return res.status(200).json({addon})

         
    }
    else if(req.method === "DELETE"){

        const id = Number(req.query.id)

        console.log(id)

        if(!id){
            return res.status(400).send("Bad Request.")
        }
        const addon  = await prisma.addon.update({data:{isArchived:true},where :{id}})
        return res.status(200).json({addon})  

    }

}