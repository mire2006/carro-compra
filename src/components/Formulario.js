import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      correo: '',
      mensaje: '',
      carrito: this.props.carrito || [],
      total: this.props.total || 0,
    };

    this.validator = new SimpleReactValidator();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      try {
        const docRef = await addDoc(collection(db, 'contactos'), {
          nombre: this.state.nombre,
          correo: this.state.correo,
          mensaje: this.state.mensaje,
          carrito: this.state.carrito,
          total: this.state.total,
        });
        console.log('Documento escrito con ID: ', docRef.id);
        this.setState({ nombre: '', correo: '', mensaje: '', carrito: [], total: 0 });
      } catch (error) {
        console.error('Error al agregar el documento: ', error);
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { carrito, total } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Header className="bg-primary text-white">
                <h2 className="mb-0">Formulario de Contacto</h2>
              </Card.Header>
              <Card.Body>
                <form onSubmit={this.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={this.state.nombre}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    {this.validator.message('nombre', this.state.nombre, 'required')}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo electrónico:</label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      value={this.state.correo}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    {this.validator.message('correo', this.state.correo, 'required|email')}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje:</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={this.state.mensaje}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    {this.validator.message('mensaje', this.state.mensaje, 'required')}
                  </div>

                  <h3 className="mt-3">Detalle del Carrito</h3>
                  <ListGroup variant="flush">
                    {carrito.map((producto, index) => (
                      <ListGroup.Item key={index}>
                        {producto.nombre} - Cantidad: {producto.cantidad}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <p className="mt-3 text-end fw-bold">Total: ${total.toLocaleString()}</p>

                  <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Formulario;

