/*
 *
 * Index
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectIndex from './selectors';
import NavBar from '../../components/NavBar/index';
import AppConstants from '../../constants/AppConstants';
import {
  LIST_WORKFLOWS_REQUESTED,
  CHECKOUT_REQUESTED,
} from './constants';

export class Index extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    console.log('hello');
    setTimeout(() => {
      this.props.dispatch({ type: LIST_WORKFLOWS_REQUESTED })
    }, 0);
    // This gives us the current state of the patient profile.
    setTimeout(() => {
      this.props.dispatch({ type: CHECKOUT_REQUESTED, repoId: AppConstants.PATIENT_ID })
    }, 0);
  }

  render() {
    return (
      <div>
        <Helmet
          title="Index"
          meta={[
            { name: 'description', content: 'Description of Index' },
          ]}
        />
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
}

const mapStateToProps = selectIndex();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
