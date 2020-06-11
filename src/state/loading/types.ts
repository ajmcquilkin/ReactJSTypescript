/**
 * Can hold any action name and whether or not it is currently loading
 */
export interface LoadingState {
  [key: string]: boolean | null;
}
