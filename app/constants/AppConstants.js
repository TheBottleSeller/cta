var _getOrigin = function() {
  return (typeof(window) !== 'undefined') ? window.location.origin : Config.url;
};

var _origin = _getOrigin();

const AppConstants = {
  PATIENT_ID: 'user:1',
  WORKFLOW_API_URL: _origin + '/api/workflow',
  CHART_API_URL: _origin + '/api/chart',
};

module.exports = AppConstants;
