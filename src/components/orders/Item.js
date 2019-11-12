import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

class Item extends Component {
	state = {
		isEditing: false
	};

	remove = () => {
		this.props.remove(this.props.id, this.props.product.lineTotal);
	};

	render() {
		const { quantity, lineTotal, item } = this.props.product;

		return (
			<tr>
				<td>
					<span>{item.name}</span>
					<span className="float-right">
						<FontAwesomeIcon icon={faPen} className="mr-2" />
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
}

export default Item;
