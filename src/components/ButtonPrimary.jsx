import { Button } from "react-bootstrap";
import '../styles/buttons.css';

const ButtonPrimary = ({ children, className = "", ...props }) => {
  return (
    <Button
      variant="" 
      className={`rounded-pill ms-3 px-4 btn btn--primario ${className}`.trim()}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;