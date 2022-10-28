import axios from "axios";

const baseUrl = "https://amazon-api.sellead.com/city";

const cityService = {
  getCities: async function () {
    const res = await axios.get(baseUrl);

    return res.data
      .sort((a, b) => {
        console.log(a);
        a = a.name;
        b = b.name;
        return a.localeCompare(b);
      })
      .map((city) => {
        return {
          value: city.name,
          label: city.name,
        };
      });
  },
};

export default cityService;
