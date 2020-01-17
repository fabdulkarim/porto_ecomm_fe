import React, { Component } from "react"
import axios from "axios"

import NavigationBar from "../components/navbar"
import { Container, Col, Button, Card } from "react-bootstrap"

import ItemDisplay from "../components/itemGet"

class PageQuery extends Component {
    state = {
        list_item: []
    }
    componentDidMount = () => {
        axios.get("http://0.0.0.0:5000/item")
        .then(response => {            
            if (response.status===200) {
                this.setState({list_item:response.data})
                //console.log(this.state.list_item)
            }
        })
        .catch(error => console.log(error))
    }
    render () {
        console.log(this.state.list_item)
        return (
            <React.Fragment>
                <NavigationBar {...this.props}/>
                <Container>
                    <Col xs="2"></Col>
                    <Col xs="10">
                        <ItemDisplay list_item={this.state.list_item}/>
                    </Col>
                </Container>
            </React.Fragment>
        )
    }
}

export default PageQuery;