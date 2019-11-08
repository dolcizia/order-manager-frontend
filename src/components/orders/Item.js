import React, { Component } from 'react';
import ProductSelect from './ProductSelect';

class Item extends Component {
	state = {
		isEditing: false
	};

	toggleEdit = (e) => {
		this.setState({ isEditing: true });
	};
	render() {
		const { name, price, quantity, lineTotal } = this.props.product;
		return (
			<tr>
				<td onClick={this.toggleEdit}>
					{this.state.isEditing ? (
						<ProductSelect products={this.props.allProducts} />
					) : (
						name
					)}
				</td>
				<td>{price}</td>
				<td>{quantity}</td>
				<td>{lineTotal}</td>
			</tr>
		);
	}
}

export default Item;
