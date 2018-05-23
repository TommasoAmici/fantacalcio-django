import React, { Component } from 'react';

class HomeSideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className="uk-card uk-card-default uk-card-body uk-width-1-4@s">
				<ul className="uk-nav-default uk-nav-parent-icon" uk-nav="multiple: true">
					<li className="uk-nav-header">Menu</li>
					<li className="uk-active">
						<a href="#">
							<span uk-icon="icon: home" className="uk-margin-small-right uk-icon"></span>
							<span className="uk-text-middle">Home</span>
						</a>
					</li>
					<li className="uk-parent">
						<a href="#">
							<span uk-icon="icon: settings" className="uk-margin-small-right uk-icon"></span>
							<span className="uk-text-middle">Settings</span>
						</a>
						<ul className="uk-nav-sub">
							<li><a href="#">Sub item</a></li>
							<li><a href="#">Sub item</a></li>
						</ul>
					</li>
					<li className="uk-nav-header">Lega</li>
					<li className="uk-parent">
						<a href="#">
							<span className="uk-margin-small-right uk-icon uk-icon-image"></span>
							<span className="uk-text-middle">Competitions</span>
						</a>
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
		)
	}
}


export default HomeSideBar;