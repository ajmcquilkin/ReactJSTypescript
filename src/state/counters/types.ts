// Inspiration: https://github.com/resir014/react-redux-typescript-example/blob/master/src/store/teams/types.ts

/**
 * A currently-unused interface that dictates any object shapes required by the reducer and actions
 * An example of this would be specifying the shape of a user object
 */
export interface Counter {

}

/**
 * An enum that contains all potential actions handled by the current reducer
 */
export enum CounterActionTypes {
  COUNTER_INCREMENT_REQUEST = '@@counters/COUNTER_INCREMENT_REQUEST',
  COUNTER_INCREMENT_SUCCESS = '@@counters/COUNTER_INCREMENT_SUCCESS',
  COUNTER_INCREMENT_FAILURE = '@@counters/COUNTER_INCREMENT_FAILURE',

  COUNTER_DECREMENT_REQUEST = '@@counters/COUNTER_DECREMENT_REQUEST',
  COUNTER_DECREMENT_SUCCESS = '@@counters/COUNTER_DECREMENT_SUCCESS',
  COUNTER_DECREMENT_FAILURE = '@@counters/COUNTER_DECREMENT_FAILURE',

  COUNTER_SET_REQUEST = '@@counters/COUNTER_SET_REQUEST',
  COUNTER_SET_SUCCESS = '@@counters/COUNTER_SET_SUCCESS',
  COUNTER_SET_FAILURE = '@@counters/COUNTER_SET_FAILURE',
}

/**
 * An interface that contains the shape of the state that the current reducer handles
 */
export interface CounterState {
  readonly value: number
}
