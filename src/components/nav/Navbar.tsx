import MenuBtn from "./MenuBtn";

export default () => {
    return <nav className="p-2 top-navbar">
        <div className="flex px-2 navbar-container">
            
            <div className="w-10 h-10 hamburger">
                <div className="lg:hidden">
                    <MenuBtn />
                </div>
            </div>

            
        </div>
    </nav>
};