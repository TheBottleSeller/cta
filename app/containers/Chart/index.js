/*
 *
 * Chart
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectChart from './selectors';

export class Chart extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Chart"
          meta={[
            { name: 'description', content: 'Description of Chart' },
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = selectChart();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
