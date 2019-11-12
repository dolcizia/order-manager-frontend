import React, { Component } from 'react';

export default class ItemSelect extends Component {
	render() {
		const products = this.props.products.map((product) => {
			return (
				<option
					key={product._id}
					id={product._id}
					value={product.name}
					price={product.price}
				>
					{product.name}
				</option>
			);
		});
		return (
			<div className="mr-2">
				<select
					className="form-control form-control-sm mr-2"
					value={this.props.current}
					onChange={(e) =>
						this.props.onProductChange(e.target[e.target.selectedIndex])}
				>
					<option value="blank">Select Product</option>
					{products}
				</select>
			</div>
		);
	}
}
