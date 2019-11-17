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
			<div className="container m-auto border border-dark p-0 w-50">
				<h3 className="bg-dark text-light p-2">Add Product</h3>
				<form onSubmit={this.onSubmit} className="p-2">
					<div className="form-group">
						<input
							placeholder="Product Name"
							type="text"
							required
							className="form-control form-control-sm"
							value={this.state.name}
							onChange={this.onChange}
							name="name"
						/>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
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

						<div className="form-group col-md-6">
							<div className="input-group-prepend">
								<div className="input-group-text rounded-0 px-2 py-0">
									$
								</div>
								<input
									placeholder="0.00"
									type="text"
									required
									className="form-control form-control-sm"
									value={this.state.price}
									onChange={this.onChange}
									name="price"
								/>
							</div>
						</div>
					</div>
					<div className="form-group m-0">
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
