import { createMenuCategory } from './../../../../store/slice/MenuCategorySlice';
import { prisma } from "@/util/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest,res: NextApiResponse,) {


    const method = req.method

    if(method==="GET"){
        res.status(200).send("GET METHOD")
    }
    else if(method==="POST"){
        const {name,isRequired,menuIds} = JSON.parse(req.body)

        const valid = name && isRequired ==! undefined && menuIds.length > 0

         console.log(name,isRequired,menuIds)
        if(!valid){
            res.status(400).send("Bad Request Error")
        }

        const addonCategory = await prisma.addOnCategory.create({data:{name,isRequired}})

        const menuAddonCategories = await prisma.$transaction(
            menuIds.map((menuId: number) => prisma.menuAddOnCategory.create({data:{addOnCategoryId:addonCategory.id,menuId}}))
        )

        return res.status(200).json({addonCategory,menuAddonCategories})
        
    }
    else if(method==="PUT"){
        const {id,name,isRequired,menuIds} = JSON.parse(req.body)
       
        const valid = name && isRequired ==! undefined && menuIds.length > 0

        console.log(name,isRequired,menuIds)
        if(!valid){
            res.status(400).send("Bad Request Error")
        }


        const addonCategory = await prisma.addOnCategory.update({data:{name,isRequired},where:{id}})

        if (menuIds) {
            const menuAddOnCategories = await prisma.menuAddOnCategory.findMany({
                where: { addOnCategoryId: id },
            });
            // Remove
            const toRemove = menuAddOnCategories.filter(
                (item) => !menuIds.includes(item.menuId)
            );
            if (toRemove.length) {
                await prisma.menuAddOnCategory.deleteMany({
                where: { id: { in: toRemove.map((item) => item.id) } },
                });
            }
            // Add
            const toAdd = menuIds.filter(
                (menuId: number) =>
                !menuAddOnCategories.find(
                    (item) => item.menuId === menuId
                )
            );
            if (toAdd.length) {
                await prisma.$transaction(
                  toAdd.map((menuId: number) =>
                    prisma.menuAddOnCategory.create({
                      data: { addOnCategoryId: id, menuId },
                    })
                  )
                );
              }
            
            }

      const menuAddonCategories = await prisma.menuAddOnCategory.findMany()
     
      console.log(menuAddonCategories);
      console.log(addonCategory);

    return res.status(200).json({menuAddonCategories,addonCategory})

         
    }
    else if(req.method === "DELETE"){

        const id  = Number(req.query.id)

        console.log(id)

        if(!id){
            return res.status(400).send("Bad Request.")
        }
        const addOnCategory  = await prisma.addOnCategory.update({data:{isArchived:true},where :{id}})
        return res.status(200).json({addOnCategory})  

    }

}