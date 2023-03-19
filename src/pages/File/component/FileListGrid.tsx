import dayjs from 'dayjs';
import { ChangeEvent, useMemo, useSyncExternalStore } from 'react';
import { NavLink } from 'react-router-dom';
import { FileStat } from 'webdav';

import { formatSizeString } from 'lib/utils';
import FileListIcon from './FileListIcon';
import { checkedListStore } from '../store';

const grid = ({ curPath, list }: { curPath: string; list: FileStat[] }) => {
  // sort file list by type and remove it self.
  // rule: folder first
  const fileList = useMemo(() => {
    const temp = list.filter((item) => item.filename != curPath);

    const getPriority = (type: string) => (type == 'directory' ? 1 : 0);
    return temp.slice().sort((a, b) => {
      return getPriority(b.type) - getPriority(a.type);
    });
  }, [list]);

  // declare state.
  const checkedList = useSyncExternalStore(checkedListStore.subscribe, checkedListStore.getState);

  const onChangeCheckAll = (e: ChangeEvent) => {
    const newState = (e.target as HTMLInputElement).checked;
    if (newState) checkedListStore.setState(fileList.map((item) => item.filename));
    else checkedListStore.setState([]);
  };

  const onChangeItem = (e: ChangeEvent, item: FileStat) => {
    const newState = (e.target as HTMLInputElement).checked;
    if (newState) checkedListStore.setState([...checkedList, item.filename]);
    else checkedListStore.setState(checkedList.filter((name) => name != item.filename));
  };

  return (
    <div className='flex flex-col filelist-view'>
      <div className='filelist-head'>
        <div className='flex row'>
          <div className='multi-check'>
            <input
              type='checkbox'
              onChange={onChangeCheckAll}
              checked={checkedList.length == fileList.length && fileList.length > 0}
            ></input>
          </div>

          <div className='file-name'>
            <p>Filename</p>
          </div>
          <div className='lastmod'>
            <p>Last Modify</p>
          </div>

          <div className='size'>
            <p>Size</p>
          </div>
        </div>
      </div>

      <div className='filelist-body'>
        {fileList.map((item) => (
          <div className='flex row' key={item.filename}>
            <div className='multi-check'>
              <input
                type='checkbox'
                checked={checkedList.includes(item.filename)}
                onChange={(e) => onChangeItem(e, item)}
              ></input>
            </div>
            <div className='flex file-name'>
              <FileListIcon type={item.type} />
              {item.type == 'directory' ? (
                <NavLink to={`${item.filename.replace(/^\//, '')}`}>{item.basename}</NavLink>
              ) : (
                <p>{item.basename}</p>
              )}
            </div>
            <div className='lastmod'>{dayjs(item.lastmod).format('YYYY-MM-DD HH:mm')}</div>
            <div className='size'>{formatSizeString(item.size)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default grid;
