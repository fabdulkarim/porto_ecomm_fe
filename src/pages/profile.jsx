import React, { Component } from "react"

import axios from "axios"

import NavigationBar from "../components/navbar"

import { Container, Button, Col, Form, Row } from "react-bootstrap"
import OrderDisplay from "../components/orderHistory"

class PageProfile extends Component {
    state={
        username: "",
        password: "",
        alamat_kirim: "",
        email: "",
        data_order:""
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
        console.log(event.target.name, event.target.value)
    }

    goRepairProfile = () => {
        let token = localStorage.getItem("token")
        const config = {
            headers: {
                "Authorization": "Bearer " + token
            }
        }        
        const data={
            username: this.state.username,
            password: this.state.password,
            alamat_kirim: this.state.alamat_kirim,
            email: this.state.email
        }
        console.log(data)
        axios.put("http://0.0.0.0:5000/daftar", data, config)
        .then(response => {
            if (response.status==200){
                console.log(response.data)
                alert("Pembaruan Data Sukses!")
                this.reload()
            }
        })
        .catch(error => console.log(error))
    }

    reload = () => {
        let token = localStorage.getItem("token")
        const config = {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        axios.get("http://0.0.0.0:5000/buynow",config)
        .then(response =>{
            let data = response.data
            this.setState({data_order: data})
        })
        .catch(error => console.log(error))
        axios.get("http://0.0.0.0:5000/daftar",config)
        .then(response =>{
            let data2 = response.data
            this.setState({username: data2.username, alamat_kirim:data2.alamat_kirim,email:data2.email})
        })
        .catch(error => console.log(error))
    }

    componentDidMount = () => {
        this.reload()
    }

    render () {
        return (
            <React.Fragment>
                <NavigationBar {...this.props} />
                <br />
                <Container>
                    <Row>
                        <Col xs="6">
                            <h3>Renew Your Profile</h3>
                            <Container>
                                <Form onSubmit={e => e.preventDefault()}>
                                    <Form.Group controlId="formBasicUserName">
                                        <Form.Label>username</Form.Label>
                                        <Form.Control type="text" value={this.state.username} name="username" onChange={e => this.handleChange(e)} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>email</Form.Label>
                                        <Form.Control type="email" value={this.state.email} name="email" onChange={e => this.handleChange(e)} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control type="password" placeholder="password" name="password" onChange={e => this.handleChange(e)}/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicAddress">
                                        <Form.Label>alamat kirim</Form.Label>
                                        <Form.Control as="textarea" value={this.state.alamat_kirim} name="alamat_kirim" onChange={e => this.handleChange(e)} />
                                    </Form.Group>
                                    <Button variant="secondary" type="submit" onClick={() => this.goRepairProfile()}>
                                        Renew Profile
                                    </Button>
                                </Form>
                            </Container>
                        </Col>
                        <Col xs="6">
                            <h3>Order History</h3>
                            <OrderDisplay list_order={this.state.data_order}/>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default PageProfile;