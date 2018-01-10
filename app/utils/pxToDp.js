'use strict';

import {Dimensions} from 'react-native';

const deviceWidthDp = Dimensions.get('window').width;
// 默认设计图宽度750
const uiWidthPx = 750;

function pxToDp(uiElementPx) {
  return uiElementPx *  deviceWidthDp / uiWidthPx;
}

export default pxToDp;