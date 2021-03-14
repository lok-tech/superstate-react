import React from 'react';

import SuperState, { ObserverAdapter } from 'lok-superstate'

class Component extends React.Component {
	constructor(props) {
		super(props);

		this.observerAdapter = new ObserverAdapter(this.initState(), this.update.bind(this));
		this.state = SuperState.get(this.initState());
	}

	initState() {
		return {};
	}

	update(update) {
		super.setState(update);
	}

	setState(update, callback) {
		super.setState(update, () => {
			SuperState.update(update, this.observerAdapter);

			if (callback) callback();
		});
	}

	componentDidMount() {
		SuperState.attach(this.observerAdapter);
	}

	componentWillUnmount() {
		SuperState.detach(this.observerAdapter);
	}
}

export default Component;