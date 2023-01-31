export default {
  // REMOVE EMPTY PARAMS THAT COME FROM DEFAULT ATTRIBUTES
  removeEmptyParams: (params) => {
    for (var key in params) {
      if (!params[key]) {
        delete params[key];
      }
    }
    return params;
  },

  decodeHTML: function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  },
  truncate: function (text, textLength = 80, suffix = "...") {
    var decodedText = this.decodeHTML(text);
    if (decodedText.length > textLength) {
      return decodedText.substring(0, textLength) + suffix;
    } else {
      return decodedText;
    }
  },
  debounceEvent: function (callback, timeout = 600) {
    let debounce = null;
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      callback();
    }, timeout);
  },
  getAuthorLink: function (author) {
    //console.log( author );
    var route = {
      name: "Author",
      // params: { slug: author.slug, author: JSON.stringify(author) },
      params: { slug: author.slug },
    };
    return route;
  },
  getPostLink: function (post) {
    var route = {
      name: "",
      params: {},
    };

    if (post.type != undefined && post.type == "post") {
      const month = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      var postdate = new Date(post.date.replace(" ", "T"));
      //console.log( post.date );
      route.params.year = postdate.getFullYear();
      route.params.month = month[postdate.getMonth()];
      route.params.slug = post.slug ? decodeURIComponent(post.slug) : "";
      route.name = "SinglePost";
    }
    return route;
  },
  getTermLink: function (term) {
    var route = {
      name: "Archive",
      params: {
        slug: term.slug,
        taxonomy: term.taxonomy,
        // id: term.id,
        // term: JSON.stringify(term),
      },
    };
    return route;
  },
};
