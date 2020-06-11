# ReactJS Typescript Starter Template

**Author:** Adam McQuilkin  
**Created:** 6/4/2020  
**Description:** A starter Typescript ReactJS app built with Webpack, Babel, and ESLint

## Main Features

* `react-scripts` support
* Integrated `redux` and `react-router` support
* Automatic `loading` and `error` reducer handling

## Installation

This project requires **NodeJS** and **Yarn/npm**. To install the required packages, run the following command

```bash
yarn
```

OR  

```bash
npm install
```

## Usage

### Dev Server

This app uses `webpack-dev-server` and `react-scripts`. To run the app, run the following command:

```bash
yarn start
```

OR  

```bash
npm run start
```

### Building

This app compiles using `webpack` and `tsc`. To build a production version of the app, run the following command:

```bash
yarn build
```

OR

```bash
npm run build
```

## Structure

Below is the basic structure of the template, in generic terms. This template differentiates components and containers, where containers are directly connected to the redux store and where components ([presentational components](https://redux.js.org/basics/example)) only recieve data through props.

The `store` directory holds all redux handlers, including actions, reducers, and types. Each subdirectory of the `store` directory holds the required files to implement a key in the main redux store object. The current template holds a simple `counter` implementation that supports incrementing, decrementing, and setting the counter. The app also supports error and loading reducing by default.

```text
-- src
    |-- components
    |   |-- component
    |   |   |-- component.tsx
    |   |   |-- component.ts
    |   |   `-- component.scss
    |   `-- App.tsx
    ├── containters
    |   `-- container
    |      |-- container.tsx
    |      |-- container.ts
    |      `-- container.scss
    ├── store
    |   |-- error
    |   |   |-- actions.ts
    |   |   |-- reducer.ts
    |   |   `-- types.ts
    |   ├── loading
    |   |   |-- actions.ts
    |   |   |-- reducer.ts
    |   |   `-- types.ts
    |   |-- reduxRoute
    |   |   |-- actions.ts
    |   |   |-- reducer.ts
    |   |   `-- types.ts
    |   `-- index.ts
    `-- index.ts
```

### React Redux

This app is enabled natively with [react-redux](https://www.npmjs.com/package/react-redux), which allows the site to manage and update a top-level state separate from any ReactJS components. This modification is done with a [standard redux setup](https://redux.js.org/introduction/getting-started), and type-safe actions are created for use in this setup with the [typesafe-actions](https://www.npmjs.com/package/typesafe-actions) package.

#### Top-level

This redux state is created in the `src/index.ts` file, which contains calls to configure and implement this redux state.

This template natively supports [Redux Dev Tools](https://github.com/reduxjs/redux-devtools), which allows for the viewing of this redux state in-browser. If this is enabled, the browser extension will add a function field to the Javascript `window` object with the key `__REDUX_DEVTOOLS_EXTENSION_COMPOSE__`. This key holds reference to an alternate redux [compose](https://redux.js.org/api/compose/) function, which can then be used to configure the store to be accessable by the extension.

Since Typescipt doensn't allow for the insertion of undefined keys into an object defined by an interface (`window` is defined with the TS `interface Window`), the window must be temporarily typed as any, which overrides any connected interfaces or types. This allows for `composeEnhancers` to call the new `compose` function (if present) or to call the redux-standard `compose` function if not.

```ts
const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
```

To create the redux store, the redux `createStore` method must be called. This requires importing the `rootReducer` function from `store/index.ts` file as well as importing the required `routerMiddleware` function, which will be discussed below in the **React Router** section.

```ts
const store = createStore(
  createRootReducer(history), {},
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
  ),
);
```

This redux store is then included in the react app using a `<Provider />` component from the [react-redux](https://www.npmjs.com/package/react-redux) package. This allows access to the `connect` function in the same package, which connects containers to the redux store.

```html
ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('main'),
);
```

#### "state" Directory

Besides the creation of the redux store, all other redux-related functionality is located in the `src/store` directory. This allows for a cleaner final folder structure in the main `src` directory as well as for easy access to relevant files with in each sub-route in the store.

the `store/index.ts` file calls the `combineReducers` function (shown below), which combines all app reducers into one and is used in creating the main app state (see **Top Level**). The interface for these reducers is shown below, and connects the state of each reducer (`key: string`) to its shape (`value: interface | type`).

This shape is configurable, and more reducers can be added in a similar fashion.

```ts
export interface RootState {
  count: CounterState,
  loading: LoadingState,
  error: ErrorState,
  router: RouterState,
}
```

Calling the `combineReducers` function with the required reducer shape (`RootState`, defined above) will create the final `rootReducer` to be used in creating the app's state. As a note this is a function due to the nature of the `router` reducer, which is explained more below. This reducer is created as a function call and requires a `BrowserHistory` object, which is passed into the `createRootReducer` function.

As a note: this must conform to the `RootState` shape unless a reducer is marked as optional (`demoReducer?: DemoReducerShape`).

```ts
const createRootReducer = (history: History) => combineReducers<RootState>({
  count: countReducer,
  loading: loadingReducer,
  error: errorReducer,
  router: connectRouter(history),
});
```

This file also defines the shape of a [redux thunk](https://www.npmjs.com/package/redux-thunk) async action, which can be used to modify the store state. This is used as a type definition in `*/actions.ts` files. This assumes a (configurable) `void` return type from this action, and assumes that actions will have `string` types.

```ts
export type ThunkActionType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<String>>;
```

#### Sub-directory

Each sub-directory within the `state` directory holds all files required to manage the branch of the main redux state (i.e. the `state/counters` directory manages the `counters` key within the redux state and any associated data). This is done through the use of three files:

1) **actions.ts** - This file holds actions and action creators
2) **reducers.ts** - This file manages the reducing of the specified state
3) **types.ts** - This file holds type definitions needed by the other two files

As an example this section will use the `counter` subdirectory and more specifically the *set counter* functionality.

##### Actions

The `actions.ts` file holds functions that create and dispatch [redux actions](https://redux.js.org/basics/actions/), which can use `redux-thunk` to load data from asynchronous data sources.

Each piece of functionality requires three action creators:

1) **ACTION_NAME_REQUEST** - Dispatched when an action request begins
2) **ACTION_NAME_SUCCESS** - Dispatched when an action request succeeds
3) **ACTION_NAME_FAILURE** - Dispatched when an action request fails

These action creators are shown below for the set counter functionality in the `counter` subdirectory.

```ts
const setRequest = () => action(CounterActionTypes.COUNTER_SET_REQUEST);
const setSuccess = (value: number) => action(CounterActionTypes.COUNTER_SET_SUCCESS, value);
const setFailure = (message: string) => action(CounterActionTypes.COUNTER_SET_FAILURE, message);
```

Below is an example of how these action creators can be used to create asynchronous action-based functionality. The `setCounter` function takes a value, waits for a simulated API request to complete, and dispatches the appropriate action to the redux store.

As a note, `exampleAPISuccess()` is a helper function that delays then resolves a returned promise, to simulate a real API response delay.

```ts
export function setCounter(value: number): ThunkActionType<void> {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(setRequest());

    // Demo API, replace with axios call
    exampleAPISuccess().then(() => {
      dispatch(setSuccess(value));
      resolve();
    }).catch((error: Error) => {
      console.error(error);
      dispatch(setFailure("Couldn't decrement counter"));
      reject();
    });
  });
}
```

##### Reducer

The `reducer.ts` file processes the actions dispatched within the `counters/actions.ts` file, and updates the state as required by each action.

Below is the initial state for the created reducer, which has a shape defined by the `CounterState` interface declared in the `types.ts` file (see below). This `initialState` is used to define the initial state of the `counters` portion of the main redux state. [Reference](https://redux.js.org/recipes/usage-with-typescript/)

```ts
const initialState: CounterState = {
  value: 0,
};
```

The `reducer` defined in the `reducer.ts` file is a [standard redux reducer](https://redux.js.org/basics/reducers) with shape defined by `CounterState` (in `counters/types.ts`). This function takes an action and updates the redux state based on the received action.

As a note, reducers should only handle request success actions, since the `error` and `loading` reducers will handle `...REQUEST` and `...FAILURE` dispatches.

Additionally, assigning an object is equally as valid as object spread operations when updating [immutable](https://redux.js.org/faq/immutable-data/) state (see below).

```ts
const reducer: Reducer<CounterState> = (state = initialState, action) => {
  switch (action.type) {
    // ...
    case CounterActionTypes.COUNTER_SET_SUCCESS: {
      return { ...state, value: action.value };
    }
    // ...
    default: {
      return state;
    }
  }
};
```

```ts
return Object.assign({}, state, { value: newValue });
// OR
return ({ ...state, value: newValue });
```

##### Types

Supporting both the `actions.ts` and the `reducer.ts` files are they types defined in `counters/types.ts`, which hold the required interfaces and types to ensure static typing can be used.

Three main types of exports are used within the `types.ts` file:

1) **Working Object Shapes** - The shape of any objects being modified by the reducer (e.g. a `user` object)
2) **Action Types** - The action types supported by the reducer and actions
3) **State Shape** - The shape of the state the reducer manages

Below is an example of a *working object shape*, which is currently unused in the counters example. Since the counters reducer doesn't need to store any objects of type `Counter` this interface is unused, but if the reducer were to need to store a user object (for example), this interface would define the required shape of that object.

```ts
// Unused for counter
export interface Counter {

}

