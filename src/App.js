import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Componentes
import Header from './components/Header.jsx';
import NuevoProducto from './components/NuevoProducto.jsx';
import Productos from './components/Productos.jsx';
import EditarProducto from './components/EditarProducto.jsx';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route
              exact
              path="/productos/editar/:id"
              component={EditarProducto}
            />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
