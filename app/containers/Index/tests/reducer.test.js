import expect from 'expect';
import indexReducer from '../reducer';
import { fromJS } from 'immutable';

describe('indexReducer', () => {
  it('returns the initial state', () => {
    expect(indexReducer(undefined, {})).toEqual(fromJS({}));
  });
});
