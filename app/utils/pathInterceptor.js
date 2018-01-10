import constants from './constants';

export default {
  request: (url) => {
    //正则表达式含义： 排除后缀为.html | 排除前缀为http: https:
    if (!/.+(?=\.html$)/.test(url) && !/^(?=(http\:|https\:)).*/.test(url)) {
      url = constants.host + constants.path + url;
    }
    return url;
  }
};
