import React, { Component } from 'react';
import axios from 'axios';
import CustomerSelect from '../customers/CustomerSelect';
import DeliveryForm from './DeliveryForm';
import OrderItems from './OrderItems';

class OrderForm extends Component {
	state = {
		toggleCustomer: false,
		toggleDelivery: false,
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
		itemToAdd: {},
		orderTotal: '',
		isLoading: true
	};

	componentDidMount = () => {
		axios.get(`/api/orders/${this.props.match.params.id}`).then((res) => {
			const { orderItems, customer, delivery, orderTotal } = res.data;
			const { name, email, address, phone, _id } = customer;
			const { street, city, state, zip } = address;

			this.setState({
				customer: {
					_id,
					name,
					email,
					phone,
					street,
					city,
					state,
					zip
				},
				delivery: {
					delStreet: delivery.street,
					delCity: delivery.city,
					delState: delivery.state,
					delZip: delivery.zip,
					date: new Date(delivery.date)
				},
				orderItems,
				orderTotal
			});
		});

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
		setTimeout(() => {
			this.setState({
				isLoading: false
			});
		}, 2000);
	};

	// -------- Customer Logic -------- //
	// Option selected in customer dropdown
	onCustomerChange = (newCustomer) => {
		this.setState({
			customer: {
				name: newCustomer.value,
				_id: newCustomer.id,
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

	// -------- Delivery Logic -------- //
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

	// -------- Add Item Logic -------- //
	// Product selected in dropdown
	onProductChange = (newProduct) => {
		this.setState({
			itemToAdd: {
				...this.state.itemToAdd,
				item: newProduct.getAttribute('id'),
				name: newProduct.value,
				price: parseFloat(newProduct.getAttribute('price'))
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
		const { item, name, quantity } = this.state.itemToAdd;
		const price = parseFloat(this.state.itemToAdd.price);
		const lineTotal = parseFloat(price * quantity);
		const orderTotal = this.state.orderTotal + lineTotal;
		this.setState({
			// Move object from itemToAdd into orderItems array
			orderItems: [
				...this.state.orderItems,
				{
					_id: item,
					item: {
						_id: item,
						name,
						price
					},
					quantity,
					lineTotal
				}
			],
			itemToAdd: {
				...this.state.itemToAdd,
				item: '',
				name: '',
				price: '',
				quantity: ''
			},
			orderTotal
		});
	};

	// -------- Order Item Logic -------- //
	removeItem = (id, lineTotal) => {
		const newTotal = this.state.orderTotal - lineTotal;
		this.setState({
			orderItems: this.state.orderItems.filter((item) => item._id !== id),
			orderTotal: newTotal
		});
	};

	updateItem = (id, updatedItem) => {
		const updatedItems = this.state.orderItems.map((item) => {
			if (item.id === id) {
				return { ...item, item: updatedItem };
			}
			return item;
		});

		this.setState({
			orderItems: updatedItems
		});
	};

	// -------- Order Submit Logic -------- //
	updateOrder = () => {
		if (this.state.orderItems) {
			const { customer, delivery, orderItems, orderTotal } = this.state;

			const order = {
				customer: {
					_id: customer._id
				},
				delivery: {
					street: delivery.delStreet,
					city: delivery.delCity,
					state: delivery.delState,
					zip: delivery.delZip,
					date: delivery.date
				},
				orderItems,
				orderTotal
			};

			console.log(order);

			axios
				.post(`/api/orders/${this.props.match.params.id}`, order)
				.then(() => this.props.history.push('/orders'));
		}
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
				<h1>Edit Order</h1>
				<div className="row m-0" style={{ height: 200 }}>
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
							{!this.state.isLoading ? (
								<div className="billingAddress px-2">
									{billingAddress}
								</div>
							) : (
								<div
									className="spinner-border text-success d-flex m-auto"
									role="status"
								>
									<span className="sr-only">Loading...</span>
								</div>
							)}
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
								{!this.state.isLoading ? (
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
								) : (
									<div
										className="spinner-border text-success d-flex m-auto"
										role="status"
									>
										<span className="sr-only">Loading...</span>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
				<div className="row m-0">
					<OrderItems
						onProductChange={this.onProductChange}
						products={this.state.products}
						removeItem={this.removeItem}
						updateItem={this.updateItem}
						addItem={this.addItem}
						current={this.state.itemToAdd}
						orderItems={this.state.orderItems}
						grabQty={this.grabQty}
						total={this.state.orderTotal}
						loading={this.state.isLoading}
					/>
				</div>
				<button
					className="btn btn-success btn-lg float-right mt-3"
					onClick={this.updateOrder}
				>
					Update Order
				</button>
			</div>
		);
	}
}

export default OrderForm;
