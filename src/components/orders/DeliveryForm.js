import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

export default class DeliveryInfo extends Component {
	render() {
		return (
			<div className="px-2">
				<div className="d-flex justify-content-between no-wrap">
					<div className="delForm w-100 pr-2">
						<div className="form-group">
							<input
								placeholder="Street"
								type="text"
								value={this.props.state.delStreet}
								className="form-control form-control-sm"
								name="delStreet"
								onChange={this.props.onAddressChange('delivery')}
							/>
						</div>
						<div className="form-row">
							<div className="form-group col-md-6">
								<input
									placeholder="City"
									type="text"
									value={this.props.state.delCity}
									className="form-control form-control-sm"
									name="delCity"
									onChange={this.props.onAddressChange('delivery')}
								/>
							</div>
							<div className="form-group col-md-2">
								<select
									name="delState"
									value={this.props.state.delState}
									required
									className="form-control form-control-sm"
									onChange={this.props.onAddressChange('delivery')}
								>
									{stateCodes.map((state) => (
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
									value={this.props.state.delZip}
									className="form-control form-control-sm"
									name="delZip"
									onChange={this.props.onAddressChange('delivery')}
								/>
							</div>
						</div>
					</div>

					<div className="delDate pr-2">
						<DatePicker
							selected={this.props.selected}
							onChange={this.props.onChangeDate}
							className="form-control-sm form-control picker"
						/>
					</div>
					<div className="delButton">
						<button
							className="btn btn-success btn-sm"
							onClick={this.props.toggleDelivery}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		);
	}
}
