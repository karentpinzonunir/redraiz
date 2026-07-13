// ComentarioForm.jsx
import React, { useState } from "react";
import { Form, Row, Col, FloatingLabel, Alert, Spinner } from "react-bootstrap";
import ButtonPrimary from "./ButtonPrimary";
import { useFormField } from "../hooks/useFormField";
import { usePost } from "../hooks/usePost";

const ComentarioForm = ({ historiaId }) => {
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const nombre = useFormField("", null); // opcional
  const comentario = useFormField("", (v) =>
    !v.trim() ? "El comentario es requerido." : null
  );

  const { post, loading: sending } = usePost(
    `/api/historias/${historiaId}/comentarios`
  );

  const allFields = [nombre, comentario];

  const handleSubmit = async (e) => {
    e.preventDefault();
    allFields.forEach((f) => f.onBlur());

    if (comentario.isInvalid || !comentario.value.trim()) return;

    setErrorMsg(null);

    const result = await post({
      id_historia: Number(historiaId),
      nombre: nombre.value.trim() || null,
      comentario: comentario.value.trim(),
    });

    if (result.ok) {
      allFields.forEach((f) => f.reset());
      setSuccess(true);
    } else {
      setErrorMsg("Ocurrió un error al enviar tu comentario. Intenta de nuevo.");
    }
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="mb-3" style={{ fontSize: "2.5rem" }}>🌱</div>
        <h5 className="fw-bold">¡Gracias por tu comentario!</h5>
        <p className="text-muted mb-0">
          Será revisado por nuestro equipo antes de publicarse.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h5 className="fw-bold mb-4">Deja tu comentario</h5>

      <Form noValidate onSubmit={handleSubmit}>
        <Row className="g-3">

          {/* Nombre (opcional) */}
          <Col xs={12}>
            <FloatingLabel controlId="nombre" label="Nombre (opcional)">
              <Form.Control
                type="text"
                placeholder=" "
                value={nombre.value}
                onChange={nombre.onChange}
                onBlur={nombre.onBlur}
                disabled={sending}
                className="rounded-3"
              />
            </FloatingLabel>
          </Col>

          {/* Comentario (requerido) */}
          <Col xs={12}>
            <Form.Group controlId="comentario">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Escribe tu comentario aquí..."
                value={comentario.value}
                onChange={comentario.onChange}
                onBlur={comentario.onBlur}
                isInvalid={comentario.isInvalid}
                isValid={comentario.isValid}
                disabled={sending}
                className="rounded-3"
              />
              <Form.Control.Feedback type="invalid">
                {comentario.error}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Error general */}
          {errorMsg && (
            <Col xs={12}>
              <Alert variant="danger" className="rounded-3 py-2 mb-0">
                {errorMsg}
              </Alert>
            </Col>
          )}

          {/* Botón */}
          <Col xs={12}>
            <ButtonPrimary type="submit" disabled={sending}>
              {sending ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    className="me-2"
                  />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar comentario
                </>
              )}
            </ButtonPrimary>
          </Col>

        </Row>
      </Form>
    </div>
  );
};

export default ComentarioForm;