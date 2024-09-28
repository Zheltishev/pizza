import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LoginIcon from '@mui/icons-material/Login';
import { Avatar, Box, Dialog, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import Stack from '@mui/material/Stack';
import { amber } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import React, { useEffect, useState } from 'react';
import AuthForm from '../modals/AuthForm';
import checkToken from '../../middleware/checkToken';
import { changeUserAuthorize, changeUserName } from '../../redux/userDataSlice';
import { Logout } from '@mui/icons-material';

export default function Header() {
    const dispatch = useDispatch()
    const { userAuthorize, userName } = useSelector((state: RootState) => state.rootReducer.userDataSlice)
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
            } else {
                dispatch(changeUserAuthorize(false))
            }
        }
    
        checkAuth()
    }, [dispatch])

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
            <Stack>
                <LocalPizzaIcon sx={{ color: amber[700], fontSize: 50, rotate: '35deg' }} />
            </Stack>

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
                    <Avatar sx={{ width: 32, height: 32 }}>
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
                    <MenuItem onClick={() => {
                        document.cookie = "token_access=''; expires=0";
                        document.cookie = "token_refresh=''; expires=0";
                        dispatch(changeUserAuthorize(false))
                        closeAccountMenu()
                    }}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Выйти
                    </MenuItem>
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

            <>
                {authFormOpen && 
                <Dialog
                    open={authFormOpen}
                    onClose={() => setAuthFormOpen(false)}
                >
                    <AuthForm closeAuthFrom = { closeAuthFrom } />
                </Dialog>}
            </>
        </Stack>
    )
}