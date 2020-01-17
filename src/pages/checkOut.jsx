import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

import NavigationBar from "../components/navbar"

import { Container, Button, Form } from "react-bootstrap"
import ShowOrder from "../components/orderSummary"

class PageCheckOut extends Component {
    state={
        list_item:[],
        list_qty:[],
        alamat_kirim:""
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
        console.log(event.target.name, event.target.value)
    }

    componentDidMount = () => {
        let token = localStorage.getItem("token")
        const config = {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        let qtys = JSON.parse(localStorage.getItem("qty"))
        let items = JSON.parse(localStorage.getItem("list_item"))
        this.setState({list_qty:qtys, list_item:items})
        axios.get("http://0.0.0.0:5000/daftar",config)
        .then(response =>{
            let data2 = response.data
            this.setState({alamat_kirim:data2.alamat_kirim})
        })
        .catch(error => console.log(error))
    }

    submitOrder = () => {
        let token = localStorage.getItem("token")
        const config = {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        let qtys = this.state.list_qty
        let alamat_kirim = this.state.alamat_kirim
        let arr = []
        for(const i in qtys){
            let numi = parseInt(i)
            arr.push({id:(numi + 1), quant:qtys[i]})
        }
        const data = {
            quantity:arr,
            alamat_kirim: alamat_kirim
        }
        axios.post("http://0.0.0.0:5000/buynow", data, config)
        .then(response => {
            if (response.status==200){
                console.log(response.data)
                alert("Order Placed!")
                this.props.history.push("/profile")
            }
        })
        .catch(error => console.log(error))
    }

    render () {
        if (localStorage.getItem("list_item")==undefined) {
            return <Redirect to={{ pathname:"/" }}/>
        } else {
            return (
                <React.Fragment>
                    <NavigationBar {...this.props} />
                    <Container>
                        <h3>Order Summary</h3>
                        <ShowOrder qtys={this.state.list_qty} items={this.state.list_item} />
                        {/* <div className="home-item-wrapper">
                            <h3>All Items in Cart</h3>
                            <ItemDetail list_item={this.state.list_item_reduced}/>
                        </div> */}
                        <h3>Confirm Shipping Address</h3>
                        <Form onSubmit={e => e.preventDefault()}>
                            <Form.Group controlId="formShippingAddress">
                                <Form.Label>Shipping Address</Form.Label>
                                <Form.Control as="textarea" value={this.state.alamat_kirim} name="alamat_kirim" onChange={e => this.handleChange(e)} />
                            </Form.Group>
                            <Button variant="secondary" type="submit" onClick={() => this.submitOrder()}>
                                Place Order
                            </Button>
                        </Form>
                    </Container>
                </React.Fragment>
            )
        } 
    }
}

export default PageCheckOut;