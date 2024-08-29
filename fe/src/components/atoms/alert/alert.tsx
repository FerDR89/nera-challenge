import Swal, { SweetAlertIcon } from "sweetalert2";
import React from "react";

interface IAlert {
  title: string;
  icon: SweetAlertIcon;
}

export const alert = ({ title, icon }: IAlert) => {
  Swal.fire({
    title,
    icon,
    timer: 1000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};
