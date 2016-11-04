import expect from 'expect';
import workflowReducer from '../reducer';
import { fromJS } from 'immutable';

describe('workflowReducer', () => {
  it('returns the initial state', () => {
    expect(workflowReducer(undefined, {})).toEqual(fromJS({}));
  });
});
