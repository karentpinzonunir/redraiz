import React, { useState } from "react";
import { Form, Row, Col, FloatingLabel, Alert, Spinner } from "react-bootstrap";
import ButtonPrimary from './ButtonPrimary';
import { useGet } from '../hooks/useGet';
import { usePost } from '../hooks/usePost';
import { useFormField } from '../hooks/useFormField';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = () => {
  const [success, setSuccess] = useState(false);
  const nombre = useFormField('', (v) => !v.trim() ? 'El nombre es requerido.' : null);
  const apellido = useFormField('', null);
  const nombre_finca = useFormField('', null);
  const ciudad = useFormField('', (v) => !v.trim() ? 'La ciudad es requerida.' : null);
  const telefono = useFormField('', (v) => !v.trim() ? 'El teléfono es requerido.' : null);
  const correo = useFormField('', (v) => {
    if (!v.trim()) return 'El correo es requerido.';
    if (!emailRegex.test(v)) return 'Ingresa un correo electrónico válido.';
    return null;
  });
  const tipo_producto = useFormField('', (v) => !v ? 'Selecciona un tipo de producto.' : null);
  const historia = useFormField('', (v) => !v.trim() ? 'Campo requerido.' : null);

  const { data: tipos, loading: loadingTipos } = useGet('/api/tipo_productos');
  const { post, loading: sending, error } = usePost('/api/contacto');

  const allFields = [nombre, apellido, nombre_finca, ciudad, telefono, correo, tipo_producto, historia];

  const handleSubmit = async (e) => {
    e.preventDefault();
    allFields.forEach(f => f.onBlur());
    const requiredFields = [nombre, ciudad, telefono, correo, tipo_producto, historia];
    const hasErrors = requiredFields.some(f => f.isInvalid || (!f.isValid && f.value === ''));

    if (hasErrors) return;

    const result = await post({
      nombre: nombre.value,
      apellido: apellido.value || null,
      nombre_finca: nombre_finca.value || null,
      ciudad: ciudad.value,
      telefono: telefono.value,
      correo: correo.value,
      tipo_producto: Number(tipo_producto.value),
      historia: historia.value,
    });

    if (result.ok) {
      allFields.forEach(f => f.reset());
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="text-center py-5">
        <h4>¡Gracias por unirte!</h4>
        <p className="mb-0">Nos pondremos en contacto contigo pronto.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-5 py-5 shadow-sm">
      <div className="w-75 mx-auto">
        <h3 className="fw-bold mb5 text-center">Cuéntanos sobre tu producción</h3>

        <Form noValidate onSubmit={handleSubmit}>
          <Row className="g-4">

            <Col md={6}>
              <FloatingLabel controlId="nombre" label="Nombre">
                <Form.Control
                  {...nombre}
                  placeholder=" "
                  isInvalid={nombre.isInvalid}
                  isValid={nombre.isValid}
                  disabled={sending}
                />
                <Form.Control.Feedback type="invalid">{nombre.error}</Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="apellido" label="Apellido">
                <Form.Control {...apellido} placeholder=" " disabled={sending} />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="nombre_finca" label="Nombre de finca o emprendimiento">
                <Form.Control {...nombre_finca} placeholder=" " disabled={sending} />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="ciudad" label="Ciudad o Municipio">
                <Form.Control
                  {...ciudad}
                  placeholder=" "
                  isInvalid={ciudad.isInvalid}
                  isValid={ciudad.isValid}
                  disabled={sending}
                />
                <Form.Control.Feedback type="invalid">{ciudad.error}</Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="telefono" label="Teléfono">
                <Form.Control
                  {...telefono}
                  placeholder=" "
                  isInvalid={telefono.isInvalid}
                  isValid={telefono.isValid}
                  disabled={sending}
                />
                <Form.Control.Feedback type="invalid">{telefono.error}</Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="correo" label="Correo electrónico">
                <Form.Control
                  {...correo}
                  placeholder=" "
                  isInvalid={correo.isInvalid}
                  isValid={correo.isValid}
                  disabled={sending}
                />
                <Form.Control.Feedback type="invalid">{correo.error}</Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <Form.Group controlId="tipo_producto">
                <Form.Label>Tipo de Producto</Form.Label>
                <Form.Select
                  {...tipo_producto}
                  isInvalid={tipo_producto.isInvalid}
                  isValid={tipo_producto.isValid}
                  disabled={sending || loadingTipos}
                >
                  <option value="">Selecciona un tipo...</option>
                  {tipos?.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{tipo_producto.error}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group controlId="historia">
                <Form.Label>Cuéntanos tu historia</Form.Label>
                <Form.Control
                  {...historia}
                  as="textarea"
                  rows={5}
                  isInvalid={historia.isInvalid}
                  isValid={historia.isValid}
                  disabled={sending}
                />
                <Form.Control.Feedback type="invalid">{historia.error}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              {error && <Alert variant="danger">{error}</Alert>}
            </Col>

            <Col xs={12} className="text-center mt-4">
              <ButtonPrimary type="submit" disabled={sending}>
                {sending ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" className="me-2" />
                    Enviando...
                  </>
                ) : 'Quiero unirme a RedRaíz'}
              </ButtonPrimary>
            </Col>

          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;