import React, { Component, useState } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import EditProductForm from './EditProductForm';

const Product = (props) => {
	const { name, category, price } = props.product;
	const [ modal, setModal ] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<tr>
			<td>{category}</td>
			<td>{name}</td>
			<td>{price}</td>
			<td>
				<button onClick={toggle} className="btn btn-primary">
					Edit
				</button>
				<Modal isOpen={modal} toggle={toggle} product={props.product}>
					<ModalHeader toggle={toggle}>{`Edit ${name}`}</ModalHeader>
					<ModalBody>
						<EditProductForm product={props} />
					</ModalBody>
				</Modal>
			</td>
		</tr>
	);
};

export default class ProductList extends Component {
	state = {
		products: []
	};

	componentDidMount = () => {
		axios
			.get('/api/products')
			.then((res) => {
				this.setState({ products: res.data });
			})
			.catch((err) => console.log(err));
	};

	listProducts = () => {
		return this.state.products.map((product) => {
			return <Product key={product._id} product={product} id={product._id} />;
		});
	};

	render() {
		return (
			<div className="container">
				<h1>Products</h1>
				<table className="table table-striped">
					<thead className="thead-dark">
						<tr>
							<th>Category</th>
							<th>Item</th>
							<th>Price</th>
							<th />
						</tr>
					</thead>
					<tbody>{this.listProducts()}</tbody>
				</table>
			</div>
		);
	}
}
