export default function timeCalc(param) {
  var time = parseInt(param);
  const currentDate = new Date();
  const currentTime = parseInt(currentDate.getTime() / 100);
  const calc = currentTime - time;

  if (parseInt(calc / 31557600) > 0) {
    return `${parseInt(calc / 31557600)} year`;
  } else if (parseInt(calc / 2628002) > 0) {
    return `${parseInt(calc / 2628002)} month`;
  } else if (parseInt(calc / 604800) > 0) {
    return `${parseInt(calc / 604800)} week`;
  } else if (parseInt(calc / 86400) > 0) {
    return `${parseInt(calc / 86400)} day`;
  } else if (parseInt(calc / 3600) > 0) {
    return `${parseInt(calc / 3600)} hour`;
  } else if (parseInt(calc / 60) > 0) {
    return `${parseInt(calc / 60)} minute`;
  } else {
    return `few seconds`;
  }
}

