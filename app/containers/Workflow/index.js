/*
 *
 * Workflow
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectWorkflow from './selectors';
import TaskList from '../../components/TaskList/index';
import Timeline from '../../components/Timeline/index';

export class Workflow extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Workflow"
          meta={[
            { name: 'description', content: 'Description of Workflow' },
          ]}
        />
        <TaskList dispatch={this.props.dispatch} />
        <Timeline dispatch={this.props.dispatch} />
      </div>
    );
  }
}

Workflow.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = selectWorkflow();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
