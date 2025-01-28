import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';

function Productos(props) {
  const { producto, onAgregarAlCarrito } = props;

  return (
    <Card className="mb-3">
      <Row className="no-gutters">
        <Col md={4}>
          <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} style={{ width: '50%', height: 'auto' }} />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Text>Precio: ${producto.precio.toLocaleString()}</Card.Text>
            <Button variant="success" onClick={() => onAgregarAlCarrito(producto)}>
              Agregar al carrito
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default Productos;
