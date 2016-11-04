import expect from 'expect';
import patientReducer from '../reducer';
import { fromJS } from 'immutable';

describe('patientReducer', () => {
  it('returns the initial state', () => {
    expect(patientReducer(undefined, {})).toEqual(fromJS({}));
  });
});
