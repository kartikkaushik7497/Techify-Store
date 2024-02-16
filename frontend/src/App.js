import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";

import Header from "./component/layout/Header/Header.jsx";
import Footer from "./component/layout/Footer/Footer.jsx";
// import Loader from "./component/layout/Loader/Loader.jsx";
import Home from "./component/Home/Home.jsx";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search.jsx";
import LoginSignUp from "./component/User/LoginSignUp.jsx";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute.jsx";
import UpdateProfile from "./component/User/UpdateProfile.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route exact path="/search" element={<Search />} />
        <Route
          exact
          path="/account"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          exact
          path="/me/update"
          element={<ProtectedRoute component={UpdateProfile} />}
        />
        <Route exact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
