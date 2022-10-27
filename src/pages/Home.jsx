import { useEffect, useState } from "react";
import countryService from "../services/CountryService";
import cityService from "../services/CityService";
import styles from "../styles/Home.module.css";
import Select from "react-select";
import { useForm } from "react-hook-form";
import formSchema from "../schemas/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";

export const Home = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [formErrors, setFormErrors] = useState("");

  //fetch data

  const fetchCitiesCountries = async () => {
    try {
      setCities(await cityService.getCities());
      setCountries(await countryService.getCountries());
      cities.map((city) => {
        return { name: city.name, value: city.name };
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCitiesCountries();
  }, []);

  //toast
  const notify = () => toast.su("Reserva feita com sucesso!");

  //form

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    setFormErrors("");
    if (selectedCities.length === 0 || selectedCountries.length === 0) {
      setFormErrors("* Favor selecione ao menos uma cidade e um país");
      return;
    }
    data.countries = selectedCountries;
    data.cities = selectedCities;
    notify();
    reset();
    setSelectedCities([]);
    setSelectedCountries([]);
  };

  return (
    <>
      <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.content_wrapper}>
          <div className={styles.form}>
            <h2> Dados pessoais</h2>
            <label htmlFor="name">
              <span> Nome</span>
              <input
                {...register("name")}
                className="form-label"
                type="text"
                name="name"
                placeholder="Digite seu nome"
              />
              <p> {errors?.name && errors?.name.message}</p>
            </label>
            <label htmlFor="email">
              <span> Email</span>
              <input
                className="form-label"
                name="email"
                placeholder="exemplo@gmail.com"
                {...register("email")}
              />
              <p> {errors?.email && errors?.email.message}</p>
            </label>

            <label htmlFor="telephone">
              <span> Telefone</span>
              <input
                {...register("telephone")}
                className="form-label"
                placeholder="12113213213"
                name="telephone"
                maxlength="11"
              />
              <p> {errors?.telephone && errors?.telephone.message}</p>
            </label>
            <label htmlFor="CPF">
              <span> CPF</span>
              <input
                maxlength="11"
                {...register("CPF")}
                className="form-label"
                placeholder="12345678900"
                name="CPF"
              />
              <p> {errors?.CPF && errors?.CPF.message}</p>
            </label>
          </div>
          <div className={styles.form}>
            <h2> Destinos de interesse</h2>
            <span> Países</span>
            <Select
              {...register("countries")}
              onChange={(value) => {
                setSelectedCountries(value);
              }}
              className={styles.select}
              options={countries}
              isMulti
              value={selectedCountries}
              name="countries"
            ></Select>
            <span> Cidades</span>

            <Select
              {...register("cities")}
              onChange={(value) => setSelectedCities(value)}
              value={selectedCities}
              name="cities"
              className={styles.select}
              options={cities}
              isMulti
            ></Select>

            {formErrors && <p> {formErrors} </p>}
          </div>
        </div>
        <button className={styles.submit_button} type="submit">
          <span> Enviar </span>
        </button>
        <Toaster />
      </form>
    </>
  );
};