import * as yup from "yup";

yup.addMethod(yup.string, "integer", function () {
  return this.matches(/^\d+$/, "Digite apenas números");
});

const formSchema = yup.object().shape({
  name: yup.string().required("* Nome é um campo obrigatório"),
  email: yup
    .string()
    .email("* Digite um formato de e-mail válido")
    .required("* E-mail é um campo obrigatório"),
  telephone: yup
    .string()
    .required("* Telefone é um campo obrigatório")
    .length(11, "* Telefone inválido")
    .integer(),
  CPF: yup
    .string()
    .required("* CPF é um campo obrigatório")
    .length(11, "* CPF precisa ter 11 digitos")
    .integer(),
});

export default formSchema;
