import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faBox, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
	return (
		<div className="container">
			<div className="row buttons py-3">
				<div className="col-lg-4">
					<Link to="/orders/new">
						<div className="border border-dark text-dark p-3 h-100 shadow">
							<div className="d-flex align-items-center">
								<FontAwesomeIcon icon={faFileInvoice} />
								<h3>Create Order</h3>
							</div>
						</div>
					</Link>
				</div>
				<div className="col-lg-4">
					<Link to="/products/new">
						<div className="border border-dark text-dark p-3 h-100 shadow">
							<div className="d-flex align-items-center">
								<FontAwesomeIcon icon={faBox} />
								<h3>Add Product</h3>
							</div>
						</div>
					</Link>
				</div>
				<div className="col-lg-4">
					<Link to="/customers/new">
						<div className="border border-dark text-dark p-3 h-100 shadow">
							<div className="d-flex align-items-center">
								<FontAwesomeIcon icon={faUsers} />
								<h3>Add Customer</h3>
							</div>
						</div>
					</Link>
				</div>
			</div>
			<div className="row buttons py-3">
				<div className="col-lg-4">
					<Link to="/orders">
						<div className="bg-info border border-dark text-white p-3 h-100 shadow">
							<div className="d-flex align-items-center">
								<FontAwesomeIcon icon={faFileInvoice} />
								<h3>Manage Orders</h3>
							</div>
						</div>
					</Link>
				</div>
				<div className="col-lg-4">
					<Link to="/products">
						<div className="bg-info border border-dark text-white p-3 h-100 shadow">
							<div className="d-flex align-items-center">
								<FontAwesomeIcon icon={faBox} />
								<h3>Manage Products</h3>
							</div>
						</div>
					</Link>
				</div>
				<div className="col-lg-4">
					<Link to="/customers">
						<div className="bg-info border border-dark text-white p-3 h-100 shadow">
							<div className="d-flex align-items-center">
								<FontAwesomeIcon icon={faUsers} />
								<h3>Manage Customers</h3>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
