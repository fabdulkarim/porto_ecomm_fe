import { Form, Button, Container } from "react-bootstrap"
import React, { Component } from "react"
import NavigationBar from "../components/navbar"

import axios from "axios"


class PageLogin extends Component {
    state = {
        username: "",
        password: ""
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
        console.log(event.target.name, event.target.value)
    }

    goLogin = () => {
        const data={
            username: this.state.username,
            password: this.state.password
        }
        axios.post("http://0.0.0.0:5000/login", data)
        .then(response => {
            if (response.status==200){
                localStorage.setItem("token", response.data.token);
                console.log(response.data)
                alert("login berhasil")
                this.props.history.push("/")
            }
        })
        .catch(error => console.log(error))
    }
    render() {
        return (
            <React.Fragment>
                <NavigationBar {...this.props}/>
                <Container width="40%">
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>username</Form.Label>
                            <Form.Control type="type" placeholder="username" name="username" onChange={e => this.handleChange(e)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" placeholder="password" name="password" onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={()=>this.goLogin()}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </React.Fragment>
        )
    }
}

export default PageLogin;
