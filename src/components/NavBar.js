import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

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
				<Link to="/" className="navbar-brand">
					Home
				</Link>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem className="link mr-2">
							<Link to="/orders" className="nav-link">
								Orders
							</Link>
						</NavItem>
						<NavItem className="link mr-2">
							<NavLink href="/Products">Products</NavLink>
						</NavItem>
						<NavItem className="link mr-2">
							<Link to="/customers" className="nav-link">
								Customers
							</Link>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}
