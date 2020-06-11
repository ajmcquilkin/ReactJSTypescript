// This is for something like a user with a defined structure used by the route
// export interface Counter {

// }

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

export interface CounterState {
  readonly value: number
}
