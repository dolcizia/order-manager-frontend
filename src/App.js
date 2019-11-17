import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import OrderList from './components/orders/OrderList';
import OrderForm from './components/orders/OrderForm';
import EditOrder from './components/orders/EditOrder';
import ProductList from './components/products/ProductList';
import ProductForm from './components/products/ProductForm';
import EditProduct from './components/products/EditProduct';
import CustomerList from './components/customers/CustomerList';
import CustomerForm from './components/customers/CustomerForm';
import EditCustomer from './components/customers/EditCustomer';

function App() {
	return (
		<div className="App container-fluid mt-5 pt-5">
			<NavBar />
			<Switch>
				<Route exact path="/" component={Home} />

				<Route exact path="/orders/" component={OrderList} />
				<Route exact path="/orders/new" component={OrderForm} />
				<Route exact path="/orders/:id" component={EditOrder} />

				<Route exact path="/products" component={ProductList} />
				<Route exact path="/products/new" component={ProductForm} />
				<Route exact path="/products/:id" component={EditProduct} />

				<Route exact path="/customers" component={CustomerList} />
				<Route exact path="/customers/new" component={CustomerForm} />
				<Route exact path="/customers/:id" component={EditCustomer} />
			</Switch>
		</div>
	);
}

export default App;
