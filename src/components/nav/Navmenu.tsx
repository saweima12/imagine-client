import DiskSpaceWidget from './DiskSpaceWidget';

const NavMenu = () => {
  return (
    <aside className='pt-20 nav-menu'>
      <div className='disk-info'>
        <DiskSpaceWidget />
      </div>
    </aside>
  );
};

export default NavMenu;
