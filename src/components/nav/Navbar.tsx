import MenuBtn from "./MenuBtn";
import { NavLink } from 'react-router-dom';
import { FaFile, FaSignOutAlt } from 'react-icons/fa'

export default () => {
    return <nav className="top-navbar">
        <div className="flex py-2 navbar-container">
            <div className="ml-4 lg:hidden hamburger">
                <MenuBtn />
            </div>

            <ul className="flex nav-list">
                <li className="flex nav-item">
                    <NavLink className="flex" to="/file">
                        <div className="flex">
                            <span className="flex justify-center self-center icon">
                                <FaFile />
                            </span>

                            <span className="ml-2 hidden lg:flex text">File</span>
                        </div>
                    </NavLink>
                </li>
            </ul>

            <div className="flex grow"></div>
            
            <div className="flex mr-4 items-center">
                <NavLink className="flex" to="/signout">
                    <div className="flex">
                        <span className="flex justify-center self-center icon">
                            <FaSignOutAlt />
                        </span>
                        <span className="ml-2 hidden lg:flex text">Logout</span>
                    </div>
                </NavLink>
            </div>
        </div>
    </nav>
};