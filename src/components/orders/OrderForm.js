import React, { Component } from 'react';
import axios from 'axios';
import CustomerSelect from './CustomerSelect';
import DeliveryForm from './DeliveryForm';
import OrderItems from './OrderItems';

class OrderForm extends Component {
	state = {
		toggleCustomer: true,
		toggleDelivery: true,
		customers: [],
		products: [],
		customer: {},
		delivery: {
			delStreet: '',
			delCity: '',
			delState: '',
			delZip: '',
			date: new Date()
		},
		orderItems: [],
		itemToAdd: {}
	};

	componentDidMount = () => {
		// Get list of customers from database
		axios.get('/api/customers').then((res) => {
			if (res.data.length > 0) {
				// Map to customers array in state
				this.setState({
					customers: res.data.map((customer) => customer)
				});
			}
		});

		// Get products from database
		axios.get('/api/products').then((res) => {
			if (res.data.length > 0) {
				// Map products to array in state
				this.setState({
					products: res.data.map((product) => product)
				});
			}
		});
	};

	// Option selected in customer dropdown
	onCustomerChange = (newCustomer) => {
		this.setState({
			customer: {
				name: newCustomer.value,
				id: newCustomer.id,
				email: newCustomer.getAttribute('email'),
				phone: newCustomer.getAttribute('phone'),
				street: newCustomer.getAttribute('street'),
				city: newCustomer.getAttribute('city'),
				state: newCustomer.getAttribute('state'),
				zip: newCustomer.getAttribute('zip')
			}
		});
	};

	// When customer edit or save button clicked
	toggleCustomerForm = () => {
		if (this.state.customer.name) {
			if (this.state.customer.name !== 'blank') {
				this.setState({
					toggleCustomer: !this.state.toggleCustomer
				});
			}
		}
	};

	// Handle delivery address form
	onAddressChange = (obj) => (e) => {
		let x = this.state[obj];

		x[e.target.name] = e.target.value;
		this.setState({ [obj]: x });
	};

	// Date picker
	onChangeDate = (date) => {
		this.setState({
			delivery: {
				...this.state.delivery,
				date
			}
		});
	};

	// When delivery save or edit button is clicked
	toggleDeliveryForm = () => {
		if (
			this.state.delivery.delStreet !== '' &&
			this.state.delivery.delCity !== '' &&
			this.state.delivery.delState !== '' &&
			this.state.delivery.delZip
		) {
			this.setState({
				toggleDelivery: !this.state.toggleDelivery
			});
		}
	};

	// Product selected in dropdown
	onProductChange = (newProduct) => {
		this.setState({
			itemToAdd: {
				...this.state.itemToAdd,
				id: newProduct.getAttribute('id'),
				name: newProduct.value,
				price: newProduct.getAttribute('price')
			}
		});
	};

	// Handle quantity entered
	grabQty = (qty) => {
		this.setState({
			itemToAdd: {
				...this.state.itemToAdd,
				quantity: qty
			}
		});
	};

	// On product add button click
	addItem = (e) => {
		const { id, name, price, quantity } = this.state.itemToAdd;
		const lineTotal = price * quantity;
		this.setState({
			// Move object from itemToAdd into orderItems array
			orderItems: [
				...this.state.orderItems,
				{
					id,
					name,
					price,
					quantity,
					lineTotal
				}
			],
			itemToAdd: {
				...this.state.itemToAdd,
				id: '',
				name: '',
				price: '',
				quantity: ''
			}
		});
	};

	createOrder = () => {
		const { customer, delivery, orderItems } = this.state;

		const order = {
			customer: customer.id,
			delivery: {
				street: delivery.delStreet,
				city: delivery.delCity,
				state: delivery.delState,
				zip: delivery.delZip,
				date: delivery.date
			},
			orderItems
		};

		console.log(order);

		axios.post('/api/orders', order).then((res) => console.log(res.data));
	};

