import React, { Component } from "react"
import { Row, Card, Col } from "react-bootstrap";

class CartDisplay extends Component {
    render() {
        // console.log(this.props.list_cart.length)
        // console.log(this.props.item_detail.length)
        return (
            <div>
                {
                    ((this.props.list_cart.length === 0)||(this.props.list_cart.length !== this.props.item_detail.length)) ? (
                        <Row>
                            <h5>You Appeared to have No Item in Your Cart</h5>
                        </Row>
                    ) : this.props.list_cart.map(
                        (cart,index) => (
                            <Row>
                                <Card style={{ width:"100%", padding:"5%" }}>
                                    <Row>
                                        <Col xs="4">
                                            <Card.Title>
                                                {this.props.item_detail[index].name}
                                            </Card.Title>
                                            <Card.Body>
                                                <ul className="list-unstyled">
                                                    <li><h6>Total Price: IDR {this.props.item_detail[index].price * this.props.qty[index]}</h6></li>
                                                    <li>Price: IDR {this.props.item_detail[index].price}</li>
                                                    <li>
                                                        <form>
                                                            <label>
                                                                QTY: 
                                                                <input name={index} type="number" value={this.props.qty[index]} onChange={(e)=>this.props.handle(e)} />
                                                            </label>
                                                        </form> 
                                                    </li>
                                                </ul>
                                            </Card.Body>
                                        </Col>
                                        <Col xs="4">
                                            <img src={this.props.item_detail[index].photo} style={{ width:"80%" }} alt="item th" />
                                        </Col>
                                        <Col xs="4">
                                            <span className="ml-auto align-top" onClick={()=>this.props.rm(cart.id)}>remove this item</span>
                                        </Col>
                                    </Row>
                                </Card>
                            </Row>
                        )
                    )
                }
            </div>
        )
    }
}

export default CartDisplay;