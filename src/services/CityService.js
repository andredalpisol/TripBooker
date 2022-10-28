import axios from "axios";

const baseUrl = "https://amazon-api.sellead.com/city";

const cityService = {
  getCities: async function () {
    const res = await axios.get(baseUrl);

    return res.data.map((city) => {
      return {
        value: city.name_ptbr,
        label: city.name_ptbr,
      };
    });
  },
};

export default cityService;
