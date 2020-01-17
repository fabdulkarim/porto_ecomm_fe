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
            <React.Fragment>
                <br />
                <Row>
                    {
                        this.props.list_item.map(item => (
                            <Col xs="12" md="3">
                                <Card bg="dark" text="white" >
                                    <Card.Body>
                                        <Link to={"/item/" + item.item_id}>
                                            <img src={item.photo} alt="" style={{ width:"100%"}}/>
                                        </Link>
                                        <div className="d-flex justify-content-center">
                                            <Button variant="secondary" onClick={()=>this.props.pushToCart(token,item.item_id)}>Add to Cart</Button>
                                        </div>
                                    </Card.Body>
                                    <Card.Header>{item.name}</Card.Header>
                                </Card>
                            </Col>
                        ))                      
                    }
                    <br />
                </Row>
            </React.Fragment>
        )
    }
}

export default connect(actions)(withRouter(ItemDisplay));