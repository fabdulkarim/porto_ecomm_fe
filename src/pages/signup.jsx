import { Form, Button, Container } from "react-bootstrap"
import React, { Component } from "react"
import NavigationBar from "../components/navbar"
import { Redirect } from "react-router-dom"

import axios from "axios"


class PageSignUp extends Component {
    state = {
        username: "",
        password: "",
        alamat_kirim: "",
        email: ""
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
        //console.log(event.target.name, event.target.value)
    }

    goSignUp = () => {
        const data={
            username: this.state.username,
            password: this.state.password,
            alamat_kirim: this.state.alamat_kirim,
            email: this.state.email
        }
        axios.post("http://0.0.0.0:5000/daftar", data)
        .then(response => {
            if (response.status==200){
                console.log(response.data)
                alert("Pendaftaran Sukses!")
                this.props.history.push("/login")
            }
        })
        .catch(error => console.log(error))
    }
    
    render() {
        return (
            <React.Fragment>
                <NavigationBar {...this.props} />
                <Container width="40%">
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Group controlId="formBasicUserName">
                            <Form.Label>username</Form.Label>
                            <Form.Control type="text" placeholder="username" name="username" onChange={e => this.handleChange(e)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>email</Form.Label>
                            <Form.Control type="email" placeholder="email" name="email" onChange={e => this.handleChange(e)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" placeholder="password" name="password" onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>alamat kirim</Form.Label>
                            <Form.Control type="text-area" placeholder="alamat kirim" name="alamat_kirim" onChange={e => this.handleChange(e)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={()=>this.goSignUp()}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </React.Fragment>
        )
    }
}

export default PageSignUp;
