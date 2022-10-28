import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().required("* Nome é um campo obrigatório"),
  email: yup
    .string()
    .email("* Digite um formato de e-mail válido")
    .required("* E-mail é um campo obrigatório"),
  telephone: yup
    .string()
    .required("* Telefone é um campo obrigatório")
    .length(13, "* Telefone inválido"),
  CPF: yup
    .string()
    .required("* CPF é um campo obrigatório")
    .length(14, "* CPF precisa ter 11 digitos"),
});

export default formSchema;
