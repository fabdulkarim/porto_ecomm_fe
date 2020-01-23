import React, { Component } from "react"
import { Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

class ShowItemAdmin extends Component {
    render () {
        return (
            <React.Fragment>
                <br />
                <Button>Add Item</Button>
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