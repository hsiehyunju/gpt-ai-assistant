import Event from '../event.js';

/**
 * @param {Event} event
 * @returns {boolean}
 */
const isAskCommand = (event) => event.isAsk();

/**
 * @param {Event} event
 * @returns {Event}
 */
const execVersionCommand = async (event) => {
  const version = getVersion();
  event.sendText(version);
  return event;
};

export {
  isVersionCommand,
  execVersionCommand,
};
