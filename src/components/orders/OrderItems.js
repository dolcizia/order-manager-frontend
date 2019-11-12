import React, { Component } from 'react';
import ProductSelect from '../products/ProductSelect';
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

	removeItem = (id, lineTotal) => {
		this.props.removeItem(id, lineTotal);
	};

	render() {
		const items = this.props.orderItems.map((orderItem) => {
			return (
				<Item
					id={orderItem._id}
					product={orderItem}
					key={orderItem.item._id}
					allProducts={this.props.products}
					remove={this.removeItem}
				/>
			);
		});

		const total = parseFloat(this.props.total).toFixed(2);

		return (
			<div className="orderItems mt-3 border border-dark col-12 p-0">
				<div className="addedItems">
					<table className="table table-bordered table-sm m-0">
						<thead className="thead-dark">
							<tr>
								<th className="border-dark p-2">Item</th>
								<th className="border-dark p-2 text-center">Price</th>
								<th className="border-dark p-2 text-center">Quantity</th>
								<th className="border-dark p-2 text-center">Total</th>
							</tr>
						</thead>
						<tbody>{items}</tbody>
					</table>
				</div>
				<div className="productSelect d-flex justify-content-between p-2">
					<div className="d-flex">
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
					<div>
						<h4 className="float-right text-success">{total}</h4>
					</div>
				</div>
			</div>
		);
	}
}
