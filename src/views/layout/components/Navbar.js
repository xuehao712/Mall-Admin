import { AppBar, IconButton, Menu, MenuItem, MenuList, Toolbar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CBreadcrumb  from '../../../components/Breadcrumb';
import CHamburger from '../../../components/Hamburger';
import { userActions } from '../../../redux/actions/user-actions';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import './Navbar.scss';
import { appActions } from '../../../redux/actions/app-actions';

function CNavbar(props){
    const dispatch = useDispatch();

    const sidebar = useSelector(state => state.appReducer);
    const avatar = useSelector(state => state.userReducer.avatar);

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleMenuToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    
    const handleMenuClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };

    const prevOpen = React.useRef(open);
    useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
    }, [open]);
    

    const HandleLogout=()=>{
        dispatch(userActions.LogOut()).then(()=>{
            location.reload();
        })
    }

    const toggleSideBar=()=>{
        dispatch(appActions.ToggleSidebar());
    }
    return(
        <AppBar className="navbar" position="static" color='default'>
            <Toolbar>
                <CHamburger className="hamburger-container"toggleClick={toggleSideBar} isActive={sidebar.sidebar.opened}></CHamburger>
                <CBreadcrumb></CBreadcrumb>
                <div className="avatar-container">
                    <img className="user-avatar" />
                    <i className="el-icon-caret-bottom"></i>
                    <IconButton aria-label="account of current user"
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleMenuToggle}
                                color="inherit" ref={anchorRef}>
                        <AccountCircle/>
                    </IconButton>
                    <Popper open ={open} anchorEl= {anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleMenuClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow">
                                        <Link to="" onClick={() => location.reload()}>
                                            <MenuItem>Home</MenuItem>
                                        </Link>
                                        <MenuItem>
                                            <span onClick={HandleLogout} style={{display:"block"}}>Logout</span>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                        
                        
                    </Popper>
                </div>
            </Toolbar>
        </AppBar>
    )
}
export default CNavbar ;