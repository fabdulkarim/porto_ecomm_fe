import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom"
import { Provider } from "unistore/react"
import { store } from "../store"

import PageHome from "../pages/home"
import PageLogin from "../pages/login";
import PageSignUp from "../pages/signup";
import PageSingle from "../pages/singleItem";
import PageQuery from "../pages/query";
import PageCart from "../pages/cart";
import PageProfile from "../pages/profile";
import PageCheckOut from "../pages/checkOut";
import PageAdmin from "../pages/admin";

const MainRoute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={PageHome}></Route>
                    <Route exact path="/login" component={PageLogin}></Route>
                    <Route exact path="/signup" component={PageSignUp}></Route>
                    <Route exact path="/item" component={PageQuery}></Route>
                    <Route exact path="/cart" component={PageCart}></Route>
                    <Route exact path="/admin" component={PageAdmin} onLeave={() => {
                        localStorage.removeItem("isAdmin")
                    }}></Route>
                    <Route exact path="/checkout" component={PageCheckOut} onLeave={()=>{
                        localStorage.removeItem("qty");
                        localStorage.removeItem("list_item")
                    }}></Route>

                    <Route exact path="/profile" component={PageProfile}></Route>
                    <Route path="/item/:id" component={PageSingle}></Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default MainRoute;