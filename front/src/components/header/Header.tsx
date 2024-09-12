import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import { Avatar, Dialog } from '@mui/material';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import AuthForm from '../modals/AuthForm';

export default function Header() {
    const { userAuthorize, userName } = useSelector((state: RootState) => state.rootReducer.userDataSlice)
    const [authFormOpen, setAuthFormOpen] = useState(false)
  
    const closeAuthFrom = (value: boolean) => {        
        setAuthFormOpen(value);
    };

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
                <LocalPizzaIcon sx={{ color: orange[500], fontSize: 50, rotate: '35deg' }} />
            </Stack>

            <Stack onClick={() => setAuthFormOpen(true)}>
                <Avatar sx={{ bgcolor: orange[500], cursor: 'pointer' }}>
                    {userAuthorize ? userName.charAt(0) : '?'}
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