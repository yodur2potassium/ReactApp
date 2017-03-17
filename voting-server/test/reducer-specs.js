import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Matrix']};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Matrix']
    }));
  });
  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Matrix', '2001']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Matrix', '2001']
      },
      entries: []
    }));
  });
  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Matrix', '2001']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Matrix'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Matrix', '2001'],
        tally: {'Matrix': 1}
      },
      entries: []
    }));
  });
  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Matrix', '2001']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Matrix', '2001']
    }));
  });
  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Matrix', '2001']},
      {type: 'NEXT'},
      {type: 'VOTE', entry:'2001'},
      {type: 'VOTE', entry:'Matrix'},
      {type: 'VOTE', entry:'2001'},
      {type: 'NEXT'}
    ]
    const finalState = actions.reduce(reducer, Map());
    expect(finalState).to.equal(fromJS({
      winner: '2001'
    }));
  });
});
