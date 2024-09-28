import { Button, DialogTitle, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from "@mui/material";
import { useState } from "react";
import signUpNewUser from "../../middleware/signUpNewUser";
import { IAuthFromProps, IAuthFormData } from "../../tsModals/tsModals";
import loginUser from "../../middleware/loginUser";
import { useDispatch } from "react-redux";
import { changeUserAuthorize, changeUserName } from "../../redux/userDataSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AuthForm( props: IAuthFromProps ) {
    const [titleText, setTitleText] = useState('У вас есть аккаунт?')
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
    const [showPassword, setShowPassword] = useState(false)
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
            signInResponse.token.split(';').forEach((e: string) => {
                document.cookie = e
            })
            
            dispatch(changeUserAuthorize(true))
            dispatch(changeUserName(loginText))
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
        <Stack sx={{padding: '1rem 2rem', minWidth: 420}}>
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
                            setTitleText('Войти в личный кабинет')
                            setShowChoiceButtons(false)
                            setShowInputs(true)
                            setShowButtonSignIn(true)
                        }}
                    >
                        войти
                    </Button>

                    <Button 
                        variant="outlined" 
                        onClick={() => {
                            setTitleText('введите ваши почту и пароль')
                            setShowChoiceButtons(false)
                            setShowInputs(true)
                            setShowButtonSignUp(true)
                        }}
                    >
                        зарегистрироваться
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
                        label="почта" 
                        variant="outlined" 
                        autoComplete="off" 
                        error={loginIsError}
                        helperText={loginErrorText}
                        onChange={(e) => setLoginText(e.currentTarget.value)}
                    />
                    
                    <Stack>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">пароль</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                error={!!passwordIsError}
                                autoComplete="off"
                                onChange={(e) => setPasswordText(e.currentTarget.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={(e) => {
                                            setShowPassword((show) => !show)
                                        }}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText 
                                error = { passwordIsError }
                                id = "outlined-weight-helper-text"
                            >
                                { passwordErrorText }
                            </FormHelperText>
                        </FormControl>
                    </Stack>

                </Stack>
            }

            <Stack
                sx={{ justifyContent: 'center' }}
            >
                {
                    showButtonSignIn &&
                    <Button 
                    variant="outlined" 
                    size="large"
                    onClick={() => {
                        signIn(loginText, passwordText)
                        setLoginIsError(() => false)
                        setLoginErrorText(() => '')        
                        setPasswordIsError(() => false)
                        setPasswordErrorText(() => '')
                    }}
                    >
                        войти
                    </Button>
                }

                {
                    showButtonSignUp &&
                    <Button 
                    variant="outlined" 
                    size="large"
                    onClick={() => {
                        signUp()
                        setLoginIsError(() => false)
                        setLoginErrorText(() => '')        
                        setPasswordIsError(() => false)
                        setPasswordErrorText(() => '')
                    }}
                    >
                        зарегистрироваться
                    </Button>
                }
            </Stack>

        </Stack>
    )
}