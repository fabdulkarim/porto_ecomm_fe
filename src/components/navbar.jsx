import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

import logo from "../images/running.png"

class NavigationBar extends Component {
    handleAuthNav = input => {
        if (input === "Profile") {
            this.props.history.push("/profile")
        } else if (input === "Logout") {
            localStorage.removeItem("token")
            alert("You have successfully logged out")
            this.props.history.push("/")
        } else if (input === "Login") {
            this.props.history.push("/login")
        } else if (input === "Signup") {
            this.props.history.push("/signup")
        } else if (input === "Cart") {
            this.props.history.push("/cart")
        } else if (input === "Home") {
            this.props.history.push("/")
    }}
    
    render() {
        const authMenu = (localStorage.getItem("token")!=undefined) ? ["Cart","Profile","Logout"]
        : ["Login","Signup"]
        const authMenuList = authMenu.map(elem => {
            return (
                <Nav.Link onClick={() => this.handleAuthNav(elem)} >
                    {elem}
                </Nav.Link>
            )
        })
        console.log(logo)
        return (
            <Navbar expand="lg" bg="dark" variant="dark" >
                <Nav>
                    <Navbar.Brand className="mr-auto">
                        <img src={logo} width="100" height="100" className="d-inline-block align-center" alt="logo KBHM" onClick={() => this.handleAuthNav("Home")} />
                        <span>KBHM Athletics</span>
                    </Navbar.Brand>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mx-auto">
                        
                    </Nav>
                    <Nav className="ml-auto">
                        {authMenuList}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
} 

export default NavigationBar;