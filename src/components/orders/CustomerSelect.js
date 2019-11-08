import React, { Component } from 'react';

export default class CustomerSelect extends Component {
	render() {
		const customers = this.props.customers.map((customer) => {
			return (
				<option
					key={customer._id}
					id={customer._id}
					value={customer.name}
					email={customer.email}
					phone={customer.phone}
					street={customer.address.street}
					city={customer.address.city}
					state={customer.address.state}
					zip={customer.address.zip}
				>
					{customer.name}
				</option>
			);
		});
		return (
			<div className="px-2">
				<div className="d-flex justify-content-between no-wrap">
					<select
						value={this.props.state.customer.name}
						className="form-control form-control-sm w-100"
						onChange={(e) =>
							this.props.onCustomerChange(e.target[e.target.selectedIndex])}
					>
						<option value="blank">Select Customer</option>
						{customers}
					</select>
					<button
						className="btn btn-success btn-sm"
						style={{ marginLeft: 10 }}
						onClick={this.props.toggleCustomer}
					>
						Save
					</button>
				</div>
			</div>
		);
	}
}
