import { useEffect, useState, useCallback } from "react";
import countryService from "../services/CountryService";
import cityService from "../services/CityService";
import styles from "../styles/Home.module.css";
import Select from "react-select";
import { useForm } from "react-hook-form";
import formSchema from "../schemas/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { formatCpf, formatTelephone } from "../components/utils/masks";

export const Home = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [formErrors, setFormErrors] = useState("");

  const handleKeyUp = useCallback((e) => {
    if (e.target.name == "CPF") {
      formatCpf(e);
    } else if (e.target.name == "telephone") {
      formatTelephone(e);
    }
  }, []);

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
  const notify = () => toast.success("Reserva feita com sucesso!");

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
                placeholder="11912345678"
                name="telephone"
                maxLength="13"
                onKeyUp={handleKeyUp}
              />
              <p> {errors?.telephone && errors?.telephone.message}</p>
            </label>
            <label htmlFor="CPF">
              <span> CPF</span>
              <input
                maxLength="11"
                {...register("CPF")}
                placeholder="12345678900"
                name="CPF"
                onKeyUp={handleKeyUp}
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
              placeholder="Escolha um ou mais país"
              options={countries}
              isMulti
              value={selectedCountries}
              name="countries"
            ></Select>
            <span> Cidades</span>

            <Select
              {...register("cities")}
              placeholder="Escolha uma ou mais cidades"
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
