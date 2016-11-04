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
import {
  listWorkflowsRequested,
} from './actions';

export class Index extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    console.log('hello');
    setTimeout(() => {
      this.props.dispatch(listWorkflowsRequested())
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

const mapStateToProps = selectIndex();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
