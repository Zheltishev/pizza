import { Button, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";
import signUpNewUser from "../../middleware/signUpNewUser";
import { IAuthFromProps } from "../../tsModals/tsModals";

export default function AuthForm( props: IAuthFromProps ) {
    const [titleText, setTitleText] = useState('Do you have an account?')
    const [showChoiceButtons, setShowChoiceButtons] = useState(true)
    const [showInputs, setShowInputs] = useState(false)
    const [showButtonSignIn, setShowButtonSignIn] = useState(false)
    const [showButtonSignUp, setShowButtonSignUp] = useState(false)
    const [loginText, setLoginText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [loginIsError, setLoginIsError] = useState(false)
    const [loginErrorText, setLoginErrorText] = useState('')
    const [passwordIsError, setPasswordIsError] = useState(false)
    const [passwordErrorText, setPasswordErrorText] = useState('')
    const { closeAuthFrom } = props

    async function signUp() {        
        const signUpResult = await signUpNewUser(loginText, passwordText)

        if (signUpResult.status === 200) {
            alert(signUpResult.message)
            closeAuthFrom(false)
        } else {
            if (signUpResult.inputField === 'login') {
                setLoginIsError(() => true)
                setLoginErrorText(() => signUpResult.message)
            } else {
                setPasswordIsError(() => true)
                setPasswordErrorText(() => signUpResult.message)
            }
        }
    }

    return (
        <Stack sx={{padding: '1rem 3rem', minWidth: 400}}>
            <DialogTitle sx={{ textAlign: 'center', paddingBlock: 0 }}> {titleText} </DialogTitle>

            {
                showChoiceButtons &&
                <Stack
                    direction={'row'}
                    spacing={2}
                    sx={{justifyContent: 'center', marginTop: '1rem'}}
                >
                    <Button 
                        variant="outlined" 
                        onClick={() => {
                            setTitleText('Sign in to Pizza')
                            setShowChoiceButtons(false)
                            setShowInputs(true)
                            setShowButtonSignIn(true)
                        }}
                    >
                        sign in
                    </Button>

                    <Button 
                        variant="outlined" 
                        onClick={() => {
                            setTitleText('Enter your email and password')
                            setShowChoiceButtons(false)
                            setShowInputs(true)
                            setShowButtonSignUp(true)
                        }}
                    >
                        sign up
                    </Button>
                </Stack>
            }

            {
                showInputs &&
                <Stack
                    direction={'column'}
                    spacing={2}
                    sx={{ marginBlock: '1rem' }}
                >
                    <TextField 
                        label="email" 
                        variant="outlined" 
                        autoComplete="off" 
                        size="small"
                        error={loginIsError}
                        helperText={loginErrorText}
                        onChange={(e) => setLoginText(e.currentTarget.value)}
                    />
                    
                    <TextField 
                        label="password" 
                        variant="outlined" 
                        autoComplete="off" 
                        size="small"
                        error={passwordIsError}
                        helperText={passwordErrorText}
                        onChange={(e) => setPasswordText(e.currentTarget.value)}
                    />
                </Stack>
            }

            <Stack
                sx={{ justifyContent: 'center' }}
            >
                {
                    showButtonSignIn &&
                    <Button 
                    variant="outlined" 
                    onClick={() => {
                        
                    }}
                    >
                        sign in
                    </Button>
                }

                {
                    showButtonSignUp &&
                    <Button 
                    variant="outlined" 
                    onClick={() => {
                        signUp()
                        setLoginIsError(() => false)
                        setLoginErrorText(() => '')        
                        setPasswordIsError(() => false)
                        setPasswordErrorText(() => '')
                    }}
                    >
                        sign up
                    </Button>
                }
            </Stack>

        </Stack>
    )
}