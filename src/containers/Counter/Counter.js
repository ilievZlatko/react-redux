import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import './Counter.css';

class Counter extends Component {
	state = {
		counter: 0,
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
				<CounterControl
					label="Add 10"
					clicked={this.props.onAddCounter}
				/>
				<CounterControl
					label="Subtract 15"
					clicked={this.props.onSubtractCounter}
				/>
				<hr />
				<button onClick={this.props.onStoreResult}>Store Result</button>
				<ul
					style={{
						listStyle: 'none',
						padding: '0',
						margin: '0',
						width: '80%',
						margin: '0 auto',
					}}
				>
					{this.props.storedResults.map(strResult => (
						<li
							className="list"
							key={strResult.id}
							onClick={() =>
								this.props.onDeleteResult(strResult.id)
							}
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
		ctr: state.counter,
		storedResults: state.results,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIncrementCounter: () => dispatch({ type: 'INCREMENT' }),
		onDecrementCounter: () => dispatch({ type: 'DECREMENT' }),
		onAddCounter: () => dispatch({ type: 'ADD', value: 10 }),
		onSubtractCounter: () => dispatch({ type: 'SUBTRACT', value: 15 }),
		onStoreResult: () => dispatch({ type: 'STORE_RESULT' }),
		onDeleteResult: id => dispatch({ type: 'DELETE_RESULT', id: id }),
	};
};

// connect accepts 2 params:
//  1. which slice of the state we want in this container,
//  2. which actions to dispatch.
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
