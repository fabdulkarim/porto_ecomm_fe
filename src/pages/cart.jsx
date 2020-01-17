import React, { Component } from "react"
import { Redirect } from "react-router-dom"

import axios from "axios"
import NavigationBar from "../components/navbar"
import { Container, Button, Col, Row } from "react-bootstrap"
import CartDisplay from "../components/cartShow"

class PageCart extends Component {
    state = {
        cart_data:[],
        cart_item_data:[],
        cart_item_qty:[]
    }

    handleChangeQty = async e => {
        let array = this.state.cart_item_qty;
        array[e.target.name] = parseInt(e.target.value);
        this.setState({cart_item_qty:array});
    }

    goToCheckOut = () => {
        let qtys = this.state.cart_item_qty
        let items = this.state.cart_item_data
        localStorage.setItem("qty", JSON.stringify(qtys))
        localStorage.setItem("list_item", JSON.stringify(items))
        console.log(localStorage.getItem("qty"))
        console.log(localStorage.getItem("list_item"))
        this.props.history.push("/checkout")
    }

    goRemoveItemFromCart = (cart_id) => {
        let token = localStorage.getItem("token")
        let cart = this.state.cart_data;
        let data2 = this.state.cart_item_data;
        let qty = this.state.cart_item_qty;
        const config = {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        axios.delete("http://0.0.0.0:5000/cart/" + cart_id, config)
        .then(response => {
            for(const i in cart){
                if (cart[i].id == cart_id){
                    cart.splice(i,1)
                    data2.splice(i,1)
                    qty.splice(i,1)
                    this.setState({cart_data:cart, cart_item_data:data2, cart_item_qty:qty})
                }
            }
            console.log(response.data)
        })
        .catch(error => console.log(error))
    }
    
    componentDidMount = () => {
        let token = localStorage.getItem("token")
        const config = {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        axios.get("http://0.0.0.0:5000/cart", config)
        .then(async response => {
            if (response.status === 200) {
                this.setState({cart_data: response.data})
                let data = this.state.cart_data
                var item_detail = []
                let item_qty = []
                for(const i in data){
                    let item_id = data[i].item_id;
                    await axios.get("http://0.0.0.0:5000/item/"+ item_id)
                    .then(async response => {
                        item_detail.push(response.data)
                        item_qty.push(1);
                    })
                    .catch(error => console.log(error))
                }
                
                this.setState({cart_item_data: item_detail})
                this.setState({cart_item_qty: item_qty});
            }
        })
        .catch(error => console.log(error));
    }
    render () {
        let cart = this.state.cart_data;
        const data2 = this.state.cart_item_data;
        let qty = this.state.cart_item_qty;
        //console.log(qty)
        if (localStorage.getItem("token")==undefined) {
            return <Redirect to={{ pathname:"/" }}/>
        } else {
            return (
                <React.Fragment>
                    <NavigationBar {...this.props} />
                    <Container>
                        <Row>
                            <Col xs="9">
                                <br />
                                <CartDisplay list_cart={cart} item_detail={data2} qty={qty} rm={this.goRemoveItemFromCart} handle={this.handleChangeQty} />
                            </Col>
                            <Col xs="3">
                                <br />
                                {
                                    cart.length === 0 ? <div></div> : <Button variant="secondary" onClick={()=>this.goToCheckOut()}>Proceed</Button>
                                }
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment>
            )
        }
    }
}

export default PageCart;