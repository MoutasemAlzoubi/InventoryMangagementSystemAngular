import { CityDTO } from "./CityDTO"
import { CountryDTO } from "./CountryDTO"

export class WareHouseDTO{
    id!:number
    name!:string
    description!:string
    city_Id!:number
    country_Id!:number
    city!:CityDTO
    country!:CountryDTO
}