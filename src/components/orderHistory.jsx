import React, { Component } from "react"
import { Row, Card } from "react-bootstrap";

class OrderDisplay extends Component {
    render() {
        return (
            <div>
                {
                    (this.props.list_order.length === 0) ? (
                        <Row>
                            <h5>You Appeared to have No Order History</h5>
                        </Row>
                    ) : this.props.list_order.map(
                        order => (
                            <Row>
                                <Card style={{ width:"100%", padding:"5%" }}>
                                    <Card.Title>Order Number: {order.id}</Card.Title>
                                    <Card.Body>
                                        <ul className="list-unstyled">
                                            <li><h6>Order Status: {order.transaksi}</h6></li>
                                            <li>Total Price: {order.total_price}</li>
                                            <li>Shipping Address: </li>
                                            <li>{order.alamatkirim}</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Row>
                        )
                    )
                }
            </div>
        )
    }
}

export default OrderDisplay;