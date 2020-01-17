import React, { Component } from "react"

import axios from "axios"

import NavigationBar from "../components/navbar"
import ItemDetail from "../components/itemGet"

import { Container, Button } from "react-bootstrap"

class PageHome extends Component {
    state={
        list_item_popular:[],
        list_item_bargain:[]
    }
    componentDidMount = () => {
        axios.get("http://0.0.0.0:5000/item")
        .then(response =>{
            let data = response.data
            console.log(data)
            // sort by popular/purchase number
            data.sort((a,b)=> b.purchased - a.purchased)
            let data2 = data.filter((val,idx) => (
                idx < 4
            ))
            // sort by lowest price first
            data.sort((a,b)=> a.price - b.price)
            let data3 = data.filter((val,idx) => (
                idx < 4
            ))
            this.setState({list_item_popular: data2, list_item_bargain:data3})
        })
        .catch(error => console.log(error))
    }
    render () {
        return (
            <React.Fragment>
                <NavigationBar {...this.props} />
                <Container>
                    <div className="home-item-wrapper">
                        <h3>Popular Items</h3>
                        <ItemDetail list_item={this.state.list_item_popular}/>
                        <Button variant="secondary" onClick={() => this.props.history.push("/item") }>See All</Button>
                    </div>
                    <div className="home-item-wrapper">
                        <h3>Bargains</h3>
                        <ItemDetail list_item={this.state.list_item_bargain}/>
                        <Button variant="secondary" onClick={() => this.props.history.push("/item") }>See All</Button>
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

export default PageHome;