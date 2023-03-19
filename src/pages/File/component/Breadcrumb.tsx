import { FaLongArrowAltLeft } from 'react-icons/fa';
import { FileViewRouter } from 'lib/utils/router';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface BreadCrumbParams {
  curPath: string;
}

interface CrumbItem {
  name: string;
  path: string;
}

const BreadCrumb = ({ curPath }: BreadCrumbParams) => {
  const crumbs: Array<CrumbItem> = [];
  const helper = FileViewRouter();

  // generate crumbs route.
  curPath
    .split('/')
    .filter((item) => item != '')
    .reduce((prev, curr) => {
      const path = `${prev}/${curr}`;
      crumbs.push({ name: curr, path: helper.getContentRoute(path) });
      return path;
    }, '');

  const last: CrumbItem = crumbs.slice(0, crumbs.length - 1).pop() || {
    name: 'Home',
    path: helper.getContentRoute('/'),
  };

  // Create crumbItem element.
  const elmList: Array<JSX.Element> = [];
  crumbs.forEach((item, index) => {
    elmList.push(
      <NavLink key={item.path} className='crumb-item' to={item.path}>
        {item.name}
      </NavLink>,
    );
    if (index < crumbs.length - 1) elmList.push(<span key={`slash-${index}`}>/</span>);
  });

  return (
    <div className={clsx('mb-4 w-full breadcrumb-wrapper', curPath == '/' && 'hidden')}>
      <div className='flex items-center breadcrumb-container'>
        {last && (
          <NavLink to={last.path}>
            <div className={clsx('back-btn')}>
              <FaLongArrowAltLeft />
            </div>
          </NavLink>
        )}

        <div className='flex path-field' title={curPath}>
          {elmList}
        </div>

        <div className='copylink-btn'></div>
      </div>
    </div>
  );
};

export default BreadCrumb;
