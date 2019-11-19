import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import ProductSelect from '../products/ProductSelect';

class Item extends Component {
	state = {
		isEditing: false,
		itemToEdit: {},
		allProducts: this.props.allProducts
	};

	toggleOrderItem = () => {
		const { product } = this.props;
		const { item } = product;
		this.setState({
			isEditing: !this.state.isEditing,
			itemToEdit: {
				orderItem: this.props.id,
				id: item._id,
				name: item.name,
				price: item.price,
				quantity: product.quantity,
				lineTotal: product.lineTotal
			},
			prevLineTotal: product.lineTotal
		});
	};

	onProductChange = (newProduct) => {
		const newTotal =
			parseFloat(newProduct.getAttribute('price')) * this.state.itemToEdit.quantity;
		this.setState({
			itemToEdit: {
				...this.state.itemToEdit,
				id: newProduct.getAttribute('id'),
				name: newProduct.value,
				price: parseFloat(newProduct.getAttribute('price')),
				lineTotal: newTotal
			}
		});
	};

	onQtyChange = (e) => {
		const newTotal = this.state.itemToEdit.price * e.target.value;
		this.setState({
			itemToEdit: {
				...this.state.itemToEdit,
				quantity: parseFloat(e.target.value),
				lineTotal: newTotal
			}
		});
	};

	saveItemEdit = () => {
		this.props.update(this.state.itemToEdit, this.state.prevLineTotal);
		this.toggleOrderItem();
	};

	cancelItemEdit = () => {
		this.setState({
			itemToEdit: {},
			prevLineTotal: null
		});
		this.toggleOrderItem();
	};

	remove = () => {
		this.props.remove(this.props.id, this.props.product.lineTotal);
	};

	render() {
		const { quantity, lineTotal, item } = this.props.product;

		let row;

		if (this.state.isEditing) {
			row = (
				<tr>
					<td>
						<div className="d-flex">
							<ProductSelect
								products={this.props.allProducts}
								onProductChange={this.onProductChange}
								current={this.props.product.item.name}
							/>
							<div>
								<button
									onClick={this.saveItemEdit}
									className="btn btn-link p-0 text-success"
								>
									<small>Save</small>
								</button>{' '}
								<button
									onClick={this.cancelItemEdit}
									className="btn btn-link p-0 text-muted"
								>
									<small>Cancel</small>
								</button>
							</div>
						</div>
					</td>
					<td className="text-right">
						{parseFloat(this.state.itemToEdit.price).toFixed(2)}
					</td>
					<td className="text-center">
						<input
							placeholder="Qty"
							type="number"
							className="form-control form-control-sm"
							name="quantity"
							min="1"
							defaultValue={this.props.product.quantity}
							onChange={this.onQtyChange}
							style={{ textAlign: 'center' }}
						/>
					</td>
					<td className="text-right">
						{parseFloat(this.state.itemToEdit.lineTotal).toFixed(2)}
					</td>
				</tr>
			);
		} else {
			row = (
				<tr>
					<td>
						<span>{item.name}</span>
						<span className="float-right">
							<button
								onClick={this.toggleOrderItem}
								className="btn btn-link p-0"
							>
								<FontAwesomeIcon icon={faPen} className="mr-2" />
							</button>

							<button onClick={this.remove} className="btn btn-link p-0">
								<FontAwesomeIcon icon={faTimes} />
							</button>
						</span>
					</td>
					<td className="text-right">{parseFloat(item.price).toFixed(2)}</td>
					<td className="text-center">{quantity}</td>
					<td className="text-right">{parseFloat(lineTotal).toFixed(2)}</td>
				</tr>
			);
		}

		return row;
	}
}

export default Item;
