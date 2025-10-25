using InventoryManagementAPI.Model;

namespace InventoryManagementAPI.Service
{
    public interface ICountryService
    {
        void Insert(CountryDTO dto);

        List<CountryDTO> getAllCountries();
        void Delete(int Id);
        CountryDTO Edit(int CountryId);
        void Update(CountryDTO dto);
        List<CountryDTO> SearchCountry(string name);

    }
}
