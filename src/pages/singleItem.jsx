import React, { Component } from "react"

import axios from "axios"
import NavigationBar from "../components/navbar"
import { Container, Row, Col, Button, Card } from "react-bootstrap"

// using store actions
import { withRouter } from "react-router-dom"
import { connect } from "unistore/react"
import { actions } from "../store"

class PageSingle extends Component {
    state = {
        item_data: ""
    }
    componentDidMount = () => {
        let id = this.props.match.params.id
        axios.get("http://0.0.0.0:5000/item/"+id)
        .then(response => {
            if (response.status===200) {
                this.setState({item_data:response.data})
            }
        })
        .catch(error => console.log(error))
    }

    render () {
        let token = localStorage.getItem("token");
        let item_id = this.state.item_data.item_id;
        return (
            <React.Fragment>
                <NavigationBar {...this.props}/>
                <Container>
                    <Row className="s-item-wrapper">
                        <Col xs="8">
                            <img src={this.state.item_data.photo} style={{ width:"100%"}} alt="product description"></img>
                        </Col>
                        <Col xs="4">
                            <Card border="dark">
                                <Card.Header>{this.state.item_data.name}</Card.Header>
                                <Card.Body>
                                    <Card.Text>IDR {this.state.item_data.price}</Card.Text>
                                    <Button variant="secondary" onClick={()=>this.props.pushToCart(token,item_id)}>Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default connect(actions)(withRouter(PageSingle));