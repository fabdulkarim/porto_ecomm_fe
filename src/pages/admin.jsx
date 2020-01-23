import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import { Redirect } from "react-router-dom"

import NavigationBar from "../components/navbar"

class PageAdmin extends Component {
    render() {
        if (localStorage.getItem("isAdmin")!=="true") {
            return <Redirect to={{ pathname:"/" }}/>
        } else return (
            <React.Fragment>
                <NavigationBar />
                <Row>
                    <Row>
                        <h4>Items</h4>
                        {/* placeholder user */}
                    </Row>
                    <Row>
                        <h4>Users</h4>
                        {/* placeholder item  */}
                    </Row>
                    <Row>
                        <h4>Transactions</h4>
                        {/* placeholder order? */}
                    </Row>
                </Row>
            </React.Fragment>
        )
    }
}

export default PageAdmin;