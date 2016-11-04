import expect from 'expect';
import patientBaseballCardReducer from '../reducer';
import { fromJS } from 'immutable';

describe('patientBaseballCardReducer', () => {
  it('returns the initial state', () => {
    expect(patientBaseballCardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
