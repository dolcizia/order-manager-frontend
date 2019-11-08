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

	componentDidMount = () => {
		const { id } = this.props.customer;

		axios
			.get(`/api/customers/${id}`)
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

		const { id } = this.props.customer;
		axios.post(`/api/customers/${id}`, customer).then((res) => console.log(res.data));

		window.location = '/';
	};

	render() {
		const { street, city, state, zip } = this.state.address;
		return (
			<div>
				<h3>Add Customer</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Name: </label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.name}
							onChange={this.onChange}
							name="name"
						/>
					</div>

					<div className="form-group">
						<label>Email: </label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.email}
							onChange={this.onChange}
							name="email"
						/>
					</div>

					<div className="form-group">
						<label>Street: </label>
						<input
							type="text"
							required
							className="form-control"
							value={street}
							onChange={this.handleChange('address')}
							name="street"
						/>

						<label>City: </label>
						<input
							type="text"
							required
							className="form-control"
							value={city}
							onChange={this.handleChange('address')}
							name="city"
						/>

						{/* <label>State: </label>
						<input
							type="text"
							required
							className="form-control"
							value={state}
							onChange={this.handleChange('address')}
							name="state"
						/> */}
						<label>State: </label>
						<select
							name="state"
							required
							className="form-control"
							value={state}
							onChange={this.handleChange('address')}
						>
							{this.state.states.map((state) => (
								<option key={state} value={state}>
									{state}
								</option>
							))}
						</select>

						<label>Zip: </label>
						<input
							type="text"
							required
							className="form-control"
							value={zip}
							onChange={this.handleChange('address')}
							name="zip"
						/>
					</div>

					<div className="form-group">
						<label>Phone: </label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.phone}
							onChange={this.onChange}
							name="phone"
						/>
					</div>

					<div className="form-group">
						<input type="submit" value="Save" className="btn btn-success" />
					</div>
				</form>
			</div>
		);
	}
}
