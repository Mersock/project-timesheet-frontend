/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import reduxThunk from "redux-thunk";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "./assets/css/auth.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "react-datepicker/dist/react-datepicker.css";


import AdminLayout from "layouts/Admin.js";
import Auth from "views/Auth.js";

import reducers from "./reducer";
import Index from "views";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
        <Route path="/signin" render={(props) => <Auth {...props}/> } />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/" render={(props) => <Index {...props}/> } />
        {/* <Redirect from="/" to="/auth" /> */}
      </Provider>
    </Switch>
  </BrowserRouter>
);
