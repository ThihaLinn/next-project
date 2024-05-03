export interface baseOption {
    onSuccess?: (data?:any) => void
    onError?: (data?:any) => void
}

export interface BaseMenu {
    name:string,
    price:number,
    menuCategoryIds:number[]
}

export interface Menu extends BaseMenu ,baseOption{
    id:number
    imgUrl?:string
}

export interface NewMenuParams extends BaseMenu ,baseOption {
    locationId:number | null
    disable:boolean
    imgUrl?:string

}

export interface UpdateMenuParms extends baseOption{
    id:number
    name:string
    price:number
    locationId:number
    disable:boolean
    menuCategoryIds:[]
}

export interface deleteMenuParams extends baseOption{
    id:number
}