// Example working object shape interface
export interface User {
  firstName: string;
  lastName: string;
  birthday: Date;
  age: number;
  // ...
}
```

Below is the `enum` used to declare the supported action types for the counters reducer. Each action has a `REQUEST`, `SUCCESS`, and `FAILURE` state, which are required for the `error` and `loading` reducers (see below).

As a note `enum` keys are replaced with their corresponding value at compile time, and since the `ThunkAction` type requires a `string` for the action type, this `enum` must hold values of type `string`.

```ts
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
```

The final type defined in `types.ts` is the *state shape*. This is used to define what keys and values are able to be added to the `InitialState` of the reduder, as well as the values the reducer can modify. Since redux state is immutable this interface requires its values to be `readonly`, which blocks the direct modification of the specified key.

```ts
export interface CounterState {
  readonly value: number
}
```

### React Router

This app is configured to support [react-router-dom](https://www.npmjs.com/package/react-router-dom) natively, which is modified with [conneced-react-router](https://www.npmjs.com/package/connected-react-router). React router allows for URL switching within the browser's history without reloading, and `connected-react-router` allows for this history to be stored within the redux state. This means that containers can access the current URL location with the `connect` function even if they are outside the scope of the connected router.

This history is created in the `src/index.ts` file and passed to the main `<App />` component as shown below.

```ts
const history = createBrowserHistory();
```

```html
<!-- ... -->
  <App history={history} />
