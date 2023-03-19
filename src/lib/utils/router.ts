export const FileViewRouter = () => {
  const _root = '/file';

  const Root = () => _root;
  const getContentRoute = (path: string) => `${_root}${path}`;

  return {
    Root,
    getContentRoute,
  };
};
