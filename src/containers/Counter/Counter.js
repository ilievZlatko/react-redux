import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import './Counter.css';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
	state = {
		counter: 0
	};

	render() {
		return (
			<div>
				<CounterOutput value={this.props.ctr} />
				<CounterControl
					label="Increment"
					clicked={this.props.onIncrementCounter}
				/>
				<CounterControl
					label="Decrement"
					clicked={this.props.onDecrementCounter}
				/>
				<CounterControl label="Add 10" clicked={this.props.onAddCounter} />
				<CounterControl
					label="Subtract 15"
					clicked={this.props.onSubtractCounter}
				/>
				<hr />
				<button onClick={() => this.props.onStoreResult(this.props.ctr)}>
					Store Result
				</button>
				<ul
					style={{
						listStyle: 'none',
						padding: '0',
						margin: '0',
						width: '80%',
						margin: '0 auto'
					}}
				>
					{this.props.storedResults.map(strResult => (
						<li
							className="list"
							key={strResult.id}
							onClick={() => this.props.onDeleteResult(strResult.id)}
						>
							{strResult.value}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ctr: state.ctr.counter,
		storedResults: state.res.results
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
		onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
		onAddCounter: () => dispatch({ type: actionTypes.ADD, value: 10 }),
		onSubtractCounter: () =>
			dispatch({ type: actionTypes.SUBTRACT, value: 15 }),
		onStoreResult: result =>
			dispatch({ type: actionTypes.STORE_RESULT, result: result }),
		onDeleteResult: id => dispatch({ type: actionTypes.DELETE_RESULT, id: id })
	};
};

// connect accepts 2 params:
//  1. which slice of the state we want in this container,
//  2. which actions to dispatch.
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
