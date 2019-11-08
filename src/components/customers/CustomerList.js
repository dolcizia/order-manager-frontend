import React, { Component, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import EditCustomerForm from './EditCustomerForm';

const Customer = (props) => {
	const { name, email, address, phone } = props.customer;
	const [ modal, setModal ] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<tr>
			<td>{name}</td>
			<td>{email}</td>
			<td>
				{address.street}
				<br />
				{`${address.city}, ${address.state}, ${address.zip}`}
			</td>
			<td>{phone}</td>
			<td>
				<button onClick={toggle} className="btn btn-primary">
					Edit
				</button>
				<Modal isOpen={modal} toggle={toggle} product={props.product}>
					<ModalHeader toggle={toggle}>Edit Customer</ModalHeader>
					<ModalBody>
						<EditCustomerForm customer={props} />{' '}
					</ModalBody>
				</Modal>
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
			return <Customer key={customer._id} customer={customer} id={customer._id} />;
		});
	};

	render() {
		return (
			<div className="container">
				<h1>Customers</h1>
				<Link to="/customers/new" className="btn btn-primary">
					Add New
				</Link>
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
