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

export default class EditCustomer extends Component {
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

	componentDidMount = () => {
		axios
			.get(`/api/customers/${this.props.match.params.id}`)
			.then((res) => {
				const { name, email, address, phone } = res.data;
				this.setState({
					name,
					email,
					address: {
						street: address.street,
						city: address.city,
						state: address.state,
						zip: address.zip
					},
					phone
				});
			})
			.catch((err) => console.log(err));
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
			.post(`/api/customers/${this.props.match.params.id}`, customer)
			.then(() => this.props.history.push('/customers'));
	};

	render() {
		const { street, city, state, zip } = this.state.address;
		return (
			<div className="container m-auto">
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Name: </label>
						<input
							placeholder="Name"
							type="text"
							required
							className="form-control form-control-sm"
							value={this.state.name}
							onChange={this.onChange}
							name="name"
						/>
					</div>

					<div className="form-group ">
						<label>Email: </label>
						<input
							placeholder="Email"
							type="text"
							required
							className="form-control form-control-sm"
							value={this.state.email}
							onChange={this.onChange}
							name="email"
						/>
					</div>

					<div className="form-group">
						<label>Street: </label>
						<input
							placeholder="Address"
							type="text"
							required
							className="form-control form-control-sm"
							value={street}
							onChange={this.handleChange('address')}
							name="street"
						/>

						<label>City: </label>
						<input
							placeholder="City"
							type="text"
							required
							className="form-control form-control-sm"
							value={city}
							onChange={this.handleChange('address')}
							name="city"
						/>

						<label>State: </label>
						<select
							name="state"
							required
							className="form-control form-control-sm"
							value={state}
							onChange={this.handleChange('address')}
						>
							{this.state.states.map((state) => (
								<option key={state} value={state}>
									{state}
								</option>
							))}
						</select>

						<label>Zip Code: </label>
						<input
							placeholder="Zip Code"
							type="text"
							required
							className="form-control form-control-sm"
							value={zip}
							onChange={this.handleChange('address')}
							name="zip"
						/>
					</div>

					<div className="form-group">
						<label>Phone: </label>
						<input
							placeholder="Phone"
							type="text"
							required
							className="form-control form-control-sm"
							value={this.state.phone}
							onChange={this.onChange}
							name="phone"
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
