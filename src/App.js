import './App.css';
import React, { useState } from 'react';
import ListaProductos from './components/ListaProductos';
import Formulario from './components/Formulario';
import Registro from './components/Registro'

function App() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  const agregarAlCarrito = (producto) => {
    const productoEnCarrito = carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(nuevoCarrito);
      setTotal(total + producto.precio);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      setTotal(total + producto.precio);
    }
  };

  return (
    <div>
      <ListaProductos carrito={carrito} total={total} agregarAlCarrito={agregarAlCarrito} />
      <Formulario carrito={carrito} total={total} />
      <Registro />
      <div className="mt-5 py-3 bg-light text-center">
        <p>&copy; Mirella Ferrer | Iplacex | 2025 </p>
      </div>
    </div>
  );
}

export default App;
