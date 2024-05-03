import { prisma } from "@/util/prisma";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest,res: NextApiResponse,) {

    if(req.method === "GET"){
        res.status(200).send("Successfully receive.")
    }else if(req.method==="POST"){
        const {name,street,township, city,companyId} = JSON.parse(req.body)
        const valid = name && street  && township && city && companyId
        console.log(companyId)
        if(!valid) {
            return res.status(400).send("Bad Request.")
        }
        const location = await prisma.location.create({data: {name,street,township, city,companyId}})
        
        return res.status(200).json({location}) 
    }else if(req.method === "PUT"){
        const {id,name,street,township, city} = JSON.parse(req.body)
        
        const valid = id && name && street  && township && city 
        console.log(req.body)
        if(!valid) {
            return res.status(400).send("Bad Request.")
        }
        const location = await prisma.location.update({data: {name,street,township, city},where :{id}})
        console.log(location)
        return res.status(200).json({location}) 
    }else if(req.method === "DELETE"){

        const id  = Number(req.query.id)

        console.log(id)

        if(!id){
            return res.status(400).send("Bad Request.")
        }
        const location  = await prisma.location.update({data:{isArchived:true},where :{id}})
        return res.status(200).json({location}) 

    }

}
