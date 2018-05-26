import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/';
import { Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import NoLeagues from './NoLeagues';
import RequireAuth from '../auth/RequireAuth';


function SidebarHeader(props) {
	return (
		<li className="uk-nav-header">{props.title}</li>
	)
}

function SidebarLink(props) {
	return [
		<span className="uk-margin-small-right uk-icon">{props.icon}</span>,
		<span className="uk-text-middle">{props.title}</span>
	]
}

class Dashboard extends Component {

	constructor(props) {
		super(props);
	}

	renderContent() {
		if (this.props.content) {
			return (
				<p>{this.props.content}</p>
			);
		}
	}

	render() {
		const leagueId = 1;
		return (
			<div className="uk-grid-small uk-flex-center" uk-grid="true">
				<div className="uk-card uk-card-default uk-card-body uk-width-1-4@s">
					<ul className="uk-nav-default uk-nav-parent-icon" uk-nav="multiple: true">
						<SidebarHeader title='Menu' />
						<li className="uk-active">
							<Link to='/dashboard'>
								<SidebarLink title='Home' />
							</Link>
						</li>
						<li className="uk-parent">
							<Link to='/settings'>
								<SidebarLink title='Settings' />
							</Link>
							<ul className="uk-nav-sub">
								<li><Link to='/account'>Sub item</Link></li>
								<li><Link to="/account">Sub item</Link></li>
							</ul>
						</li>
						<SidebarHeader title='Lega' />
						<li className="uk-parent">
							<Link to={'/leagues/' + leagueId + '/competitions'}>
								<SidebarLink title='Competitions' />
							</Link>
							<ul className="uk-nav-sub">
								<li className="">
									<a href="#">
										<span uk-icon="icon: plus" className="uk-margin-small-right uk-icon"></span>
										<span className="uk-text-middle">New</span>
									</a>
									<a href="#">
										<span uk-icon="icon: calendar" className="uk-margin-small-right uk-icon"></span>
										<span className="uk-text-middle">Calendar</span>
									</a>
								</li>
							</ul>
						</li>

						<li className="">
							<a href="#">
								<span uk-icon="icon: users" className="uk-margin-small-right uk-icon"></span>
								<span className="uk-text-middle">Teams</span>
							</a>
						</li>
					</ul>
				</div>
				<Route path='/welcome' component={RequireAuth(NoLeagues)} />
			</div >
		);
	}
}

function mapStateToProps(state) {
	return { content: state.auth.content };
}

export default connect(mapStateToProps, actions)(Dashboard);