import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LoginIcon from '@mui/icons-material/Login';
import { Alert, Avatar, Box, Collapse, Dialog, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import Stack from '@mui/material/Stack';
import { amber } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import React, { useEffect, useState } from 'react';
import checkToken from '../../middleware/checkToken';
import { changeUserAuthorize, changeUserId, changeUserName, changeUserRole } from '../../redux/userDataSlice';
import { Dashboard, Logout } from '@mui/icons-material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AuthForm from '../../pages/home/modals/AuthForm';
import { Link } from 'react-router-dom';
import { clearBasket } from '../../redux/basketListSlice';
import { alertChangeMessage, alertChangeModalOpen, alertChangeStatus } from '../../redux/alertSlice';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function Header() {
    const dispatch = useDispatch()
    const { userAuthorize, userName, userRole } = useSelector((state: RootState) => state.rootReducer.userDataSlice)
    const { alertModalOpen, alertStatus, alertMessage } = useSelector((state: RootState) => state.rootReducer.alertSlice)
    const [authFormOpen, setAuthFormOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const accountMenuState = Boolean(anchorEl);
    const openAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeAccountMenu = () => {
        setAnchorEl(null);
    };
  
    const closeAuthFrom = (value: boolean) => {
        setAuthFormOpen(value);
    };

    useEffect(() => {
        async function checkAuth() {
            const resultCheckingToken = await checkToken()
    
            if (resultCheckingToken!.status === 200) {
                dispatch(changeUserAuthorize(true))
                dispatch(changeUserName(resultCheckingToken!.userName))
                dispatch(changeUserId(resultCheckingToken!.userId))
                dispatch(changeUserRole(resultCheckingToken!.userRole))
            } else {
                dispatch(changeUserAuthorize(false))
            }
        }
    
        checkAuth()
    }, [dispatch, userAuthorize])

    useEffect(() => {
        setTimeout(() => {
            dispatch(alertChangeMessage(''))
            dispatch(alertChangeStatus(false))
            dispatch(alertChangeModalOpen(false))
        }, 5000)
    }, [alertModalOpen])

    return (
        <Stack 
            direction={'row'} 
            spacing={2} 
            sx={{
                justifyContent: "space-between", 
                padding: '1rem',
                backgroundColor: '#1A2027'
            }}
        >
            <Link to="/">
                <Stack>
                    <LocalPizzaIcon sx={{ color: amber[700], fontSize: 50, rotate: '35deg' }} />
                </Stack>
            </Link>

            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} >
                <Tooltip title="Личный кабинет">
                <IconButton
                    onClick={openAccountMenu}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={accountMenuState ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={accountMenuState ? 'true' : undefined}
                >
                    <Avatar 
                        sx={{ 
                            width: 32, 
                            height: 32,
                            backgroundColor: userAuthorize ? '#ffa000' : '#616161'
                        }}
                    >
                        {userAuthorize ? userName.charAt(0).toUpperCase() : '?'}
                    </Avatar>
                </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={accountMenuState}
                onClose={closeAccountMenu}
                onClick={closeAccountMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {userAuthorize 
                    ?
                    <Box>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <MenuItem sx={{
                                color: 'white'
                            }}>
                                <ListItemIcon>
                                    <PersonOutlineIcon fontSize="small" />
                                </ListItemIcon>
                                Профиль
                            </MenuItem>
                        </Link>
                        {userRole === 'admin' ? 
                            <>
                                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                                    <MenuItem sx={{
                                        color: 'white'
                                    }}>
                                        <ListItemIcon>
                                            <Dashboard fontSize="small" />
                                        </ListItemIcon>
                                        Dashboard
                                    </MenuItem>
                                </Link>
                                <Link to="/orders" style={{ textDecoration: 'none' }}>
                                <MenuItem sx={{
                                    color: 'white'
                                }}>
                                    <ListItemIcon>
                                        <AssignmentIcon fontSize="small" />
                                    </ListItemIcon>
                                    Orders
                                </MenuItem>
                                </Link>
                            </> 
                            : null
                        }
                        <MenuItem onClick={() => {
                            document.cookie = "token_access=''; expires=0";
                            document.cookie = "token_refresh=''; expires=0";
                            dispatch(changeUserAuthorize(false))
                            dispatch(clearBasket())
                            closeAccountMenu()
                        }}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Выйти
                        </MenuItem>
                    </Box>
                    :
                    <MenuItem onClick={() => {
                        setAuthFormOpen(true)                        
                        closeAccountMenu()
                    }}>
                        <ListItemIcon>
                            <LoginIcon fontSize="small" />
                        </ListItemIcon>
                        Авторизоваться
                    </MenuItem>
                }
            </Menu>

            {authFormOpen && 
                <Dialog
                    open={authFormOpen}
                    onClose={() => setAuthFormOpen(false)}
                >
                    <AuthForm closeAuthFrom = { closeAuthFrom } />
                </Dialog>
            }

            {alertModalOpen && 
                <Alert
                    severity={alertStatus ? 'success' : 'error'}
                    sx={{ position: 'absolute', right: '1rem' }}
                    action={
                        <IconButton
                          aria-label="close"
                          color={alertStatus ? 'success' : 'error'}
                          size="small"
                          onClick={() => dispatch(alertChangeModalOpen(false))}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    >
                        {alertMessage}
                </Alert>
            }

        </Stack>
    )
}