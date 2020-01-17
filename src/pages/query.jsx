import React, { Component } from "react"
import axios from "axios"

import NavigationBar from "../components/navbar"
import { Container, Col, Button, Card } from "react-bootstrap"

//using/checking store for search
import { withRouter } from "react-router-dom"
import { connect } from "unistore/react"
import { actions } from "../store"

import ItemDisplay from "../components/itemGet"

class PageQuery extends Component {
    state = {
        list_item: [],
        search: "",
        list_item_filtered:[]
    }

    navbarHandleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        let regSearch = this.state.search
        if (regSearch !== "") {
            const regex = RegExp(regSearch,"i");
            let filter = this.state.list_item.filter(item =>{
                return regex.test(item)
            })
            this.setState({list_item_filtered:filter})
        } else {
            this.setState({list_item_filtered:this.state.list_item})
        }
    }

    componentDidMount = () => {
        axios.get("http://0.0.0.0:5000/item")
        .then(response => {            
            if (response.status===200) {
                this.setState({list_item:response.data})
                //console.log(this.state.list_item)

                let storeSearch = this.props.search
                if (storeSearch !== "") {
                    const regex = RegExp(storeSearch,"i");
                    let filter = this.state.list_item.filter(item =>{
                        return regex.test(item)
                    })
                    this.setState({list_item_filtered:filter})
                } else {
                    this.setState({list_item_filtered:this.state.list_item})
                }
            }
        })
        .catch(error => console.log(error))
    }
    render () {
        console.log(this.state.list_item)
        return (
            <React.Fragment>
                <NavigationBar {...this.props} search={this.state.search} isQuery={true} handleSearch={this.navbarHandleChange} />
                <Container>
                    <Col xs="12" md="2"></Col>
                    <Col xs="12" md="10" className="ml-auto">
                        <ItemDisplay list_item={this.state.list_item_filtered}/>
                    </Col>
                </Container>
            </React.Fragment>
        )
    }
}

export default connect("search",actions)(withRouter(PageQuery));