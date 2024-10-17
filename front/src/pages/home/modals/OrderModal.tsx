import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import React, { useState } from "react";
import { IOrderModal } from "../../../tsModals/tsModals";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function OrderModal({ totalPrice }: IOrderModal) {
    const { basketList } = useSelector((state: RootState) => state.rootReducer.basketListSlice)
    const { userName } = useSelector((state: RootState) => state.rootReducer.userDataSlice)
    const [ contactModal, setContactModal ] = useState(true)
    const [ cardModal, setCardModal ] = useState(false)
    const [ orderPhone, setOrderPhone ] = useState('')
    const [ orderAddress, setOrderAddress ] = useState('')
    const [ cardNumberSectionOne, setCardNumberSectionOne ] = useState('')
    const [ cardNumberSectionTwo, setCardNumberSectionTwo ] = useState('')
    const [ cardNumberSectionThree, setCardNumberSectionThree ] = useState('')
    const [ cardNumberSectionFour, setCardNumberSectionFour ] = useState('')
    const [ cardMonth, setCardMonth ] = useState('')
    const [ cardYear, setCardYear ] = useState('')
    const [ cardCVV, setCardCVV ] = useState('')
    const mobileRegex = /^[+]?[0-9]{1}?[\s]?[(]?[0-9]{3}[)]??[\s]?[0-9]{3}[-]?[0-9]{2}[-]?[0-9]{2}$/
    const landlinePhoneRegex = /^[0-9]{2,3}[-]?[0-9]{2,3}[-]?[0-9]{2,3}$/
    const [ textInPhoneInput, setTextInPhoneInput ] = useState('')

    function checkPhone(value: string) {
        const phone = value.trim()
        setTextInPhoneInput(phone)

        if (phone.match(mobileRegex) || phone.match(landlinePhoneRegex)) {
            setOrderPhone(String(phone))
        } else {
            setOrderPhone('')
        }
    }

    function changeCardValue(sectionNumber: number, value: number) {
        if (sectionNumber === 1) {
            setCardNumberSectionOne(value.toString())
        }

        if (sectionNumber === 2) {
            setCardNumberSectionTwo(value.toString())
        }

        if (sectionNumber === 3) {
            setCardNumberSectionThree(value.toString())
        }

        if (sectionNumber === 4) {
            setCardNumberSectionFour(value.toString())
        }
    }

    return (
        <Grid2 
            sx={{ 
                display: 'grid', 
                justifyContent: 'center', 
                gap: '1rem', 
                padding: '2rem 1rem', 
                minWidth: {
                    md: '400px',
                    xs: '300px'
                }
            }}
        >
            {
                contactModal && <>
                <Typography variant="button" sx={{ textAlign: 'center' }}>
                    Введите контактную информацию
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <LocalPhoneIcon 
                        color="primary"
                        sx={{ mr: 1 }} 
                    />
                    <TextField 
                        size="small"
                        placeholder="телефон *"
                        autoComplete="off"
                        type="number"
                        onChange={(e) => checkPhone(String(e.currentTarget.value))}
                        error={textInPhoneInput.length > 0 && !orderPhone ? true : false}
                        helperText={ textInPhoneInput.length > 0 && !orderPhone ? 'неправильный формат' : ''}
                        sx={{
                            width: {
                                md: '300px',
                                xd: '280px'
                            },
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                display: 'none'
                            },
                            '& input[type=number]': {
                                MozAppearance: 'textfield'
                            }
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <LocationOnIcon 
                        color="primary"
                        sx={{ mr: 1 }} 
                    />
                    <TextField 
                        size="small"
                        placeholder="адрес *"
                        autoComplete="off"
                        onChange={(e) => setOrderAddress(e.currentTarget.value)}
                        sx={{
                            width: {
                                md: '300px',
                                xd: '280px'
                            }
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                    <Button
                        variant="outlined" 
                        color='primary' 
                        startIcon={<CreditScoreIcon />}
                        disabled={ 
                            orderPhone
                            && orderAddress.length > 10 
                            && orderAddress.length < 50
                                ? false 
                                : true 
                        }
                        onClick={() => {
                            setContactModal(false)
                            setCardModal(true)
                        }}
                    >
                        оплатить
                    </Button>
                </Box>
            </>}

            {
                cardModal && 
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                        <CreditCardIcon />
                        <Typography variant="button" sx={{ textAlign: 'center' }}>
                            Оплата картой
                        </Typography>
                    </Box>

                    <Grid2>
                        <Typography variant="caption">
                            введите номер карты
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <TextField 
                                size="small"
                                autoComplete="off"
                                placeholder="0000"
                                type="number"
                                onChange={(e) => changeCardValue(1, Number(e.currentTarget.value))}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const numericValue = parseFloat(e.target.value);
                                
                                    if (!isNaN(numericValue) && numericValue > 9999) {
                                    e.target.value = String(numericValue).slice(0, 4);
                                    }
                                
                                    if (!isNaN(numericValue) && numericValue < 0) {
                                    e.target.value = "0";
                                    }}
                                }
                                error={ cardNumberSectionOne.length === 0 || cardNumberSectionOne.length === 4 ? false : true }
                                sx={{
                                    width: '80px',
                                    padding: '1px',
                                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                        display: 'none'
                                    },
                                    '& input[type=number]': {
                                        MozAppearance: 'textfield'
                                    }
                                }}
                            />
                            
                            <TextField 
                                size="small"
                                autoComplete="off"
                                placeholder="0000"
                                type="number"
                                onChange={(e) => changeCardValue(2, Number(e.currentTarget.value))}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const numericValue = parseFloat(e.target.value);
                                
                                    if (!isNaN(numericValue) && numericValue > 9999) {
                                    e.target.value = String(numericValue).slice(0, 4);
                                    }
                                
                                    if (!isNaN(numericValue) && numericValue < 0) {
                                    e.target.value = "0";
                                    }}
                                }
                                error={ cardNumberSectionTwo.length === 0 || cardNumberSectionTwo.length === 4 ? false : true }
                                sx={{
                                    width: '80px',
                                    padding: '1px',
                                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                        display: 'none'
                                    },
                                    '& input[type=number]': {
                                        MozAppearance: 'textfield'
                                    }
                                }}
                            />
                            
                            <TextField 
                                size="small"
                                autoComplete="off"
                                placeholder="0000"
                                type="number"
                                onChange={(e) => changeCardValue(3, Number(e.currentTarget.value))}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const numericValue = parseFloat(e.target.value);
                                
                                    if (!isNaN(numericValue) && numericValue > 9999) {
                                    e.target.value = String(numericValue).slice(0, 4);
                                    }
                                
                                    if (!isNaN(numericValue) && numericValue < 0) {
                                    e.target.value = "0";
                                    }}
                                }
                                error={ cardNumberSectionThree.length === 0 || cardNumberSectionThree.length === 4 ? false : true }
                                sx={{
                                    width: '80px',
                                    padding: '1px',
                                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                        display: 'none'
                                    },
                                    '& input[type=number]': {
                                        MozAppearance: 'textfield'
                                    }
                                }}
                            />
                            
                            <TextField 
                                size="small"
                                autoComplete="off"
                                placeholder="0000"
                                type="number"
                                onChange={(e) => changeCardValue(4, Number(e.currentTarget.value))}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const numericValue = parseFloat(e.target.value);
                                
                                    if (!isNaN(numericValue) && numericValue > 9999) {
                                    e.target.value = String(numericValue).slice(0, 4);
                                    }
                                
                                    if (!isNaN(numericValue) && numericValue < 0) {
                                    e.target.value = "0";
                                    }}
                                }
                                error={ cardNumberSectionFour.length === 0 || cardNumberSectionFour.length === 4 ? false : true }
                                sx={{
                                    width: '80px',
                                    padding: '1px',
                                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                        display: 'none'
                                    },
                                    '& input[type=number]': {
                                        MozAppearance: 'textfield'
                                    }
                                }}
                            />
                        </Box>
                    </Grid2>

                    <Grid2>
                        <Typography variant="caption">
                            введите срок действия и CVV код
                        </Typography>

                        <Box>
                            <Grid2 sx={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                                <Box>
                                    <Grid2 sx={{  display: 'flex' }}>
                                        <TextField 
                                            size="small"
                                            placeholder="мм"
                                            autoComplete="off"
                                            type="number"
                                            onChange={(e) => setCardMonth(String(e.currentTarget.value))}
                                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const numericValue = parseFloat(e.target.value);
                                            
                                                if (!isNaN(numericValue) && numericValue > 12) {
                                                e.target.value = String(numericValue).slice(0, 2);
                                                }
                                            
                                                if (!isNaN(numericValue) && numericValue < 0) {
                                                e.target.value = "0";
                                                }}
                                            }
                                            error={ (Number(cardMonth) < 1 || Number(cardMonth) > 12) && cardMonth.length > 0 ? true : false }
                                            sx={{
                                                width: {
                                                    xs: '67px',
                                                    md: '80px',
                                                },
                                                padding: '1px',
                                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                                    display: 'none'
                                                },
                                                '& input[type=number]': {
                                                    MozAppearance: 'textfield'
                                                }
                                            }}
                                        />
                                        
                                        <TextField 
                                            size="small"
                                            placeholder="гг"
                                            autoComplete="off"
                                            type="number"
                                            onChange={(e) => setCardYear(String(e.currentTarget.value))}
                                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const numericValue = parseFloat(e.target.value);
                                            
                                                if (!isNaN(numericValue) && numericValue > 99) {
                                                e.target.value = String(numericValue).slice(0, 2);
                                                }
                                            
                                                if (!isNaN(numericValue) && numericValue < 0) {
                                                e.target.value = "0";
                                                }}
                                            }
                                            
                                            error={ 
                                                (Number(cardYear) < Number(String(new Date().getFullYear()).slice(2, 4)) - 3
                                                || Number(cardYear) > Number(String(new Date().getFullYear()).slice(2, 4)) + 3)
                                                && cardYear.length > 0
                                                ? true : false
                                             }
                                            sx={{
                                                width: {
                                                    xs: '67px',
                                                    md: '80px',
                                                },
                                                padding: '1px',
                                                textAlign: 'center',
                                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                                    display: 'none'
                                                },
                                                '& input[type=number]': {
                                                    MozAppearance: 'textfield'
                                                }
                                            }}
                                        />
                                    </Grid2>
                                </Box>
                                
                                <Box>
                                    <TextField 
                                        size="small"
                                        placeholder="cvv"
                                        autoComplete="off"
                                        type="number"
                                        onChange={(e) => setCardCVV(String(e.currentTarget.value))}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const numericValue = parseFloat(e.target.value);
                                        
                                            if (!isNaN(numericValue) && numericValue > 999) {
                                            e.target.value = String(numericValue).slice(0, 3);
                                            }
                                        
                                            if (!isNaN(numericValue) && numericValue < 0) {
                                            e.target.value = "0";
                                            }}
                                        }
                                        sx={{
                                            width: {
                                                xs: '67px',
                                                md: '80px',
                                            },
                                            padding: '1px',
                                            textAlign: 'center',
                                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                                display: 'none'
                                            },
                                            '& input[type=number]': {
                                                MozAppearance: 'textfield'
                                            }
                                        }}
                                    />
                                </Box>
                            </Grid2>
                        </Box>
                    </Grid2>

                    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                    <Button
                        variant="outlined" 
                        color='primary' 
                        startIcon={<CreditScoreIcon />}
                        disabled={ 
                            cardNumberSectionOne.length === 4 
                            && cardNumberSectionTwo.length === 4 
                            && cardNumberSectionThree.length === 4 
                            && cardNumberSectionFour.length === 4 
                            && cardMonth.length < 3 && Number(cardMonth) > 0 && Number(cardMonth) <= 12
                            && cardYear.length === 2 
                            && Number(cardYear) >= Number(String(new Date().getFullYear()).slice(2, 4)) - 3
                            && Number(cardYear) <= Number(String(new Date().getFullYear()).slice(2, 4)) + 3
                            && cardCVV.length === 3
                                ? false 
                                : true 
                        }
                        onClick={() => {
                            setContactModal(false)
                            setCardModal(true)
                        }}
                    >
                        оплатить {totalPrice} ₽
                    </Button>
                </Box>
                </>
            }
        </Grid2>
    )
}