export function formatCpf(e) {
  e.currentTarget.maxLength = 14;
  let value = e.currentTarget.value;
  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
    e.currentTarget.value = value;
  }
  return e;
}

export function formatTelephone(e) {
  let value = e.target.value;
  if (!value.match(/^(\d{2}).(\d{5}).(\d{4})$/)) {
    value = value.replace(/\D/g, "");

    value = value.replace(/(\d{2})(\d)/, "$1-$2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = value;
  }
  return e;
}
