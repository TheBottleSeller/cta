import Async from '../utils/Async';
import AppConstants from '../constants/AppConstants';

export default class ChartClient {
  static checkout(repoId : string, changeSha : ?string) {
    let body = {
      chart_repo_id: repoId,
    }
    if (changeSha) {
      body.change_sha = changeSha;
    }
    console.log('do request');
    return Async.getPromise({
      method: 'POST',
      url: `${AppConstants.CHART_API_URL}/v0/chart`,
      body: JSON.stringify(body),
    }, false, true)
    .done((checkoutResponse) => checkoutResponse.chart, (error) => { throw error });
  }

  static log(repoId : string, count : ?string) {
    let params = {
      chart_repo_id: repoId,
    }
    if (count) {
      params.count = count;
    }
    console.log('do request');
    return Async.getPromise({
      method: 'POST',
      url: `${AppConstants.CHART_API_URL}/v0/chart`,
      qs: params,
    }, false, true)
    .done((logResponse) => logResponse.changes, (error) => { throw error });
  }
}
