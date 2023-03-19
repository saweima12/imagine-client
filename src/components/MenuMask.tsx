import { navMenuStateStore } from 'layouts/AdminLayout/store';

const MenuMask = () => {
  const onClick = () => {
    // dispatch close menu event.
    navMenuStateStore.setState(false);
  };

  return (
    <div
      className='menu-mask'
      onClick={onClick}
      onKeyDown={onClick}
      tabIndex={0}
      aria-hidden='true'
      role='button'
    ></div>
  );
};

export default MenuMask;
