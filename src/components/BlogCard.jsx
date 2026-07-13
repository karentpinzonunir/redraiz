import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import ButtonPrimary from "./ButtonPrimary";
import "../styles/blog.css";

const BlogCard = ({ articulo }) => {
    return (
        <NavLink
            to={`/blog/${articulo.id}`}
            className="text-decoration-none"
        >
            <Card className="redraiz-card historia-card h-100 shadow-sm border-0 rounded-4">
                <Card.Img
                    variant="top"
                    src={`/assets/historias/${articulo.imagen}`}
                    className="rounded-top-4"
                />

                <Card.Body className="p-4 d-flex flex-column">
                    {articulo.categorias?.nombre && (
                        <Badge className="mb-2 align-self-start tag-categoria">
                            {articulo.categorias.nombre}
                        </Badge>
                    )}

                    <Card.Title className="fw-bold">
                        {articulo.titulo}
                    </Card.Title>

                    <p className="text-muted small mb-2">
                        <i className="fa-regular fa-calendar me-1"></i>
                        {new Date(articulo.fecha).toLocaleDateString("es-CO", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>

                    <Card.Text className="flex-grow-1 text-secondary">
                        {articulo.resumen}
                    </Card.Text>

                    <div className="mt-3">
                        <ButtonPrimary
                            as="button"
                            onClick={(e) => e.stopPropagation()}
                            className="stretched-link"
                        >
                            Leer Más
                        </ButtonPrimary>
                    </div>
                </Card.Body>
            </Card>
        </NavLink>
    );
};

export default BlogCard;