import React, { Component } from 'react';
import axios from 'axios';

const stateCodes = [
	'AL',
	'AK',
	'AZ',
	'AR',
	'CA',
	'CO',
	'CT',
	'DC',
	'DE',
	'FL',
	'GA',
	'HI',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MD',
	'MA',
	'MI',
	'MN',
	'MS',
	'MO',
	'MT',
	'NE',
	'NV',
	'NH',
	'NJ',
	'NM',
	'NY',
	'NC',
	'ND',
	'OH',
	'OK',
	'OR',
	'PA',
	'RI',
	'SC',
	'SD',
	'TN',
	'TX',
	'UT',
	'VT',
	'VA',
	'WA',
	'WV',
	'WI',
	'WY'
];

export default class CustomerForm extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			city: '',
			state: '',
			zip: ''
		},
		phone: '',
		states: stateCodes
	};

	handleChange = (obj) => (e) => {
		let x = this.state[obj];

		x[e.target.name] = e.target.value;
		this.setState({ [obj]: x });
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();

		const { name, email, phone, address } = this.state;

		const customer = {
			name,
			email,
			address,
			phone
		};

		axios
			.post('/api/customers/', customer)
			.then(() => this.props.history.push('/customers'));
	};

	render() {
		return (
			<div className="container m-auto border border-dark p-0 w-50">
				<h3 className="bg-dark text-light p-2">Add Customer</h3>
				<form onSubmit={this.onSubmit} className="p-2">
					<div className="form-group">
						<input
							placeholder="Name"
							type="text"
							required
							className="form-control form-control-sm"
							onChange={this.onChange}
							name="name"
						/>
					</div>

					<div className="form-row">
						<div className="form-group col-md-6">
							<input
								placeholder="Email"
								type="text"
								required
								className="form-control form-control-sm"
								onChange={this.onChange}
								name="email"
							/>
						</div>
						<div className="form-group col-md-6">
							<input
								placeholder="Phone"
								type="text"
								required
								className="form-control form-control-sm"
								onChange={this.onChange}
								name="phone"
							/>
						</div>
					</div>

					<div className="form-group">
						<input
							placeholder="Address"
							type="text"
							required
							className="form-control form-control-sm"
							onChange={this.handleChange('address')}
							name="street"
						/>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<input
								placeholder="City"
								type="text"
								required
								className="form-control form-control-sm"
								onChange={this.handleChange('address')}
								name="city"
							/>
						</div>
						<div className="form-group col-md-2">
							<select
								name="state"
								required
								className="form-control form-control-sm"
								onChange={this.handleChange('address')}
							>
								{this.state.states.map((state) => (
									<option key={state} value={state}>
										{state}
									</option>
								))}
							</select>
						</div>
						<div className="form-group col-md-4">
							<input
								placeholder="Zip Code"
								type="text"
								required
								className="form-control form-control-sm"
								onChange={this.handleChange('address')}
								name="zip"
							/>
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
