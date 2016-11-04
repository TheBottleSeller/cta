import lodash from 'lodash';
import isOk from 'is-ok';
import Q from 'q';
import request from 'request';
import safeParse from 'safe-json-parse/tuple';

// Just a little bit of shared code
// I stole this from autocomplete/src/js/app/data/CloudsearchClient.js - isaac@
// TODO refactor this into a proper solution

var Async = {

  getPromise: function(options, allowAnyStatus, transformJson) {
    // default, super basic.
    options.headers = lodash.extend({
      'content-type': 'application/json',
      accept: 'application/json, text/javascript, */*; q=0.01'
    }, options.headers)

    options.timeout = 10000;

    var deferred = Q.defer();
    request(options, function(error, response, body) {
      if (error) {
        deferred.reject(new Error(error));
      } else {
        if (!allowAnyStatus && !isOk(response)) {
          deferred.reject(new Error(body));
        } else {
          if (transformJson) {
            var safe = safeParse(body);
            if (safe[0]) {
              deferred.reject(new Error('Could not parse response JSON'));
            } else {
              deferred.resolve(safe[1]);
            }
          } else {
            deferred.resolve(body);
          }
        }
      }
    });
    return deferred.promise;
  },

  getRetryPromise: function(options, allowAnyStatus, transformJson, timeout, times) {
    return Async.getPromise(options, allowAnyStatus, transformJson)
    .then(function (body) {
      return body;
    }, function (error) {
      if (times === 0)
        throw new Error("Error after retrying: " + error);
      return Q.delay(timeout)
      .then(function () {
        return Async.getRetryPromise(options, allowAnyStatus, transformJson, timeout, times - 1);
      });
    });
  }

};

module.exports = Async;
