import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionCreators from '../../store/actions/index';
import './Counter.css';

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
                <CounterControl
                    label="Add 10"
                    clicked={this.props.onAddCounter}
                />
                <CounterControl
                    label="Subtract 15"
                    clicked={this.props.onSubtractCounter}
                />
                <hr />
                <button
                    onClick={() => this.props.onStoreResult(this.props.ctr)}
                >
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
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: () => dispatch(actionCreators.add(10)),
        onSubtractCounter: () => dispatch(actionCreators.subtract(15)),
        onStoreResult: result => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: id => dispatch(actionCreators.deleteResult(id))
    };
};

// connect accepts 2 params:
//  1. which slice of the state we want in this container,
//  2. which actions to dispatch.
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
