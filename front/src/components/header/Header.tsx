import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import { Avatar, Dialog } from '@mui/material';
import Stack from '@mui/material/Stack';
import { amber } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import AuthForm from '../modals/AuthForm';
import checkToken from '../../middleware/checkToken';
import { changeUserAuthorize, changeUserName } from '../../redux/userDataSlice';

export default function Header() {
    const dispatch = useDispatch()
    const { userAuthorize, userName } = useSelector((state: RootState) => state.rootReducer.userDataSlice)
    const [authFormOpen, setAuthFormOpen] = useState(false)
  
    const closeAuthFrom = (value: boolean) => {
        setAuthFormOpen(value);
    };

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
                <LocalPizzaIcon sx={{ color: amber[600], fontSize: 50, rotate: '35deg' }} />
            </Stack>

            <Stack onClick={() => setAuthFormOpen(true)}>
                <Avatar sx={{ bgcolor: amber[600], cursor: 'pointer' }}>
                    {userAuthorize ? userName.charAt(0).toUpperCase() : '?'}
                </Avatar>
            </Stack>

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