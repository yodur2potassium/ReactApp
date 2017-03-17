import { fromJS, Map } from 'immutable';
import { expect } from 'chai';

import makeStore from '../src/store';

describe('store', () => {
  it('is a Redux store with correct reducer', () => {
      const store = makeStore();
      expect(store.getState()).to.equal(Map());

      store.dispatch({
        type: 'SET_ENTRIES',
        entries: ['Matrix', '2001']
      });
      expect(store.getState()).to.equal(fromJS({
        entries: ['Matrix', '2001']
      }));
  });
});