	removeItem = (id) => {
		this.setState({
			orderItems: this.state.orderItems.filter((item) => item.id !== id)
		});
	};

	updateItem = (id, updatedItem) => {
		const updatedItems = this.state.orderItems.map((item) => {
			if (item.id === id) {
				return { ...item, task: updatedItem };
			}
			return item;
		});

		this.setState({
			orderItems: updatedItems
		});
	};

	render() {
		const { name, email, phone, street, city, state, zip } = this.state.customer;
		const billingAddress = (
			<div className="address position-relative">
				<h5 className="m-0">{name}</h5>
				<p className="m-0">{street}</p>
				<p>
					{city}, {state}, {zip}
				</p>
				<p className="m-0">{email}</p>
				<p className="m-0">{phone}</p>
				<button
					className="btn btn-outline-secondary btn-sm position-absolute"
					style={{ top: 0, right: 0 }}
					onClick={this.toggleCustomerForm}
				>
					Edit
				</button>
			</div>
		);

		const { delStreet, delCity, delState, delZip, date } = this.state.delivery;
		const deliveryAddress = (
			<div className="address">
				<h5>Delivery Address</h5>
				<p className="m-0">{delStreet}</p>
				<p>
					{delCity}, {delState}, {delZip}
				</p>
			</div>
		);

		return (
			<div className="container orderForm">
				<h1>Add Order</h1>
				<div className="row" style={{ height: 200 }}>
					{this.state.toggleCustomer ? (
						<div className="customerInfo col-md-4 border border-dark p-0">
							<h3 className="bg-dark text-light p-2">Customer</h3>

							<CustomerSelect
								className="customerSelect"
								customers={this.state.customers}
								onCustomerChange={this.onCustomerChange}
								toggleCustomer={this.toggleCustomerForm}
								state={this.state}
							/>
						</div>
					) : (
						<div className="customerInfo col-md-4 border border-dark p-0">
							<h3 className="bg-dark text-light p-2">Customer</h3>
							<div className="billingAddress px-2">{billingAddress}</div>
						</div>
					)}
					{this.state.toggleDelivery ? (
						<div className="deliveryInfo col border border-dark ml-md-3 mt-3 mt-md-0 p-0">
							<h3 className="bg-dark text-light p-2">
								Delivery Information
							</h3>

							<DeliveryForm
								onChangeDate={this.onChangeDate}
								onAddressChange={this.onAddressChange}
								selected={this.state.delivery.date}
								toggleDelivery={this.toggleDeliveryForm}
								state={this.state.delivery}
							/>
						</div>
					) : (
						<div className="deliveryInfo col border border-dark ml-md-3 mt-3 mt-md-0 p-0">
							<h3 className="bg-dark text-light p-2">
								Delivery Information
							</h3>
							<div className="px-2">
								<div className="d-flex position-relative">
									<div className="deliveryAddress mr-5">
										{deliveryAddress}
									</div>
									<div className="deliveryDate">
										<h5>Scheduled Date</h5>
										<p
											className="display-4 text-success font-weight-bold"
											style={{ lineHeight: 0.8 }}
										>
											{date.toString().substring(0, 10)}
										</p>
									</div>
									<button
										className="btn btn-outline-secondary btn-sm position-absolute"
										onClick={this.toggleDeliveryForm}
										style={{ top: 0, right: 0 }}
									>
										Edit
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="row">
					<OrderItems
						onProductChange={this.onProductChange}
						products={this.state.products}
						removeItem={this.removeItem}
						updateItem={this.updateItem}
						addItem={this.addItem}
						current={this.state.itemToAdd}
						orderItems={this.state.orderItems}
						grabQty={this.grabQty}
					/>
				</div>
				<button className="btn btn-success btn-lg" onClick={this.createOrder}>
					Create Order
				</button>
			</div>
		);
	}
}

export default OrderForm;
