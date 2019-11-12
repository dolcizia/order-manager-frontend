import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

const Customer = (props) => {
	const { name, email, address, phone, _id } = props.customer;

	return (
		<tr>
			<td className="align-middle">{name}</td>
			<td className="align-middle">{email}</td>
			<td className="align-middle">
				{address.street}
				<br />
				{`${address.city}, ${address.state}, ${address.zip}`}
			</td>
			<td className="align-middle">{phone}</td>
			<td className="align-middle text-right">
				<Link to={`/customers/${_id}`} className="btn btn-primary btn-sm">
					<FontAwesomeIcon icon={faPen} />
				</Link>{' '}
				<button
					className="btn btn-danger btn-sm"
					onClick={() => {
						props.delete(props.customer._id);
					}}
				>
					<FontAwesomeIcon icon={faTimes} />
				</button>
			</td>
		</tr>
	);
};

export default class CustomerList extends Component {
	state = {
		customers: []
	};

	componentDidMount = () => {
		axios
			.get('/api/customers')
			.then((res) => {
				this.setState({ customers: res.data });
			})
			.catch((err) => console.log(err));
	};

	listCustomers = () => {
		return this.state.customers.map((customer) => {
			return (
				<Customer
					key={customer._id}
					customer={customer}
					id={customer._id}
					delete={this.delete}
				/>
			);
		});
	};

	delete = (id) => {
		axios.delete(`/api/customers/${id}`).then((res) => console.log(res.data));

		this.setState({
			customers: this.state.customers.filter((customer) => customer._id !== id)
		});
	};

	render() {
		return (
			<div className="container">
				<div>
					<h1 className="d-inline-block">Customers</h1>
					<Link
						to="/customers/new"
						className="btn btn-primary btn-sm align-text-bottom ml-3"
					>
						Add New
					</Link>
				</div>

				<table className="table table-striped">
					<thead className="thead-dark">
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Address</th>
							<th>Phone</th>
							<th />
						</tr>
					</thead>
					<tbody>{this.listCustomers()}</tbody>
				</table>
			</div>
		);
	}
}
