import React, { Component } from 'react';

class OrderListOrder extends Component {
	render() {
		return (
			<div>
				<li>{this.props.order._id}</li>
			</div>
		);
	}
}

export default OrderListOrder;
