import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
	const { name, category, _id } = props.product;
	const price = parseFloat(props.product.price).toFixed(2);

	return (
		<tr>
			<td className="align-middle">{category}</td>
			<td className="align-middle">{name}</td>
			<td className="align-middle">{price}</td>
			<td className="align-middle text-right">
				<Link to={`/products/${_id}`} className="btn btn-primary btn-sm">
					<FontAwesomeIcon icon={faPen} />
				</Link>{' '}
				<button
					className="btn btn-danger btn-sm"
					onClick={() => {
						props.delete(props.product._id);
					}}
				>
					<FontAwesomeIcon icon={faTimes} />
				</button>
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
			return (
				<Product
					key={product._id}
					product={product}
					id={product._id}
					delete={this.delete}
				/>
			);
		});
	};

	delete = (id) => {
		axios.delete(`/api/products/${id}`).then((res) => console.log(res.data));

		this.setState({
			products: this.state.products.filter((product) => product._id !== id)
		});
	};

	render() {
		return (
			<div className="container">
				<div>
					<h1 className="d-inline-block">Products</h1>
					<Link
						to="/products/new"
						className="btn btn-primary btn-sm align-text-bottom ml-3"
					>
						Add New
					</Link>
				</div>

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
