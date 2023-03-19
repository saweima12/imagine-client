import { getAuthInstance, getSysInfo } from 'lib/api';
import { getUserInfo } from 'lib/utils/user';
import { ActionResult, SysInfo } from 'lib/types';

export async function loadSysInfo(): Promise<ActionResult<SysInfo>> {
  // get auth instance.
  const { ua, up } = getUserInfo();
  const instance = getAuthInstance(ua, up);

  return await getSysInfo(instance);
}
