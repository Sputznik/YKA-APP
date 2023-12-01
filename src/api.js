import axios from "axios";
import store from "@/store";

axios.interceptors.request.use((request) => {
  store.commit("setProcessing", true);
  return request;
});

axios.interceptors.response.use((response) => {
  store.commit("setProcessing", false);
  return response;
});

const api = {
  makeRequest: function (options) {
    var api;
    var headers = {};

    if (
      store.state.localSettings != null &&
      store.state.localSettings.username &&
      store.state.localSettings.password
    ) {
      var username = store.state.localSettings.username;
      var password = store.state.localSettings.password;

      if (username && password) {
        headers = {
          Authorization: "Basic " + btoa(username + ":" + password),
        };
      }
    }

    var params = {};
    if (options.data) {
      params = params = this.cleanParams(options.data);
    }

    if (options.method == "post") {
      api = axios.post(options.url, options.data, { headers: headers });
    } else if (options.method == "delete") {
      //console.log( headers );
      api = axios.delete(options.url, { data: options.data, headers: headers });
    } else {
      api = axios.get(options.url, {
        params: params,
        headers: headers,
      });
    }

    return api;
  },
  _getURL: function (endpoint) {
    return process.env.NODE_ENV === "production"
      ? `https://ykasandbox.com${endpoint}`
      : `http://localhost/wordpress${endpoint}`;
  },
  cleanParams: function (params) {
    //console.log( params );

    params = JSON.parse(JSON.stringify(params));
    var removeAttr = ["pagination", "style", "post_type", "method"];
    for (var index in removeAttr) {
      var key = removeAttr[index];
      if (params[key]) {
        delete params[key];
      }
    }
    return params;
  },
  requestUser: function (id, params = {}) {
    if (id) {
      return this.makeRequest({
        url: this._getURL("/wp-json/yka/v1/follow/" + id),
        data: params,
        method: params.method ? params.method : "get",
      });
    }
    console.log("user id not valid: " + id);
  },
  requestUsers: function (params = {}) {
    var url = "/wp-json/yka/v1/follow/";

    return this.makeRequest({
      url: this._getURL(url),
      data: params,
    });
  },
  requestPost: function (post_type, post_id, params = {}) {
    return this.makeRequest({
      url: this._getURL("/wp-json/wp/v2/" + post_type + "/" + post_id),
      method: params.method ? params.method : "get",
      data: params,
    });
  },
  requestPosts: function (post_type, params = {}) {
    var url = "/wp-json/wp/v2/" + post_type + "/";

    return this.makeRequest({
      url: this._getURL(url),
      method: "get",
      data: params,
    });
  },
  requestTerm: function (term_id, taxonomy, params = {}) {
    if (term_id) {
      //console.log( params );
      return this.makeRequest({
        url: this._getURL("/wp-json/wp/v2/" + taxonomy + "/" + term_id),
        method: params.method ? params.method : "get",
        data: params,
      });
    }
    console.log("term id not valid " + term_id);
  },
  requestTerms: function (taxonomy, params = {}) {
    return this.makeRequest({
      url: this._getURL("/wp-json/wp/v2/" + taxonomy + "/"),
      method: "get",
      data: params,
    });
  },
  requestAttachment: function (attachment_id, params = {}) {
    if (attachment_id) {
      var url = "/wp-json/wp/v2/media/" + attachment_id;
      if (params.method == "delete") {
        url += "?force=true";
      }
      return this.makeRequest({
        url: this._getURL(url),
        data: params,
        method: params.method ? params.method : "get",
      });
    }
  },
  requestAppSettings: function () {
    return this.makeRequest({
      url: this._getURL("/wp-json/yka/v2/settings"),
      method: "get",
    });
  },
  requestVerifyMail: function (params = {}) {
    return this.makeRequest({
      url: this._getURL("/wp-json/yka/v2/verify/"),
      method: "post",
      data: params,
    });
  },
  requestAuthenticateEmailAddress: function (params = {}) {
    return this.makeRequest({
      url: this._getURL("/wp-json/yka/v2/auth/"),
      method: "post",
      data: params,
    });
  },
};

export default api;
