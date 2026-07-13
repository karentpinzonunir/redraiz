import { useEffect, useRef, useState } from "react";
import { Modal, Form, Alert, Spinner, FloatingLabel } from "react-bootstrap";
import ButtonPrimary from "./ButtonPrimary";
import { usePost } from "../hooks/usePost";
import { useFormField } from "../hooks/useFormField";
import "../styles/modal.css";

/**
 * Props:
 *  - show: boolean
 *  - onHide: () => void
 */
export default function SubscriptionModal({ show, onHide }) {
  const nameRef = useRef(null);

  // ── 1. Estado local de éxito ─────────────────────────────────────
  const [success, setSuccess] = useState(false);

  // ── 2. Hooks de campo con validación en tiempo real ──────────────
  const nombre = useFormField("", (v) =>
    !v.trim() ? "El nombre es requerido." : null,
  );
  const email = useFormField("", (v) => {
    if (!v.trim()) return "El correo es requerido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return "Ingresa un correo válido.";
    return null;
  });

  // ── 3. Hook de API ───────────────────────────────────────────────
  const { post, loading: sending, error } = usePost("/api/suscripcion");

  const allFields = [nombre, email];

  // ── 4. Enfocar el primer campo al abrir el modal ─────────────────
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => nameRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [show]);

  // ── 5. Manejo del envío ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Marcar todos los campos como tocados para mostrar errores
    allFields.forEach((f) => f.onBlur());

    const hasErrors = allFields.some(
      (f) => f.isInvalid || (!f.isValid && f.value === ""),
    );
    if (hasErrors) return;

    // post() retorna { ok: true, data } o { ok: false, error }
    const result = await post({
      nombre: nombre.value,
      email: email.value,
    });

    if (result.ok) {
      allFields.forEach((f) => f.reset());
      setSuccess(true); // ← estado LOCAL, no del hook

      // Cerrar el modal automáticamente después de 3 segundos
      setTimeout(() => {
        setSuccess(false);
        onHide();
      }, 3000);
    }
  };

  // ── 6. Cerrar limpiando todo ─────────────────────────────────────
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
          // ── Formulario ───────────────────────────────────────────
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
          // ── Mensaje de éxito (reemplaza el formulario) ───────────
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
