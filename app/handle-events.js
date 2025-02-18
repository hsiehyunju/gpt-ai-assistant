import { SETTING_AI_ACTIVATED } from '../constants/setting.js';
import storage from '../storage/index.js';
import { replyMessage } from '../utils/index.js';
import {
  execActivateCommand,
  execChatCommand,
  execDeactivateCommand,
  execDeployCommand,
  execDrawCommand,
  execSettingsCommand,
  execVersionCommand,
  isActivateCommand,
  isChatCommand,
  isContinue,
  isDeactivateCommand,
  isDeployCommand,
  isDrawCommand,
  isSettings,
  isVersionCommand,
  isAskCommand,
} from './commands/index.js';
import Event from './event.js';

/**
 * @param {Event} event
 * @returns {Event}
 */
const handleEvent = async (event) => (
  isAskCommand(event) && ((isSettings(event) && execSettingsCommand(event))
    || (isVersionCommand(event) && execVersionCommand(event))
    || (isDeployCommand(event) && execDeployCommand(event))
    || (isDrawCommand(event) && execDrawCommand(event))
    || (isActivateCommand(event) && execActivateCommand(event))
    || (isDeactivateCommand(event) && execDeactivateCommand(event))
    || (isContinue(event) && execChatCommand(event))
    || (isChatCommand(event) && execChatCommand(event))
    || ((await storage.getItem(SETTING_AI_ACTIVATED) && execChatCommand(event)))
    || event)
);

const handleEvents = async (events = []) => (
  Promise.all(
    (await Promise.all(
      events
        .map((event) => handleEvent(new Event(event))),
    ))
      .filter((event) => event.messages.length > 0)
      .map((event) => replyMessage(event)),
  )
);

export default handleEvents;
