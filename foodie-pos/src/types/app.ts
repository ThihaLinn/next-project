import { baseOption } from "./menu";

export interface uploadAssertParams extends baseOption{
    file:File
}

export interface getAppData {

    tableId?:string

}