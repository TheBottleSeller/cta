import Async from '../utils/Async';
import AppConstants from '../constants/AppConstants';

export default class WorkflowClient {
  static listWorkflows() {
    console.log('do request');
    return Async.getPromise({
      method: 'GET',
      url: `${AppConstants.WORKFLOW_API_URL}/v0/workflows`,
    }, false, true)
    .done((listResponse) => listResponse.workflows, (error) => { throw error });
  }
}
