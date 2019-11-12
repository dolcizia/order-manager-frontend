import React, { Component } from 'react';
import axios from 'axios';

const categories = [ 'Lumber', 'Drywall', 'Hardware', 'Sheet Goods' ];

class EditProduct extends Component {
	state = {
		name: '',
		category: '',
		price: 0
	};

	componentDidMount = () => {
		axios
			.get(`/api/products/${this.props.match.params.id}`)
			.then((res) => {
				const { name, category } = res.data;
				const price = parseFloat(res.data.price).toFixed(2);
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

		axios
			.post(`/api/products/${this.props.match.params.id}`, product)
			.then(() => this.props.history.push('/products'));
	};

	render() {
		return (
			<div className="container m-auto">
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
