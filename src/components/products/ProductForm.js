import React, { Component } from 'react';
import axios from 'axios';

const categories = [ 'Lumber', 'Drywall', 'Hardware', 'Sheet Goods' ];

class EditProduct extends Component {
	state = {
		name: '',
		category: '',
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

		axios
			.post('/api/products/', product)
			.then(() => this.props.history.push('/products'));
	};

	render() {
		return (
			<div className="container m-auto">
				<h3>Add Product</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Product Name: </label>
						<input
							type="text"
							required
							className="form-control form-control-sm"
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
							className="form-control form-control-sm"
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
							placeholder="0"
							type="text"
							required
							className="form-control form-control-sm"
							value={this.state.price}
							onChange={this.onChange}
							name="price"
						/>
					</div>

					<div className="form-group">
						<input
							type="submit"
							value="Save"
							className="btn btn-success btn-sm"
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default EditProduct;
