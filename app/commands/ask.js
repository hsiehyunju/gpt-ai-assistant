import Event from '../event.js';

/**
 * @param {Event} event
 * @returns {boolean}
 */
const isAskCommand = (event) => event.isAsk();

export {
  isAskCommand,
};
