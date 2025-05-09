import { ptBR } from "date-fns/locale";

import DateHelper from "./dateHelper";

const config = {
  locale: ptBR,
  timeZone: "America/Sao_Paulo",
  format: "dd 'de' MMM. HH:mm",
};

const dateHelper = new DateHelper(config);

export default dateHelper;
