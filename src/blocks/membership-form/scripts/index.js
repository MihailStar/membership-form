if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

/**
 * @returns {void}
 */
const makeLabelsSameWidth = () => {
  /**
   * @type {Object<string, Array<Element>>}
   */
  const sortedElements = Array.prototype.slice
    .call(document.querySelectorAll('[data-same-width]'))
    .reduce((result, element) => {
      // eslint-disable-next-line no-param-reassign
      result[element.dataset.sameWidth] = (
        result[element.dataset.sameWidth] || []
      ).concat(element);
      return result;
    }, {});

  Object.keys(sortedElements)
    .map((key) => {
      return sortedElements[key].sort((a, b) => {
        return a.offsetWidth - b.offsetWidth;
      });
    })
    .forEach((groupElements) => {
      groupElements.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.style.width = `${groupElements[groupElements.length - 1]
          .offsetWidth + 1}px`;
      });
    });
};

/**
 * @returns {void}
 */
const bindHandlersToSwitches = () => {
  document.querySelectorAll('[data-switch]').forEach((element) => {
    element.addEventListener('change', (event) => {
      document
        .querySelectorAll(`[data-switchable="${event.target.dataset.switch}"]`)
        .forEach((switchable) => {
          // eslint-disable-next-line no-param-reassign
          switchable.disabled = !switchable.disabled;
        });
    });
  });
};

window.addEventListener('load', () => {
  makeLabelsSameWidth();
  bindHandlersToSwitches();
});
