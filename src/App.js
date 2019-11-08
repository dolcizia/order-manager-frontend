import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
// import OrderList from './components/orders/OrderList';
import OrderForm from './components/orders/OrderForm';
import ProductList from './components/products/ProductList';
import ProductForm from './components/products/ProductForm';
import CustomerList from './components/customers/CustomerList';
import CustomerForm from './components/customers/CustomerForm';

function App() {
	return (
		<div className="App container-fluid mt-5">
			<NavBar />
			{/* <Route exact path="/orders/" component={OrderList} /> */}
			<Route exact path="/orders/new" component={OrderForm} />

			<Route exact path="/products" component={ProductList} />
			<Route exact path="/products/new" component={ProductForm} />

			<Route exact path="/customers" component={CustomerList} />
			<Route exact path="/customers/new" component={CustomerForm} />
		</div>
	);
}

export default App;
