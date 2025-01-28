import React, { Component } from 'react';
import Productos from './Productos';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';

import poleraImg from '../img/polera.jpg';
import pantalonImg from '../img/pantalón.jpg';
import zapatosImg from '../img/zapatos.jpg';
import chaquetaImg from '../img/chaqueta.jpg';
import abrigoImg from '../img/abrigo.jpg';
import vestidoImg from '../img/vestido.jpg';
import trajeImg from '../img/traje.jpg';
import camisaImg from '../img/camisa.jpg';


class ListaProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carrito: this.props.carrito || [],
      total: this.props.total || 0
    };
  }

  render() {
    const productos = [
      { id: 1, nombre: "Polera", precio: 5990, imagen: poleraImg },
      { id: 2, nombre: "Pantalón", precio: 19990, imagen: pantalonImg },
      { id: 3, nombre: "Zapatos", precio: 39990, imagen: zapatosImg },
      { id: 4, nombre: "Chaqueta", precio: 29990, imagen: chaquetaImg },
      { id: 5, nombre: "Abrigo", precio: 69990, imagen: abrigoImg },
      { id: 6, nombre: "Vestido", precio: 49990, imagen: vestidoImg },
      { id: 7, nombre: "Traje", precio: 89990, imagen: trajeImg },
      { id: 8, nombre: "Camisa", precio: 19990, imagen: camisaImg },
    ];

    const { carrito } = this.props;
    const total = carrito.reduce((acc, curr) => acc + curr.precio * curr.cantidad, 0);

    const productosAgrupados = carrito.reduce((acc, curr) => {
      if (acc[curr.id]) {
        acc[curr.id].cantidad += curr.cantidad;
      } else {
        acc[curr.id] = { ...curr };
      }
      return acc;
    }, {});

    return (
      <Container>
        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Header className="bg-primary text-white">
                <h2 className="mb-0">Lista de Productos</h2>
              </Card.Header>
              <Card.Body>
                {productos.map((producto) => (
                  <Productos
                    key={producto.id}
                    producto={producto}
                    onAgregarAlCarrito={this.props.agregarAlCarrito}
                  />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Header className="bg-primary text-white">
                <h2 className="mb-0">Carrito de Compras</h2>
              </Card.Header>
              <Card.Body>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                      <th>Precio unitario</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(productosAgrupados).map((id) => {
                      const producto = productos.find(p => p.id === parseInt(id));
                      const subtotal = producto.precio * productosAgrupados[id].cantidad;
                      return (
                        <tr key={id}>
                          <td>{producto.nombre}</td>
                          <td>{productosAgrupados[id].cantidad}</td>
                          <td>${producto.precio.toLocaleString()}</td>
                          <td>${subtotal.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Card.Text className="mt-3 text-end fw-bold display-6">
                  Total: ${total.toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ListaProductos;
