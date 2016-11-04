import expect from 'expect';
import chartReducer from '../reducer';
import { fromJS } from 'immutable';

describe('chartReducer', () => {
  it('returns the initial state', () => {
    expect(chartReducer(undefined, {})).toEqual(fromJS({}));
  });
});
