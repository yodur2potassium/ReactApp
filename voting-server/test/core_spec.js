import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Blue velvet', 'Doom');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Blue velvet', 'Doom')
      }));
    });
    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Into the blue', 'Matrix'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Into the blue', 'Matrix')
      }));
    });
  });
  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Into the blue', 'Matrix', 'Casablanca')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Into the blue', 'Matrix')
        }),
        entries: List.of('Casablanca')
      }));
    });
  });
  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Into the blue', 'Matrix')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Matrix');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Into the blue', 'Matrix'),
          tally: Map({
            'Matrix': 1
          })
        }),
        entries: List()
      }));
    });
    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Matrix', 'Arrival'),
          tally: Map({
            'Matrix': 3,
            'Arrival': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Arrival');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Matrix', 'Arrival'),
          tally: Map({
            'Matrix': 3,
            'Arrival': 3
          })
        }),
        entries: List()
      }));
    });
  });
  // end of describe App logic
});
