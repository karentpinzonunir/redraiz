import { useState, useEffect, useRef } from "react";
import { Modal, Form, Alert, Spinner, FloatingLabel } from "react-bootstrap";
import ButtonPrimary from "./ButtonPrimary";
import "../styles/modal.css";

/**
 * Props:
 *  - show: boolean
 *  - onHide: () => void
 */
export default function SubscriptionModal({ show, onHide }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    if (show) {
      // pequeño delay para que el modal renderice antes de enfocar
      const t = setTimeout(() => nameRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [show]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Por favor completa ambos campos.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Ingresa un correo válido.");
      return;
    }

    setSending(true);

    try {
      // Ejemplo: enviar a tu API
      // await fetch("/api/subscribe", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, email }),
      // });

      // Simular delay
      await new Promise((res) => setTimeout(res, 900));

      setSuccess(true);
      setName("");
      setEmail("");

      // Cerrar modal automáticamente después de 1.5s (opcional)
      setTimeout(() => {
        setSuccess(false);
        onHide();
      }, 1500);
    } catch (err) {
      setError("Ocurrió un error al suscribir. Intenta nuevamente.");
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setError("");
    setSending(false);
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
              Únete a nuestra comunidad. Recibe novedades, historias de productores y ofertas directamente en tu correo.
            </p>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} noValidate>
              <FloatingLabel
                controlId="subName"
                label="Nombre"
                className="mb-3"
              >
                <Form.Control
                  ref={nameRef}
                  type="text"
                  placeholder=" "               /* importante para FloatingLabel */
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={sending}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="subEmail"
                label="Correo electrónico"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sending}
                  required
                />
              </FloatingLabel>

              <div className="d-flex justify-content-center">
                <ButtonPrimary type="submit" disabled={sending}>
                  {sending ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      <span className="ms-2">Enviando...</span>
                    </>
                  ) : (
                    "Suscribirme"
                  )}
                </ButtonPrimary>
              </div>
            </Form>
          </>
        ) : (
          <div className="text-center py-4">
            <h5>¡Gracias por unirte!</h5>
            <p className="mb-0">Revisa tu correo para confirmar tu suscripción.</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}