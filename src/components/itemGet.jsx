import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Card, Button, Col, Row } from "react-bootstrap"

// using store actions
import { withRouter } from "react-router-dom"
import { connect } from "unistore/react"
import { actions } from "../store"

class ItemDisplay extends Component {
    render() {
        let token = localStorage.getItem("token");
        return (
            <Row>
                {
                    this.props.list_item.map(item => (
                        <Col xs="3">
                            <Card bg="dark" text="white" >
                                <Card.Body>
                                    <Link to={"/item/" + item.item_id}>
                                        <img src={item.photo} alt="" style={{ width:"100%"}}/>
                                    </Link>
                                    <Button variant="secondary" onClick={()=>this.props.pushToCart(token,item.item_id)}>Add to Cart</Button>

                                </Card.Body>
                                <Card.Header>{item.name}</Card.Header>
                            </Card>
                        </Col>
                    ))                      
                }
            </Row>
        )
    }
}

export default connect(actions)(withRouter(ItemDisplay));