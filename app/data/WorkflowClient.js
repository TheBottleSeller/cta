import Async from '../utils/Async';
import AppConstants from '../constants/AppConstants';

export default class WorkflowClient {
  static listWorkflows() {
    return Async.getPromise({
      method: 'GET',
      url: `${AppConstants.WORKFLOW_API_URL}/v0/workflows`,
    }, false, true);
  }
}
