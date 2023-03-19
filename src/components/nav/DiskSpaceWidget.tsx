import type { LegacyRef } from 'react';
import { formatSizeString } from 'lib/utils';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { sysInfoStore } from 'layouts/AdminLayout/store';

export default () => {
  const sysInfo = useSyncExternalStore(sysInfoStore.subscribe, sysInfoStore.getState);

  const maxProgressElm = useRef<HTMLDivElement>();

  const percent = useMemo(() => {
    if (sysInfo.disk) return Math.round((sysInfo.disk.usage / sysInfo.disk.all) * 100);
    return 1;
  }, [sysInfo.disk?.usage]);

  const usage_str = useMemo(() => {
    if (sysInfo.disk) return formatSizeString(sysInfo.disk.usage);
    return 0;
  }, [sysInfo.disk?.usage]);

  const [curProgressWidth, setCurProgressWidth] = useState(0);

  useEffect(() => {
    const maxWidth = maxProgressElm.current?.clientWidth;

    if (maxWidth) {
      const width = (percent / 100) * maxWidth;
      setCurProgressWidth(width);
    }
  }, [percent]);

  return (
    <div className='py-4 diskinfo-wrapper'>
      <div className='flex mb-2 info-box'>
        <p>Used - {usage_str}</p>
        <div className='flex-1'></div>
        <p>{percent}%</p>
      </div>

      <div className='progress-max' ref={maxProgressElm as LegacyRef<HTMLDivElement>}></div>
      <div className='progress-value' style={{ width: curProgressWidth }}></div>
    </div>
  );
};
