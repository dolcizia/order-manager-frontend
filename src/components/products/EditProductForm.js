import React, { Component } from 'react';
import axios from 'axios';

const categories = [ 'Lumber', 'Drywall', 'Hardware', 'Sheet Goods' ];

export default class ProductForm extends Component {
	state = {
		name: '',
		category: '',
		price: 0
	};

	componentDidMount = () => {
		const { id } = this.props.product;
		axios
			.get(`/api/products/${id}`)
			.then((res) => {
				const { name, category, price } = res.data;
				this.setState({
					name,
					category,
					price
				});
			})
			.catch((err) => console.log(err));
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();

		const { name, category, price } = this.state;

		const product = {
			name,
			category,
			price
		};

		const { id } = this.props.product;
		axios.post(`/api/products/${id}`, product).then((res) => console.log(res.data));

		window.location = '/';
	};

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Product Name: </label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.name}
							onChange={this.onChange}
							name="name"
						/>
					</div>

					<div className="form-group">
						<label>Category: </label>
						<select
							name="category"
							required
							className="form-control"
							onChange={this.onChange}
							value={this.state.category}
						>
							{categories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>

					<div className="form-group">
						<label>Price: $</label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.price}
							onChange={this.onChange}
							name="price"
						/>
					</div>

					<div className="form-group">
						<input type="submit" value="Save" className="btn btn-success" />
					</div>
				</form>
			</div>
		);
	}
}
