import React, { useEffect } from "react";
import Producto from './Producto';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosAction } from "../actions/productosActions";

const Productos = () => {
  // LLamada a la acción principal para mostrar productos
  const dispatch = useDispatch();

  useEffect(() => {
    // Productos cuando el componente esté cargado
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos(); //llamo a la función
  }, [dispatch]);

  // Acceder al state
  const loading = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const productos = useSelector((state) => state.productos.productos);
  return (
    <React.Fragment>
      {/* Comprobación de un error  */}
      {error ? <div className="font-weight-bold alert alert-danger
        text-center mt-4" > Hubo un error... </div>  : null}
              
          <h2 className="text-center my-5">Listado de Libros</h2>
          <table className="table table-striped">
            <thead className="bg-primary table-dark">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <Producto
                  key={producto.id}
                  producto={producto}
                ></Producto>
              ))}
            </tbody>
          </table>
          {/* Muestra cargando  */}
          {loading ? "Cargando..." : null}
    </React.Fragment>
  );
};

export default Productos;
