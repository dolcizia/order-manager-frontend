import React, { Component } from 'react';
import ProductSelect from './ProductSelect';
import Item from './Item';

export default class OrderItems extends Component {
	state = {
		quantity: '',
		product: ''
	};

	onProductChange = (newProduct) => {
		this.setState({
			product: newProduct.value
		});
		this.props.onProductChange(newProduct);
	};

	handleChange = (e) => {
		this.props.grabQty(e.target.value);
		this.setState({
			quantity: e.target.value
		});
	};

	handleClick = (e) => {
		if (this.state.product !== '' && this.state.quantity !== '') {
			this.props.addItem();
			this.setState({
				quantity: ''
			});
		}
	};

	render() {
		const items = this.props.orderItems.map((item) => {
			return (
				<Item product={item} key={item.id} allProducts={this.props.products} />
			);
		});
		return (
			<div className="orderItems mt-3 border border-dark col-12 p-0">
				<div className="addedItems">
					<table className="table table-bordered table-hover table-sm m-0">
						<thead className="thead-dark">
							<tr>
								<th className="border-dark p-2">Item</th>
								<th className="border-dark p-2">Price</th>
								<th className="border-dark p-2">Quantity</th>
								<th className="border-dark p-2">Total</th>
							</tr>
						</thead>
						<tbody>{items}</tbody>
					</table>
				</div>
				<div className="productSelect d-flex p-2">
					<ProductSelect
						products={this.props.products}
						onProductChange={this.onProductChange}
						current={this.props.current.name}
					/>
					<div className="mr-2">
						<input
							placeholder="Qty"
							type="number"
							className="form-control form-control-sm"
							name="quantity"
							value={this.state.quantity}
							onChange={this.handleChange}
						/>
					</div>
					<div className="mr-2">
						<button
							className="btn btn-success btn-sm"
							onClick={this.handleClick}
						>
							Add
						</button>
					</div>
				</div>
			</div>
		);
	}
}
