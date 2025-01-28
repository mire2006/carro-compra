import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

function Registro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                console.log('¡Inicio de sesión correcto!');
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('¡Usuario registrado correctamente!');
            }
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error en la autenticación:', error.message);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Card className="mb-4">
                        <Card.Header className="bg-primary text-white">
                            <h2 className="mb-0">{isLogin ? 'Iniciar Sesión' : 'Registro de Usuario'}</h2>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email" placeholder="Ingresa tu correo electrónico" value={email} onChange={handleEmailChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingresa tu contraseña" value={password} onChange={handlePasswordChange} />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                                </Button>
                            </Form>

                            <Button variant="link" className="mt-2" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? '¿No tienes una cuenta? Regístrate aquí' : '¿Ya tienes una cuenta? Inicia sesión aquí'}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Registro;