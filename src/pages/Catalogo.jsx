// src/pages/Productos.jsx
import React, { useMemo, useState } from "react";
import {
  Row,
  Col,
  Spinner,
  Form,
  InputGroup,
  Container,
  Pagination,
  Card,
} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import { useGet } from "../hooks/useGet";
import { useSearch } from "../hooks/useSearch";
import { usePagination } from "../hooks/usePagination";

const Catalogo = () => {
  // ── Datos principales ────────────────────────────────────────────
  const { data, loading, error } = useGet("/api/productor_productos");
  const { data: dataRegiones } = useGet("/api/regiones");
  const { data: dataProductores } = useGet("/api/productores");
  const { data: dataProductosTipos } = useGet("/api/productos");

  // ── Filtros activos ──────────────────────────────────────────────
  const [filtroRegion, setFiltroRegion] = useState("");
  const [filtroProductor, setFiltroProductor] = useState("");
  const [filtroProducto, setFiltroProducto] = useState("");

  // ── Opciones de los selects ──────────────────────────────────────
  const regiones = useMemo(
    () => (Array.isArray(dataRegiones) ? dataRegiones : []),
    [dataRegiones]
  );
  const productores = useMemo(
    () => (Array.isArray(dataProductores) ? dataProductores : []),
    [dataProductores]
  );
  const tiposProducto = useMemo(
    () => (Array.isArray(dataProductosTipos) ? dataProductosTipos : []),
    [dataProductosTipos]
  );

  // ── Normalización ────────────────────────────────────────────────
  const listaRaw = useMemo(
    () =>
      Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
          ? data
          : [],
    [data]
  );

  const listaProductos = useMemo(() => {
    return listaRaw.map((item) => ({
      ...item,
      nombre: item.producto?.nombre || "",
      descripcion: item.producto?.descripcion || "",
      categoria: item.categoria?.nombre || item.producto?.categoria?.nombre || "",
      productor_nombre: item.productor?.nombre || "",
      region_nombre: item.region?.nombre || "",
      region_id: item.region?.id || item.productor?.region?.id || "",
      productor_id: item.productor?.id || "",
      producto_id: item.producto?.id || "",
      precio: item.precio ?? "",
    }));
  }, [listaRaw]);

  // ── Búsqueda por texto ───────────────────────────────────────────
  const {
    searchTerm,
    setSearchTerm,
    filteredData: searchedData,
  } = useSearch(listaProductos, [
    "nombre",
    "descripcion",
    "categoria",
    "productor_nombre",
    "region_nombre",
  ]);

  // ── Filtros por select ───────────────────────────────────────────
  const filteredData = useMemo(() => {
    return searchedData.filter((item) => {
      const matchRegion = !filtroRegion || String(item.region_id) === filtroRegion;
      const matchProductor = !filtroProductor || String(item.productor_id) === filtroProductor;
      const matchProducto = !filtroProducto || String(item.producto_id) === filtroProducto;
      return matchRegion && matchProductor && matchProducto;
    });
  }, [searchedData, filtroRegion, filtroProductor, filtroProducto]);

  const hayFiltros = filtroRegion || filtroProductor || filtroProducto || searchTerm;

  const limpiarFiltros = () => {
    setFiltroRegion("");
    setFiltroProductor("");
    setFiltroProducto("");
    setSearchTerm("");
  };

  // ── Paginación ───────────────────────────────────────────────────
  const { currentData, currentPage, totalPages, goToPage } = usePagination(
    filteredData,
    6
  );

  return (
    <div>
      {/* HERO */}
      <section className="py-5 text-center">
        <Container>
          <SectionTitle
            tag="Catálogo"
            title="Productos frescos del campo colombiano"
            description="Compra directamente a nuestros productores."
            center={true}
          />
        </Container>
      </section>

      {/* FILTROS */}
      <section className="pb-4">
        <div className="container-custom">
          <Card className="border shadow-sm bg-secondary-subtle">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-semibold text-success-redraiz">
                  <i className="fa-solid fa-sliders me-2"></i>Filtros
                </span>
                {hayFiltros && (
                  <button
                    className="btn btn-link btn-sm text-danger p-0 text-decoration-none"
                    onClick={limpiarFiltros}
                  >
                    <i className="fa-solid fa-xmark me-1"></i>Limpiar filtros
                  </button>
                )}
              </div>

              <Row className="g-3">
                <Col md={4}>
                  <Form.Label className="small text-muted mb-1">Región</Form.Label>
                  <Form.Select
                    value={filtroRegion}
                    onChange={(e) => setFiltroRegion(e.target.value)}
                  >
                    <option value="">Todas las regiones</option>
                    {regiones.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={4}>
                  <Form.Label className="small text-muted mb-1">Productor</Form.Label>
                  <Form.Select
                    value={filtroProductor}
                    onChange={(e) => setFiltroProductor(e.target.value)}
                  >
                    <option value="">Todos los productores</option>
                    {productores.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={4}>
                  <Form.Label className="small text-muted mb-1">Producto</Form.Label>
                  <Form.Select
                    value={filtroProducto}
                    onChange={(e) => setFiltroProducto(e.target.value)}
                  >
                    <option value="">Todos los productos</option>
                    {tiposProducto.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              {hayFiltros && (
                <div className="mt-3 text-muted small">
                  {filteredData.length} resultado{filteredData.length !== 1 ? "s" : ""} encontrado{filteredData.length !== 1 ? "s" : ""}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* BUSCADOR */}
      <section className="pb-5">
        <div className="container-custom">
          <div className="mx-auto buscador">
            <InputGroup size="lg" className="shadow-sm rounded-pill overflow-hidden border">
              <InputGroup.Text className="bg-white border-0 ps-4">
                <i className="fa-solid fa-magnifying-glass text-success-redraiz"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar en productos"
                className="border-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-5">
        <div className="container-custom">
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="success" />
            </div>
          )}

          {error && (
            <div className="text-center py-5 text-danger">
              <p>Error al cargar los productos: {String(error)}</p>
            </div>
          )}

          {!loading && !error && filteredData.length === 0 && (
            <div className="text-center py-5 gray-text">
              <p className="fs-5">
                No encontramos productos que coincidan con tu búsqueda.
              </p>
            </div>
          )}

          {!loading && !error && filteredData.length > 0 && (
            <>
              <Row xs={1} md={2} lg={3} className="g-4">
                {currentData.map((item) => (
                  <Col key={item.id}>
                    <ProductCard
                      producto={item.producto}
                      precio={item.precio}
                      categoria={item.categoria}
                      region={item.region}
                      productor={item.productor}
                      showProducer={true}
                    />
                  </Col>
                ))}
              </Row>

              {filteredData.length > 6 && (
                <div className="d-flex justify-content-center mt-5">
                  <Pagination>
                    <Pagination.Prev
                      disabled={currentPage === 1}
                      onClick={() => goToPage(currentPage - 1)}
                    />
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Pagination.Item
                          key={page}
                          active={page === currentPage}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </Pagination.Item>
                      )
                    )}
                    <Pagination.Next
                      disabled={currentPage === totalPages}
                      onClick={() => goToPage(currentPage + 1)}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Catalogo;