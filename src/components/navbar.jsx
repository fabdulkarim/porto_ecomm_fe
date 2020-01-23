import React, { Component } from "react";
import { Navbar, Nav, InputGroup, FormControl, Button, Row } from "react-bootstrap";

import logo from "../images/running.png"
import searchLogo from "../images/search.png"

//using store actions for DEFAULT search feature
import { withRouter, Link } from "react-router-dom"
import { connect } from "unistore/react"
import { actions } from "../store"

class NavigationBar extends Component {
    // navbarSearchChange = (e) => {
    //     this.props.isQuery == true ? this.props.handleSearch(e) : (e) => this.props.storeSearchChange(e)
    // }

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
        if (localStorage.getItem("isAdmin") === "true") {
            return (
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Nav>
                        <Navbar.Brand className="mr-auto">
                            <img src={logo} width="100" height="100" className="d-inline-block align-center" alt="logo KBHM" onClick={() =>  {
                                localStorage.removeItem("isAdmin");
                                this.handleAuthNav("Logout");
                            }
                                } />
                            <span>KBHM Athletics -- Admin Page</span>
                        </Navbar.Brand>
                    </Nav>
                </Navbar>
            )
        } else return (
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
                        <Row className="px-10 align-items-center">
                            <InputGroup>
                                <FormControl
                                placeholder="Start Typing..."
                                aria-label="search"
                                aria-describedby="basic-addon2"
                                value={this.props.search}
                                onChange={
                                    e => this.props.handleSearch(e)
                                }
                                />
                                {/* varying search display based on pages */}
                                {
                                    this.props.isQuery !== true ? (      
                                        <InputGroup.Append>
                                            <Link to={"/item"}>
                                                <Button variant="outline-secondary">
                                                    <img className="search-logo" src={searchLogo} alt="search logo" style={{ height: "20px" }} />
                                                </Button>
                                            </Link>
                                        </InputGroup.Append>
                                    ) : (
                                        <div></div>
                                    )
                                }
                            </InputGroup>
                        </Row>
                    </Nav>
                    <Nav className="ml-auto">
                        {authMenuList}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
} 

export default connect(actions)(withRouter(NavigationBar));