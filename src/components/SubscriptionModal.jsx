import { useEffect, useRef, useState } from "react";
import { Modal, Form, Alert, Spinner, FloatingLabel } from "react-bootstrap";
import ButtonPrimary from "./ButtonPrimary";
import { usePost } from "../hooks/usePost";
import { useFormField } from "../hooks/useFormField";
import "../styles/modal.css";

export default function SubscriptionModal({ show, onHide }) {
  const nameRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const nombre = useFormField("", (v) =>
    !v.trim() ? "El nombre es requerido." : null,
  );
  const email = useFormField("", (v) => {
    if (!v.trim()) return "El correo es requerido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return "Ingresa un correo válido.";
    return null;
  });

  const { post, loading: sending, error } = usePost("/api/suscripcion");
  const allFields = [nombre, email];
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => nameRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [show]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    allFields.forEach((f) => f.onBlur());

    const hasErrors = allFields.some(
      (f) => f.isInvalid || (!f.isValid && f.value === ""),
    );
    if (hasErrors) return;
    const result = await post({
      nombre: nombre.value,
      email: email.value,
    });

    if (result.ok) {
      allFields.forEach((f) => f.reset());
      setSuccess(true); 
      setTimeout(() => {
        setSuccess(false);
        onHide();
      }, 3000);
    }
  };

  const handleClose = () => {
    allFields.forEach((f) => f.reset());
    setSuccess(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Suscríbete a RedRaiz</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!success ? (
          <>
            <p className="mb-3 lead-text">
              Únete a nuestra comunidad. Recibe novedades, historias de
              productores y ofertas directamente en tu correo.
            </p>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} noValidate>
              <FloatingLabel
                controlId="subNombre"
                label="Nombre"
                className="mb-3"
              >
                <Form.Control
                  {...nombre}
                  ref={nameRef}
                  type="text"
                  placeholder=" "
                  isInvalid={nombre.isInvalid}
                  isValid={nombre.isValid}
                  disabled={sending}
                />
                <Form.Control.Feedback type="invalid">
                  {nombre.error}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel
                controlId="subEmail"
                label="Correo electrónico"
                className="mb-3"
              >
                <Form.Control
                  {...email}
                  type="email"
                  placeholder=" "
                  isInvalid={email.isInvalid}
                  isValid={email.isValid}
                  disabled={sending}
                />
                <Form.Control.Feedback type="invalid">
                  {email.error}
                </Form.Control.Feedback>
              </FloatingLabel>

              <div className="d-flex justify-content-center mt-3">
                <ButtonPrimary type="submit" disabled={sending}>
                  {sending ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Enviando...
                    </>
                  ) : (
                    "Suscribirme"
                  )}
                </ButtonPrimary>
              </div>
            </Form>
          </>
        ) : (
          <div className="text-center py-5">
            <div className="mb-3 fs-1">
              ✅
            </div>
            <h4 className="fw-bold">¡Suscripción Exitosa!</h4>
            <p className="text-muted mb-0">
              Gracias por unirte a RedRaíz. Hemos registrado tu correo
              correctamente.
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
