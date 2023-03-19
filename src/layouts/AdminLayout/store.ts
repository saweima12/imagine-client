import { SysInfo } from 'lib/types';
import { createStore } from 'lib/utils/store';

export const sysInfoStore = createStore<SysInfo>({});

export const navMenuStateStore = createStore<boolean>(false);
