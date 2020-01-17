import React, { Component } from "react"
import { Col, Row } from "react-bootstrap"

class ShowOrder extends Component {
    render() {
        let sum = 0;
        for(const i in this.props.items) {
            sum += this.props.items[i].price * this.props.qtys[i];
        }
        return (
            <Col>
                {
                    this.props.items.map((item,idx) => (
                        <Row>
                            <Col xs="4">{item.name}</Col>
                            <Col xs="4">
                                {this.props.qtys[idx]} x {item.price}
                            </Col>
                            <Col xs="4">
                                <span>{this.props.qtys[idx] * item.price}</span>
                            </Col>
                        </Row>
                    ))
                }
                <Row>
                    <Col xs={{ span:4, offset:8 }}>
                        <h5>Total: </h5>
                        <span>IDR {sum}</span>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default ShowOrder;