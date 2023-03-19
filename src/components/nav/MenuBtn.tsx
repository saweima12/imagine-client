import { useSyncExternalStore } from 'react';
import { clsx } from 'clsx';
import { navMenuStateStore } from 'layouts/AdminLayout/store';

const MenuBtn = () => {
  const navMenuState = useSyncExternalStore(
    navMenuStateStore.subscribe,
    navMenuStateStore.getState,
  );

  const onToggle = () => {
    const newState = !navMenuState;
    navMenuStateStore.setState(newState);
  };

  return (
    <div
      className={clsx('menu-button-wrapper', navMenuState && 'toggle')}
      onClick={onToggle}
      tabIndex={0}
      onKeyDown={onToggle}
      aria-hidden={true}
      role='button'
    >
      <div className='menu-button-container'>
        <div className='menu-button'></div>
      </div>
    </div>
  );
};

export default MenuBtn;
