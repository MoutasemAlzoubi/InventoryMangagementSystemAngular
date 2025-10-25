//using AutoMapper;
using InventoryManagementAPI.Data;
using InventoryManagementAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementAPI.Service
{
    public class CountryService: ICountryService
    {
        InventoryContext context;
        //IMapper mapper;
        public CountryService(InventoryContext _context)
        {
            context = _context;
            //mapper = _mapper;

        }
        public void Insert(CountryDTO dto)
        {
            Country newCountry = new Country();
            newCountry.Code = dto.Code;
            newCountry.Name = dto.Name;
            context.Countries.Add(newCountry);
            context.SaveChanges();

            //Country newCountry = mapper.Map<Country>(dto);
            //context.countries.Add(newCountry);
            //context.SaveChanges();

        }
        public List<CountryDTO> getAllCountries()
        {
            List<Country> allCountries = context.Countries.ToList();
            List<CountryDTO> allCountryDTO = new List<CountryDTO>();
            foreach (Country item in allCountries)
            {
                CountryDTO countryDTO = new CountryDTO();
                countryDTO.Id = item.Id;
                countryDTO.Name = item.Name;
                countryDTO.Code = item.Code;
                allCountryDTO.Add(countryDTO);
            }
            //List<CountryDTO> allCountryDTO = mapper.Map<List<CountryDTO>>(allCountries);

            return (allCountryDTO);
        }
        public void Delete(int Id)
        {
            Country country = context.Countries.Where(c => c.Id == Id).FirstOrDefault();
            context.Countries.Remove(country);
            context.SaveChanges();
        }
        public CountryDTO Edit(int CountryId)
        {
            Country country = context.Countries.Where(c => c.Id == CountryId).FirstOrDefault();
            //CountryDTO countryDTO = mapper.Map<CountryDTO>(country);
            CountryDTO countryDTO = new CountryDTO();
            countryDTO.Id = country.Id;
            countryDTO.Code = country.Code;
            countryDTO.Name = country.Name;
            return countryDTO;

        }
        public void Update(CountryDTO dto)
        {
            //Country country = mapper.Map<Country>(dto);
            Country country = new Country();
            country.Id = dto.Id;
            country.Code = dto.Code;
            country.Name = dto.Name;
            context.Countries.Attach(country);
            context.Entry(country).State = EntityState.Modified;
            context.SaveChanges();

        }
        public List<CountryDTO> SearchCountry(string name)
        {

            List<Country> countrys = context.Countries.Where(c => c.Name.Contains(name) || c.Code.Contains(name)).ToList();
            List<CountryDTO> countryDTOs = new List<CountryDTO>();
            foreach (Country country in countrys)
            {
                //CountryDTO countryDTO = mapper.Map<CountryDTO>(country);
                CountryDTO countryDTO = new CountryDTO();
                countryDTO.Id = country.Id;
                countryDTO.Name = country.Name;
                countryDTO.Code = country.Code;
                countryDTOs.Add(countryDTO);
            }
            return countryDTOs;

        }
    }
}
