import { RootState } from '..';

/**
 * Returns a function that can be added directly to a mapStateToProps object
 * that will determine if any of the passed action strings are loading
 */
export const createLoadingSelector = (actions: string[]) => (state: RootState) => actions.some((action: string) => state.loading[action] === true);

export default createLoadingSelector;
