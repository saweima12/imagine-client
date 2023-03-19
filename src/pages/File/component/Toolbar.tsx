import { ChangeEvent, useSyncExternalStore } from 'react';
import { filePageInfoStore } from '../store';
import { FaFolderPlus } from 'react-icons/fa';

const ToolBar = () => {
  const filePageInfo = useSyncExternalStore(
    filePageInfoStore.subscribe,
    filePageInfoStore.getState,
  );

  const onSelectFile = (e: ChangeEvent) => {
    const files = (e.target as HTMLInputElement).files;
    // if (!files)
    //     return;

    // const file = files[0];

    // selectedFileListStore.setState([ file ]);
  };

  const onNewFolder = async () => {
    const item = document.getElementById('test');
    item?.click();

    // const client = filePageInfo.davClient;
    // if (client) {
    //     // await createDirectory(client, "/webdav/abcdc");
    //     const selectedList = selectedFileListStore.getState()
    //     log.debug(selectedList);

    //     selectedList.forEach(async (item) => {
    //         let buffer = await item.arrayBuffer();
    //         await client.putFileContents(`/webdav/${item.name}`, buffer)
    //     })
    // }
  };

  return (
    <section className='mb-4 toolbar-wrapper'>
      <div className='toolbar-container'>
        <input type='file' className='hidden' id='test' onChange={onSelectFile} multiple></input>

        <button
          className='flex p-1 justify-center items-center create-folder-btn'
          onClick={onNewFolder}
        >
          <div className='icon'>
            <FaFolderPlus />
          </div>

          <span className='ml-2 hidden md:flex'>New Folder</span>
        </button>
      </div>
    </section>
  );
};

export default ToolBar;
