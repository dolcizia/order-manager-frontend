import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
	const { name, category, _id } = props.product;
	const price = parseFloat(props.product.price).toFixed(2);

	return (
		<tr>
			<td>{category}</td>
			<td>{name}</td>
			<td>{price}</td>
			<td>
				<Link to={`/products/${_id}`} className="btn btn-info btn-sm">
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
				<CSSTransition key={product._id} timeout={500} className="table-item">
					<Product
						key={product._id}
						product={product}
						id={product._id}
						delete={this.delete}
					/>
				</CSSTransition>
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
						className="btn btn-info btn-sm align-text-bottom ml-3"
					>
						Add New
					</Link>
				</div>

				<table className="table table-striped">
					<thead className="thead-dark">
						<tr>
							<th>Category</th>
							<th style={{ width: '53%' }}>Item</th>
							<th style={{ width: '15%' }}>Price</th>
							<th style={{ width: '8%' }} />
						</tr>
					</thead>
					<tbody>
						<TransitionGroup className="table-list" component={null}>
							{this.listProducts()}
						</TransitionGroup>
					</tbody>
				</table>
			</div>
		);
	}
}
