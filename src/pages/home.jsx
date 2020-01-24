import React, { Component } from "react"

import axios from "axios"

import NavigationBar from "../components/navbar"
import ItemDetail from "../components/itemGet"

import { Container, Button } from "react-bootstrap"

class PageHome extends Component {
    state={
        list_item_popular:[],
        list_item_bargain:[],
        list_item_newest:[],
        list_item_carousel:[]
    }
    componentDidMount = () => {
        axios.get("http://0.0.0.0:5000/item")
        .then(response =>{
            let data = response.data
            console.log(data)
            // sort by popular/purchase number
            data.sort((a,b)=> b.purchased - a.purchased)
            let dataPopular = data.filter((val,idx) => (
                idx < 4
            ))
            // sort by lowest price first
            data.sort((a,b)=> a.price - b.price)
            let dataCheap = data.filter((val,idx) => (
                idx < 4
            ))
            // sort by new/id reverse
            data.sort((a,b)=> b.item_id - a.item_id)
            let dataNew = data.filter((val,idx) => (
                idx < 4
            ))
            // let dataCarousel = [dataPopular[0], dataCheap[0], dataNew[0]]
            this.setState({list_item_popular: dataPopular, list_item_bargain:dataCheap, list_item_newest:dataNew})
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
                    <div className="home-item-wrapper">
                        <h3>New Arrival</h3>
                        <ItemDetail list_item={this.state.list_item_newest}/>
                        <Button variant="secondary" onClick={() => this.props.history.push("/item") }>See All</Button>
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

export default PageHome;