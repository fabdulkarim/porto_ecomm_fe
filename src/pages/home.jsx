import React, { Component } from "react"

import axios from "axios"

import NavigationBar from "../components/navbar"
import ItemDetail from "../components/itemGet"

import { Container, Button } from "react-bootstrap"

class PageHome extends Component {
    state={
        list_item_reduced:[]
    }
    componentDidMount = () => {
        axios.get("http://0.0.0.0:5000/item")
        .then(response =>{
            let data = response.data
            let data2 = data.filter((val,idx) => (
                idx < 4
            ))
            this.setState({list_item_reduced: data2})
        })
        .catch(error => console.log(error))
    }
    render () {
        return (
            <React.Fragment>
                <NavigationBar {...this.props} />
                <Container>
                    <div className="home-item-wrapper">
                        <h3>All Items</h3>
                        <ItemDetail list_item={this.state.list_item_reduced}/>
                        <Button variant="secondary" onClick={() => this.props.history.push("/item") }>See All</Button>
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

export default PageHome;