import { CountryDTO } from "./CountryDTO"

export class CityDTO{
    id!:number
    name!:string
    country_Id!:number
    country!:CountryDTO
}