import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
  // Poc, of course a number is immutable
  describe('a number', () => {
    function increment(currentState) {
      return currentState +1;
    }
    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    })
  })
  // Check list immutability
  describe('A List', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }
    it('is immutable', () => {
      let state = List.of('Casablanca', 'The Maltese Falcon');
      let nextState = addMovie(state, 'Blue velvet');
      expect(nextState).to.equal(List.of(
        'Casablanca',
        'The Maltese Falcon',
        'Blue velvet'
      ));
      expect(state).to.equal(List.of(
        'Casablanca',
        'The Maltese Falcon'
      ));
    });
  });
  // Check tree immutability
  describe('a tree', () => {
    function addMovie(currentState, movie) {
        return currentState.set(
          'movies',
          currentState.get('movies').push(movie)
        );
    }
    it('is immutable', () => {
      let state = Map({
        movies: List.of('Casablanca', '2001')
      });
      let nextState = addMovie(state, 'Trainspotting');

      expect(nextState).to.equal(Map({
        movies: List.of(
          'Casablanca',
          '2001',
          'Trainspotting'
        )
      }));
      expect(state).to.equal(Map({
        movies: List.of(
          'Casablanca',
          '2001'
        )
      }));
    });
  });

});
