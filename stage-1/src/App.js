import React, { Component } from 'react';
import StoreFront from './Components/StoreFront/StoreFront';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';
import NavBar from './Components/NavBar/NavBar';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      showCart: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromShoppingCart = this.removeFromShoppingCart.bind(this);
    this.navigate = this.navigate.bind(this);
  }
  componentDidMount() {
    axios
      .get('https://practiceapi.devmountain.com/products/')
      .then(response => {
        this.setState({
          products: response.data
        });
      });
  }
  addToCart(item) {
    this.setState({
      cart: [...this.state.cart, item]
    });
  }
  removeFromShoppingCart(product) {
    let newShoppingCart = this.state.shoppingCart;
    newShoppingCart.splice(newShoppingCart.indexOf(product), 1);
    this.setState({
      shoppingCart: newShoppingCart
    });
    console.log(this.state.shoppingCart);
  }
  navigate(location) {
    if (location === 'cart') {
      this.setState({
        showCart: true
      });
    } else {
      this.setState({
        showCart: false
      });
    }
  }
  render() {
    const { products, showCart } = this.state;
    return (
      <div className="App">
        <NavBar navigate={this.navigate} />
        <div className="main-container">
          {showCart ? (
            <ShoppingCart
              cart={this.state.shoppingCart}
              removeFromShoppingCart={this.removeFromShoppingCart}
            />
          ) : (
            <StoreFront products={products} addToCart={this.addToCart} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
