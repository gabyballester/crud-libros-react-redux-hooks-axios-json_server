import React, { useEffect, Fragment, useRef } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  productoEditarAction,
  productoEditadoAction,
} from "../actions/productosActions";

const EditarProducto = ({ match }) => {
  // hago uso del useRef para capturar los inputs y editarlos luego
  const nombreRef = useRef("");
  const precioRef = useRef("");

  // dispatch para ejecutar la acción principal
  const dispatch = useDispatch();
  //Creamos un alias para cuando se edite el producto
  // sólo se pasa payload si queremos cambiar algo en el state
  const editarProducto = (producto) => dispatch(productoEditadoAction(producto));
  //obtener el ID a editar
  const { id } = match.params;
  // lo llamamos al cargarde el componente
  useEffect(() => {
    // le pasamos el id
    dispatch(productoEditarAction(id));
  }, [dispatch, id]); //paso dispatch e id como dependencias
  //Acceso al state para capturar el producto
  const producto = useSelector((state) => state.productos.producto);
  // creo variable para gestión de error
  const error = useSelector((state) => state.productos.error);
  // Para evitar el retardo de API
  if (!producto) return "Cargando...";

  const submitEditandoProducto = (e) => {
    e.preventDefault();

    //Validar formulario
    

    //Si todo ok

    //Guardarlos cambios
    // llamo al alias y le paso el objeto
    editarProducto({ // le paso las propiedades
      id, 
      nombre: nombreRef.current.value,
      precio: precioRef.current.value
     })

    //Redireccionar
  };

  return (
    <Fragment>
      {error ? (
        <div className="fontt-weight-bold alert alert-danger text-center mt-4">
          Hubo un error, intenta de nuevo
        </div>
      ) : (
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center">Editar Libro</h2>
                <form onSubmit={submitEditandoProducto}>
                  <div className="form-group">
                    <label>Titulo</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Titulo"
                      defaultValue={producto.nombre}
                      ref={nombreRef}
                    />
                  </div>
                  <div className="form-group">
                    <label>Precio</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Precio"
                      defaultValue={producto.precio}
                      ref={precioRef}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                  >
                    Guardar Cambios
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditarProducto;
