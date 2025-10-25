import { WareHouseDTO } from "./WareHouseDTO"

export class WareHouseItemDTO{
    id!:number
    name!:string
    code!:string
    qty!:number
    costPrice!:number
    wareHouse_Id!:number
    ware!:WareHouseDTO
}