<!-- ... -->
```

Within the `<App />` component in `components/app` the normal `<BrowserRouter>...</BrowserRouter>` tags are replaced with the following tsx, which takes history as a prop of the `<App />` component and passes it to the connected router. This component is functionally identical to `BrowserRouter` except for how the `history` prop is managed.

```html
<ConnectedRouter history={history}>
  <!-- ... -->
</ConnectedRouter>
```

### Redux Loading Functionality

Checking whether or not action requests are loading can easily become cumbersome and messy, requiring significant overhead and added complexity. This app addresses this through a custom `loading` reducer structure, which automatically processes all dispatches and tracks whether the given request is loading or has completed.

#### Loading Reducer

This tracking is done through regex matching of action types against the possible states of those dispatches. Requests can be in three states:

1) Sent
2) Succeeded
3) Failed

If a request has been sent and hasn't succeeded or failed, this means that it is currently loading. If the request has not been sent or if it has been sent and has succeeded or failed, it is no longer loading.

This is the basic premise of the `loading` reducer, and it checks this using regex checks of action types. This regex has two capture groups, one for the action name and one for the action state. When an action dispatch is received the action is then processed, and the loading state of that action is then placed as a `boolean` value under the `string` action type key.

```ts
const reducer: Reducer<LoadingState> = (state = initialState, action) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return { ...state, [requestName]: requestState === 'REQUEST' && requestState !== 'CLEAR_ERR' };
};
```

#### Loading Selector

This loading information can be accessed directly from redux's `connect` function, but this is not always the best option since a given request may or may not have a loading state, for example. To address this, the `loading/actions.ts` file contains a `createLoadingSelector` function which allows for the easy extraction of the loading state of action dispatches.

As a note: this function supports an array of actions to watch. This means if any of the selected action types to watch are loading (e.g. [`@@counters/COUNTER_SET`] and **not** [`@@counters/COUNTER_SET_REQUEST`], [`@@counters/COUNTER_SET_SUCCESS`], or [`@@counters/COUNTER_SET_FAILURE`]), then the reducer will return that the selection is still loading. Otherwise it will return that the selection is not loading.

```ts
export const createLoadingSelector = (actions: string[]) => (state: RootState) => actions.some((action: string) => state.loading[action] === true);
```

A (minimal) typical use case of this function is shown below. The `isLoading` boolean is then passed into the props of the connected function and can be accessed through [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the props based on the props interface.

```ts
const watchedActions: string[] = ['@@counters/COUNTER_INCREMENT', '@@counters/COUNTER_DECREMENT'];
const loadingSelector = createLoadingSelector(watchedActions);

