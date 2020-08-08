import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

//Redux
import { useDispatch } from "react-redux";
import { productoEliminarAction } from "../actions/productosActions";

const Producto = ({ producto }) => {
  // Dispatch para ejecutar las acciones
  // acción de borrado
  const dispatch = useDispatch();

  const confirmarEliminarProducto = (id) => {
    //Preguntar al usuario si quiere borrar el registro
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El producto no se podrá recuperar!",
      icon: "warning",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.value) {
        Swal.fire(
        "Eliminado!",
        "Producto eliminado correctamente.", "success");
        dispatch(productoEliminarAction(id));
      }
    });
  };

  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>
        <span className="font-weight-bold">{producto.precio} €</span>
      </td>
      <td className="acciones">
        <Link
          to={`/productos/editar/${producto.id}`}
          className="btn btn-primary mr-2"
        >
          Editar
        </Link>

        <button
          className="btn btn-danger"
          // Con dispatch, llamo a la función principal de borrado
          onClick={() => confirmarEliminarProducto(producto.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
