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

export class Index extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
