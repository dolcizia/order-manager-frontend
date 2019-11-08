import React, { Component } from 'react';
import axios from 'axios';

const categories = [ 'Lumber', 'Drywall', 'Hardware', 'Sheet Goods' ];

export default class ProductForm extends Component {
	state = {
		name: '',
		category: categories[0],
		price: ''
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

		axios.post('/api/products/', product).then((res) => console.log(res.data));

		window.location = '/';
	};

	render() {
		return (
			<div>
				<h3>Add Product</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Name: </label>
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
							placeholder="0.00"
							required
							className="form-control"
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
