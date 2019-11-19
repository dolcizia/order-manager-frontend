import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
				<Link to={`/customers/${_id}`} className="btn btn-info btn-sm">
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
				<CSSTransition key={customer._id} timeout={500} className="table-item">
					<Customer
						key={customer._id}
						customer={customer}
						id={customer._id}
						delete={this.delete}
					/>
				</CSSTransition>
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
						className="btn btn-info btn-sm align-text-bottom ml-3"
					>
						Add New
					</Link>
				</div>

				<table className="table table-striped">
					<thead className="thead-dark">
						<tr>
							<th>Name</th>
							<th style={{ width: '30.75%' }}>Email</th>
							<th style={{ width: '22.5%' }}>Address</th>
							<th style={{ width: '14%' }}>Phone</th>
							<th style={{ width: '8%' }} />
						</tr>
					</thead>
					<tbody>
						<TransitionGroup className="table-list" component={null}>
							{this.listCustomers()}
						</TransitionGroup>
					</tbody>
				</table>
			</div>
		);
	}
}
