import {Map, fromJs} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Matrix']};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJs({
      entries: ['Matrix']
    }));
  });
})
