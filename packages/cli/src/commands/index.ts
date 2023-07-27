import {Command, DetachedCommand} from '@react-native-community/cli-types';
import {commands as cleanCommands} from '@exodus/cli-clean';
import {commands as configCommands} from '@react-native-community/cli-config';
import {commands as metroCommands} from '@exodus/cli-plugin-metro';
import profileHermes from '@exodus/cli-hermes';
import upgrade from './upgrade/upgrade';
import init from './init';

export const projectCommands = [
  ...metroCommands,
  ...configCommands,
  cleanCommands.clean,
  upgrade,
  profileHermes,
] as Command[];

export const detachedCommands = [init] as DetachedCommand[];
