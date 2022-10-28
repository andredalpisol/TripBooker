import axios from "axios";

const baseUrl = "https://amazon-api.sellead.com/country";

const countryService = {
  getCountries: async function () {
    const res = await axios.get(baseUrl);
    return res.data
      .sort((a, b) => {
        a = a.name;
        b = b.name;
        return a.localeCompare(b);
      })
      .map((country) => {
        return {
          value: country.name,
          label: country.name,
        };
      });
  },
};

export default countryService;
