import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({children, showSidebar = true }) => {
    return (
        <div className='flex'>
            {showSidebar && <Sidebar />}

            <div className='w-full'>
                <Navbar showSidebar={showSidebar}/>
                <main>{children}</main>
            </div>

        </div>
    );
};

export default Layout;