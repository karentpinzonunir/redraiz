import { Button } from "react-bootstrap";
import '../styles/buttons.css';

const ButtonSecondary = ({ children, className = "", ...props }) => {
  return (
    <Button
      variant="" 
      className={`rounded-pill ms-3 px-4 btn btn--secundario ${className}`.trim()}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonSecondary;