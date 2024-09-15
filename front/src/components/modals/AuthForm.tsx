import { Button, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";
import signUpNewUser from "../../middleware/signUpNewUser";
import { IAuthFromProps, IAuthFormData } from "../../tsModals/tsModals";
import loginUser from "../../middleware/loginUser";
import { useDispatch } from "react-redux";
import { changeUserAuthorize, changeUserName } from "../../redux/userDataSlice";

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
    const dispatch = useDispatch()

    const errorLoginPasswordHandler = (errorProps: IAuthFormData) => {
        const { inputField, message } = errorProps

        if (inputField === 'login') {
            setLoginIsError(() => true)
            setLoginErrorText(() => message)
        } else {
            setPasswordIsError(() => true)
            setPasswordErrorText(() => message)
        }
    }

    async function signUp() {        
        const signUpResult = await signUpNewUser(loginText, passwordText)

        if (signUpResult.status === 200) {
            signIn(loginText, passwordText)
            closeAuthFrom(false)
        } else {
            errorLoginPasswordHandler(signUpResult)
        }
    }

    async function signIn(login: string, password: string) {
        const signInResponse = await loginUser(login, password)

        if (signInResponse.status === 200) {
            document.cookie = `token=${signInResponse.token}`
            dispatch(changeUserAuthorize(true))
            dispatch(changeUserName(loginText))
            console.log(`token in cookie: ${document.cookie}`)
            closeAuthFrom(false)
        } else {
            const error = {
                status: 400,
                message: signInResponse.message,
                inputField: signInResponse.inputField
            }
            
            errorLoginPasswordHandler(error)
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
                        signIn(loginText, passwordText)
                        setLoginIsError(() => false)
                        setLoginErrorText(() => '')        
                        setPasswordIsError(() => false)
                        setPasswordErrorText(() => '')
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