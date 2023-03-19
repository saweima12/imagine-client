import { clsx } from 'clsx';
import { Outlet } from 'react-router';
import { useSyncExternalStore } from 'react';
import { useQuery } from 'react-query';

import { loadSysInfo } from 'lib/action/dashboard';

import { sysInfoStore, navMenuStateStore } from './store';

import NavMenu from 'components/nav/Navmenu';
import NavBar from 'components/nav/Navbar';
import MenuMask from 'components/MenuMask';

const layout = () => {
  const navMenuState = useSyncExternalStore(
    navMenuStateStore.subscribe,
    navMenuStateStore.getState,
  );

  const { isLoading } = useQuery('loadSysInfo', loadSysInfo, {
    onSuccess: (data) => {
      sysInfoStore.setState({ disk: data.data?.disk });
    },
  });

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className={clsx('admin-wrapper', navMenuState && 'menu-open')}>
      <NavBar />
      <MenuMask />
      <NavMenu />
      <div className='pt-20 admin-container'>
        <Outlet />
      </div>
    </div>
  );
};

export default layout;
