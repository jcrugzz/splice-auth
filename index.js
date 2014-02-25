
var parse = require('url').parse;

//
// Accepts either a url or url.parsed url object and returns what you gave it
// with inserted auth. Prevent unnecessary parsing just because
//
module.exports = function (url, auth) {
  if (!url) {
    return null;
  }

  var isString = typeof url == 'string';

  if (!auth) {
    return isString ? replace(url) : url;
  }
  var parsed = isString ? parse(url) : url;
  var str = parsed.href;

  if(parsed.auth || !auth) {
    return isString ? replace(parsed.href) : parsed;
  }

  parsed = str.split('://');
  str = parsed[0] + '://' + auth + '@' + parsed[1];
  parsed = parse(str);

  return isString ? replace(parsed.href) : parsed;
};

function replace (href) {
  return href.replace(/\/$/, '');
}
