import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faUsers, faBox, faHome } from '@fortawesome/free-solid-svg-icons';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

export default class NavBar extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		return (
			<Navbar
				dark
				expand="md"
				className="fixed-top NavBar bg-dark navbar-dark py-0"
			>
				<Nav navbar>
					<NavItem>
						<Link to="/" className="nav-link">
							<FontAwesomeIcon icon={faHome} /> Home
						</Link>
					</NavItem>
				</Nav>

				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem className="link mr-2">
							<Link to="/orders" className="nav-link">
								<FontAwesomeIcon icon={faFileInvoice} /> Orders
							</Link>
						</NavItem>
						<NavItem className="link mr-2">
							<Link to="/products" className="nav-link">
								<FontAwesomeIcon icon={faBox} /> Products
							</Link>
						</NavItem>
						<NavItem className="link mr-2">
							<Link to="/customers" className="nav-link">
								<FontAwesomeIcon icon={faUsers} /> Customers
							</Link>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}