const welcomeMapStateToProps = (state: { isLoading: boolean }) => ({
  // ...
  isLoading: loadingSelector(state),
});
```

### Redux Error Functionality

The same problem exists with holding and tracking error messages as exists with tracking loading, since holding error messages in state or even each reducer state makes for significant overhead. This app contains functionality very similar to the `loading` reducer which automatically pulls error messages from `..._FAILURE` action dispatches and saves them to the `error` redux reducer.

#### Error Reducer

The matching process for error reducing is funcionally identical to the `loading` reducer except for the fact that the action expects both a type and a string payload in the action. This string payload represents a string error message, and is required to track the errors.

As a note: if an error message is not passed, the message is set to the default "*action name* action failed".

```ts
const reducer: Reducer<ErrorState, { type: string, payload: string }> = (state = initialState, action) => {
  const matches = /(.*)_(REQUEST|FAILURE|CLEAR_ERR)/.exec(action.type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return { ...state, [requestName]: requestState === 'FAILURE' ? action.payload || `${requestName} action failed` : '' };
};
```

#### Error Selector

Selecting errors works identically to selecting loading, except for the fact that instead of returning a `boolean` for the loading state of the selection it will return the first error message the selector finds associated with an action type.

```ts
export const createErrorSelector = (actionsString: string[]) => (state: RootState) => {
  let test = actionsString.map((actionString: string) => state.error[actionString] || '');

  test = test.filter((message) => message !== '');
  return test[0] || '';
};
```

A (minimal) typical use case of this function is shown below. The `errorMessage` string is then passed into the props of the connected function and can be accessed through [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the props based on the props interface.

```ts
const watchedActions: string[] = ['@@counters/COUNTER_INCREMENT', '@@counters/COUNTER_DECREMENT'];
const errorSelector = createErrorSelector(watchedActions);

const welcomeMapStateToProps = (state: { errorMessage: string }) => ({
  // ...
  errorMessage: errorSelector(state),
});
```
