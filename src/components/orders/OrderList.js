import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

const Order = (props) => {
	const { customer, delivery, createdAt, _id } = props.order;
	const orderTotal = parseFloat(props.order.orderTotal).toFixed(2);

	return (
		<tr>
			<td className="align-middle">{createdAt.substring(0, 10)}</td>
			<td className="align-middle">${orderTotal}</td>
			<td className="align-middle">{customer.name}</td>
			<td className="align-middle">
				{delivery.street}
				<br />
				{`${delivery.city}, ${delivery.state}, ${delivery.zip}`}
			</td>
			<td className="align-middle">{delivery.date.substring(0, 10)}</td>
			<td className="align-middle text-right">
				<Link to={`/orders/${_id}`} className="btn btn-primary btn-sm">
					<FontAwesomeIcon icon={faPen} />
				</Link>{' '}
				<button
					className="btn btn-danger btn-sm"
					onClick={() => {
						props.delete(props.order._id);
					}}
				>
					<FontAwesomeIcon icon={faTimes} />
				</button>
			</td>
		</tr>
	);
};

class OrderList extends Component {
	state = {
		orders: []
	};

	componentDidMount = () => {
		axios
			.get('/api/orders')
			.then((res) => {
				this.setState({ orders: res.data });
			})
			.catch((err) => console.log(err));
	};

	listOrders = () => {
		return this.state.orders.map((order) => {
			return (
				<Order
					key={order._id}
					order={order}
					id={order._id}
					delete={this.delete}
				/>
			);
		});
	};

	delete = (id) => {
		axios.delete(`/api/orders/${id}`).then((res) => console.log(res.data));

		this.setState({
			orders: this.state.orders.filter((order) => order._id !== id)
		});
	};

	render() {
		return (
			<div className="container">
				<div>
					<h1 className="d-inline-block">Orders</h1>
					<Link
						to="/orders/new"
						className="btn btn-primary btn-sm align-text-bottom ml-3"
					>
						Add New
					</Link>
				</div>

				<table className="table table-striped">
					<thead className="thead-dark">
						<tr>
							<th>Created</th>
							<th>Order Total</th>
							<th>Customer</th>
							<th>Delivery Address</th>
							<th>Delivery Date</th>
							<th />
						</tr>
					</thead>
					<tbody>{this.listOrders()}</tbody>
				</table>
			</div>
		);
	}
}

export default OrderList;
