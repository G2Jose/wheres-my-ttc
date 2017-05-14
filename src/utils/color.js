const hsvToRgb = (h, s, v) => {
  let rgb, i, data = [];
  if (s === 0) {
    rgb = [v,v,v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
    switch(i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return '#' + rgb.map(function(x){
    return ("0" + Math.round(x*255).toString(16)).slice(-2);
  }).join('');
};

export const getHsvForValue = (value, high = 50, low = 0) => {
    if (value > high) {
        value = high;
    } else if (value < 0) {
        value = 0;
    }

    return {
        h: Math.floor((high - low - value) * 120 / (high - low)),
        s: 1,
        v: 1,
    }
}

export const getRgbForValue = (val) => {
    const hsv = getHsvForValue(val);
    return hsvToRgb(hsv.h, hsv.s, hsv.v);
}
