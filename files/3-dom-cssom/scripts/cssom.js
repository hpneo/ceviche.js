CSSom = {
  mediaQueries: {}
};

CSSom.on = function(mediaQueryString, callback) {
  var mediaQueryList;

  if (this.mediaQueries[mediaQueryString] === undefined) {
    this.mediaQueries[mediaQueryString] = [];
  }

  mediaQueryList = window.matchMedia(mediaQueryString);
  console.log(mediaQueryList);
  mediaQueryList.addListener(callback);

  this.mediaQueries[mediaQueryString].push({
    mediaQueryList: mediaQueryList,
    callback: callback
  });
};

CSSom.off = function(mediaQueryString) {
  var i = 0,
      mediaQueryResult;

  if (this.mediaQueries[mediaQueryString] !== undefined) {
    for (i; i < this.mediaQueries[mediaQueryString]; i++) {
      mediaQueryResult = this.mediaQueries[mediaQueryString];
      mediaQueryResult.mediaQueryList.removeListener(mediaQueryResult.callback);
    }

    this.mediaQueries[mediaQueryString] = [];
  }
};