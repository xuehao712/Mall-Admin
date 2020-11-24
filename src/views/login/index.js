import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from '@material-ui/core/Card';
import './index.scss'
import { Button, CardContent, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputAdornment, Slide, SvgIcon, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GetAppIcon from '@material-ui/icons/GetApp';
import {isvalidUsername} from 'utils/validate';
import {setSupport,getSupport,setCookie,getCookie} from 'utils/support';
import {getToken as TokenAuth} from 'utils/auth';
import {userActions} from 'actions/user-actions';
import { Redirect, useHistory, useLocation } from "react-router-dom";
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import login_center_bg from '../../assets/images/login_center_bg.png';
import Alert from '@material-ui/lab/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Login(){
    //declare variable
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = TokenAuth();
    if(user) {
        if(location.pathname==="/login") {
            return <Redirect to="/"/>
        }
    }

    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
    });

    useEffect(() => {
        if(!user){
            setValues({...values,username:'admin',password:'123456'});
        }
    }, [])
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    //Dialog control
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //Error Message control
    const [errorPanel, setErrorPanel] = useState(false);
    const handleErrorPanelOpen = () => {
        setErrorPanel(true);
    };

    const handleErrorPanelClose = () => {
        setErrorPanel(false);
    };

    //Validation
    const validateUsername =isvalidUsername(values.username);
    const validatePassword =values.password.length>=3;

    //Form submmit
    const [submitted,setSubmitted] = useState(false);

    const handleLogin=()=>{
        setSubmitted(true);
        if(validateUsername && validateUsername){
            dispatch(userActions.Login(values)).then(response=>{
                var a = response;
                setCookie("username",values.username,15);
                setCookie("password",values.password,15);
                history.push('/');
            }).catch(error=>{
                handleErrorPanelOpen();
            }) 
        }else {
            console.log("param is invalid!");
            return false;
        }
    };

    const handleKeyPress=(e)=>{
        if(e.key ==='Enter'){
            handleLogin();
        }
    }
    return(
        <div>
            <Card className="login-form-layout">
                <CardContent>
                    <form autoComplete="on" name="loginForm" noValidate onSubmit={handleLogin}>
                        <div style={{textAlign:"center"}}>
                            <LocalMallIcon style={{width:'56px',height:'56px',color:'#409EFF'}}/>
                        </div>
                        <h2 className="login-title color-main">mall-admin</h2>
                        <FormControl style={{width:'100%'}}>
                            <div className="form-item" style={{width:'100%'}}>
                                <TextField required label="username" value={values.username} onChange={handleChange('username')}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle color="primary"/>
                                    </InputAdornment>
                                    ),
                                }} size="small" variant="outlined" autoComplete="on" color="primary"
                                helperText={!validateUsername && submitted ? "Username is incorrect!" : ''}
                                error={!validateUsername && submitted} style={{width:'100%'}}
                                onKeyPress={handleKeyPress }/>
                            </div>
                            <div className="form-item">
                                <TextField label="password" required type={values.showPassword ? 'text' : 'password'}
                                onChange={handleChange('password')} value={values.password}  style={{width:'100%'}}
                                onKeyPress={handleKeyPress } color="primary"
                                InputProps={{
                                    endAdornment:(
                                        <InputAdornment position="end">
                                            <IconButton color="primary"
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    startAdornment:(
                                        <InputAdornment position="start">
                                            <LockIcon color="primary"/>
                                        </InputAdornment>
                                    )
                                }}
                                    helperText={!validatePassword && submitted?"Password must be 3":''}
                                    error={!validatePassword && submitted} size="small" variant="outlined" />
                            </div>
                            <div className="form-item "style={{marginBottom:"60px",textAlign:"center"}}>
                                <Button style={{width:"45%",fontSize:'12px'}} variant="contained" color="primary" 
                                size="small" startIcon={<ExitToAppIcon/>} onClick={handleLogin}>
                                    Login
                                </Button>
                                <Button style={{width:"45%",fontSize:'12px',marginLeft:'10px'}} variant="contained" color="primary" 
                                size="small" startIcon={<GetAppIcon/>} onClick={handleClickOpen}>
                                    Get Account!
                                </Button>
                            </div>
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
            <img src={login_center_bg} className="login-center-layout"/>
            {errorPanel && <Alert id="alert-panel" severity="error" onClose={handleErrorPanelClose}>{loginStatus.message}</Alert>}
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                <DialogTitle>{"Here we go"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Username: admin <br/>
                        Password: 123456
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default Login;