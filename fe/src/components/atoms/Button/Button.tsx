import { ButtonHTMLAttributes, CSSProperties, ReactElement } from "react";
import styles from "./button.module.css";

type ButtonProps = {
  children: string | ReactElement;
  type?: "button" | "submit" | "reset";
};

const Button = ({ children, type }: ButtonProps) => {
  return (
    <div className={styles.button_container}>
      <button type={type} className={styles.button}>
        {children}
      </button>
    </div>
  );
};

export default Button;
