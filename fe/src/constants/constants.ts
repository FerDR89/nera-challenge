import { SweetAlertIcon } from "sweetalert2";

export const validationFeedBack = {
  required: "Esta campo es requerido",
  moreThan: "El valor ingresado deber ser mayor a cero  ",
  minNumber: "Debes ingresar al menos un valor mayor a cero",
  minCharacters: "Debes ingresar al menos dos caracteres",
  maxCharacters: "Debes ingresar menos de veinte caracteres",
};

interface IAlertFeedback {
  create_account_success: {
    title: string;
    icon: SweetAlertIcon;
  };
  generic_error: {
    title: string;
    icon: SweetAlertIcon;
  };
  account_not_found: {
    title: string;
    icon: SweetAlertIcon;
  };
  transaction: { title: string; icon: SweetAlertIcon };
  insufficient_funds: { title: string; icon: SweetAlertIcon };
  invalid_transaction: { title: string; icon: SweetAlertIcon };
}

export const alertFeedBack: IAlertFeedback = {
  create_account_success: {
    title: "Ingresaste con éxito",
    icon: "success",
  },
  generic_error: {
    title: "En estos momentos no podemos realizar esta acción",
    icon: "error",
  },
  account_not_found: {
    title: "No pudimos acceder a tu cuenta",
    icon: "error",
  },
  transaction: { title: "Transacción realizada con éxito", icon: "success" },
  insufficient_funds: { title: "Fondos insuficientes", icon: "error" },
  invalid_transaction: { title: "Transacción inválida", icon: "error" },
};
