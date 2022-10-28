import axios from "axios";

const baseUrl = "https://amazon-api.sellead.com/country";

const countryService = {
  getCountries: async function () {
    const res = await axios.get(baseUrl);
    return res.data.map((country) => {
      return {
        value: country.name_ptbr,
        label: country.name_ptbr,
      };
    });
  },
};

export default countryService;
