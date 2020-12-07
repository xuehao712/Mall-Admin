import React, {useState, useEffect, useMemo, useLayoutEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from 'actions/app-actions';
import {Layout } from 'antd';
import CSidebar from './components/sidebar';
import CNavbar from './components/Navbar';
import { MainRoutes } from '../../router/routers';
import {store} from '../../redux/store';
import './MainLayout.scss';

const { Header, Footer, Sider, Content } = Layout;
function MainLayout(props){
    const dispatch = useDispatch();
    const [width, setWidth] = useState(null);
    const [sideBarState, setSideBarState] = useState(null);
    store.subscribe(()=>{
        setSideBarState({...store.getState().appReducer.sidebar});
    })
    const toggleSideBar=()=>{
        dispatch(appActions.ToggleSidebar());
    }
    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
    }, [])
    useLayoutEffect(() => {
        let state = store.getState().appReducer.sidebar.opened;
        if(width && width<768 && !state ){
            toggleSideBar();
        }
    }, [width])
    
    
    return(
        // <div className={`app-wrapper ${classObj}`} >
        //     <CSidebar></CSidebar>
        //     <div className="main-container">
        //         <CNavbar/>
        //         <MainRoutes/>
        //     </div>
        // </div>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={sideBarState?sideBarState.opened:false} onCollapse={toggleSideBar}>
                <CSidebar></CSidebar>
            </Sider>
            <Layout>
                <Header>
                    <CNavbar/>
                </Header>
                <Content>
                    <MainRoutes/>
                </Content>
                <Footer style={{textAlign:'center',padding:'10px 50px',position: "sticky", bottom: "0"}} color="#8f959c">
                    &#169;Copyright. All right reserved.
                </Footer>
            </Layout>
        </Layout>           
    )
}
export default MainLayout;