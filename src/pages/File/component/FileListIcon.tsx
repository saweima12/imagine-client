import { FaFolder, FaFile } from 'react-icons/fa';

export default ({ type }: { type: string }) => {
  return (
    <span className='flex self-center mr-2 icon'>
      {type == 'directory' ? <FaFolder /> : <FaFile />}
    </span>
  );
};
