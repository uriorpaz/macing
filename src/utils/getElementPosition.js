/*
* Finds element's position relative to the whole document,
* rather than to the viewport as it is the case with .getBoundingClientRect().
*
* Taken from: https://github.com/loktar00/react-lazy-load/blob/master/src/utils/getElementPosition.js
*/
export default function getElementPosition(element) {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
  };
}
