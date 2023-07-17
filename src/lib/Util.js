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
  appendScripts: (htmlString) => {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(htmlString, "text/html");
    var scripts = htmlDoc.getElementsByTagName("script");

    for (var index in scripts) {
      if (scripts[index].src) {
        /* REMOVE ALL THE SCRIPTS WITH THE SAME SOURCE
        var oldscript = document.querySelector('script[src="' + scripts[index].src + '"]');
        if( oldscript ){
          oldscript.parentNode.removeChild( oldscript )
          console.log( 'old script has been removed' )
        }
        */

        var $script = document.createElement("script");
        $script.src = scripts[index].src; // URL for the third-party library being loaded.
        document.body.appendChild($script);
        $script.onload = () => {
          console.log("Third Party Scripts have been loaded");
        };
      }
    }
  },
  abbreviateNumber: function (value) {
    var newValue = value;
    if (value >= 1000) {
      var suffixes = ["", "K", "M", "B", "T"];
      var suffixNum = Math.floor(("" + value).length / 3);
      var shortValue = "";
      for (var precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat(
          (suffixNum != 0
            ? value / Math.pow(1000, suffixNum)
            : value
          ).toPrecision(precision)
        );
        var dotLessShortValue = (shortValue + "").replace(
          /[^a-zA-Z 0-9]+/g,
          ""
        );
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  },
  formatDate: function (dateString) {
    if (dateString) {
      //console.log( dateString );

      var d = new Date(dateString.replace(" ", "T")),
        m_index = d.getMonth(),
        day = String(d.getDate()).padStart(2, "0"),
        year = d.getFullYear();

      //console.log( d + day );

      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months[m_index] + " " + day + ", " + year;
    }
  },
  getAuthorLink: function (author) {
    //console.log( author );
    var route = {
      name: "Author",
      state: { author: JSON.stringify(author) },
      params: { slug: author.slug },
    };
    return route;
  },
  getPostLink: function (post) {
    var route = {
      name: "",
      params: {},
      state: { id: post.id, post: JSON.stringify(post) },
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
