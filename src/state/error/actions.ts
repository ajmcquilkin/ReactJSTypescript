import { createAction } from 'typesafe-actions';
import { ThunkActionType, RootState } from '..';

/**
 * A function to manually set an error message in the error redux store
 * @param {*} action
 * @param {*} errorMessage
 */
export function setError(actionString: string, errorMessage: string): ThunkActionType<void> {
  const setErrorAction = createAction(`${actionString}_FAILURE`)<string>();
  return (dispatch) => dispatch(setErrorAction(errorMessage));
}

/**
 * A function to manually clear an error from the redux store
 * @param {*} action
 */
export function clearError(actionString: string): ThunkActionType<void> {
  const clearErrorAction = createAction(`${actionString}_CLEAR_ERR`)<string>();
  return (dispatch) => dispatch(clearErrorAction(''));
}

/**
 * Returns a function that can be added directly to a mapStateToProps object
 * that will return the first error message associated with the array of actions (if any)
 */
export const createErrorSelector = (actionsString: string[]) => (state: RootState) => {
  // Returns the first found error message
  let test = actionsString.map((actionString: string) => state.error[actionString] || '');

  test = test.filter((message) => message !== '');
  return test[0] || '';
};
