import { Box, Button, Grid2, Stack, styled, TextField, ToggleButton, ToggleButtonGroup, ToggleButtonProps, Typography } from "@mui/material"
import { IModalChangePizza, IPizzaItem } from "../../../tsModals/tsModals"
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import GrassIcon from '@mui/icons-material/Grass';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import getPizzaData from "../middleware/getPizzaData";
import ImageIcon from '@mui/icons-material/Image';
import { useEffect, useState } from "react";
import changePizzaText from "../middleware/changePizzaText";
import changePizzaTextAndImage from "../middleware/changePizzaTextAndImage";

export default function ModalChangePizzaProps(props: IModalChangePizza) {
    const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps>({
        textTransform: 'none'
    })
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      })
    const {pizzaId, openModalChangePizza, changeUpdatePizzaList, updatePizzaList} = props
    const [pizzaData, setPizzaData] = useState<IPizzaItem>()
    const [isLoading, setIsLoading] = useState(true)
    const [pizzaName, setPizzaName] = useState('')
    const [pizzaIngredients, setPizzaIngredients] = useState('')
    const [pizzaPrice, setPizzaPrice] = useState('')
    const [doughTypes, setDoughTypes] = useState<string[]>([])
    const [sizesType, setSizesType] = useState<string[]>([])
    const [hotStatus, setHotStatus] = useState(false)
    const [vegetarianStatus, setVegetarianStatus] = useState(false)
    const [meatStatus, setMeatStatus] = useState(false)
    const [mixStatus, setMixStatus] = useState(false)
    const [currentImageName, setCurrentImageName] = useState('')
    const [imageFile, setImageFile] = useState<File>()
    const imgSRC = `http://localhost:8000/images/${currentImageName}.png`
    
    useEffect(() => {
        async function checkPizzaById() {
            const result = await getPizzaData(pizzaId) as IPizzaItem

            setPizzaData(result)
            setIsLoading(false)
            setPizzaName(result.pizza_name)
            setPizzaIngredients(result.pizza_ingredients)
            setPizzaPrice(String(result.pizza_price))
            setDoughTypes(result.pizza_dough ? result.pizza_dough.split(' ') : [])
            setSizesType(result.pizza_size ? result.pizza_size.split(' ') : [])
            setHotStatus(result.pizza_hot)
            setVegetarianStatus(result.pizza_vegetarian)
            setMeatStatus(result.pizza_meat)
            setMixStatus(result.pizza_mix)
            setCurrentImageName(result.pizza_image_name)
        }

        checkPizzaById()
    }, [])

    return (
        <Stack
            sx={{
                padding: {
                    md: 5,
                    xs: 2
                },
                overflow: 'auto',
                minWidth: {
                    xs: 300,
                    md: 600
                }
            }}
        >
            <Grid2
                container
                spacing={2}
                sx={{ 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center' 
                }} 
            >
                {isLoading ? 
                    <div>loading...</div>
                    : <>
                        <Typography variant="h5" color="primary">
                            Изменить значения пиццы 
                        </Typography>

                        <TextField 
                            label="название"
                            variant="outlined" 
                            autoComplete="off" 
                            size="small"
                            defaultValue={pizzaData?.pizza_name}
                            sx={{
                                width: '100%'
                            }}
                            onChange={(e) => setPizzaName(e.currentTarget.value)}
                        />

                        <TextField 
                            label="ингредиенты" 
                            variant="outlined" 
                            autoComplete="off" 
                            size="small"
                            defaultValue={pizzaData?.pizza_ingredients}
                            sx={{
                                width: '100%'
                            }}
                            onChange={(e) => setPizzaIngredients(e.currentTarget.value)}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '15px',
                                width: '100%'
                            }}
                        >
                            <Box>
                                <TextField 
                                    label="цена" 
                                    variant="outlined" 
                                    autoComplete="off"
                                    defaultValue={pizzaData?.pizza_price}
                                    size="small"
                                    onChange={(e) => setPizzaPrice(e.currentTarget.value)}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px'
                                }}
                            >
                                <LocalFireDepartmentIcon 
                                    color={hotStatus ? 'primary' : 'disabled'} 
                                    fontSize="large"
                                    sx={{cursor: 'pointer'}}
                                    onClick={() => {setHotStatus(!hotStatus)}} 
                                />
                                <KebabDiningIcon 
                                    color={meatStatus ? 'primary' : 'disabled'} 
                                    fontSize="large" 
                                    sx={{cursor: 'pointer'}}
                                    onClick={() => {setMeatStatus(!meatStatus)}} 
                                />
                                <GrassIcon 
                                    color={vegetarianStatus ? 'primary' : 'disabled'} 
                                    fontSize="large" 
                                    sx={{cursor: 'pointer'}}
                                    onClick={() => {setVegetarianStatus(!vegetarianStatus)}} 
                                />
                                <JoinLeftIcon 
                                    color={mixStatus ? 'primary' : 'disabled'} 
                                    fontSize="large" 
                                    sx={{cursor: 'pointer'}}
                                    onClick={() => {setMixStatus(!mixStatus)}} 
                                />
                            </Box>
                        </Box>

                        <ToggleButtonGroup 
                            color="primary" 
                            value={doughTypes}
                            size="small"
                            sx={{width: '100%'}}
                        >
                            <StyledToggleButton 
                                value='традиционное'
                                sx={{flexGrow: 1}}
                                onClick={() => doughTypes.includes('традиционное') 
                                    ? setDoughTypes(doughTypes.filter(e => e !== 'традиционное')) 
                                    : setDoughTypes([...doughTypes, 'традиционное']) }
                            >
                                традиционное
                            </StyledToggleButton>

                            <StyledToggleButton 
                                value='тонкое'
                                sx={{flexGrow: 1}}
                                onClick={() => doughTypes.includes('тонкое') 
                                    ? setDoughTypes(doughTypes.filter(e => e !== 'тонкое')) 
                                    : setDoughTypes([...doughTypes, 'тонкое']) }
                            >
                                тонкое
                            </StyledToggleButton>
                        </ToggleButtonGroup>

                        <ToggleButtonGroup 
                            color="primary" 
                            value={sizesType}
                            size="small"
                            sx={{width: '100%'}}
                        >
                            <StyledToggleButton 
                                value='маленькая'
                                sx={{
                                    flexGrow: 1
                                }}
                                onClick={() => sizesType.includes('маленькая') 
                                    ? setSizesType(sizesType.filter(e => e !== 'маленькая')) 
                                    : setSizesType([...sizesType, 'маленькая']) }
                            >
                                маленькая
                            </StyledToggleButton>

                            <StyledToggleButton 
                                value='средняя'
                                sx={{
                                    flexGrow: 1
                                }}
                                onClick={() => sizesType.includes('средняя') 
                                    ? setSizesType(sizesType.filter(e => e !== 'средняя')) 
                                    : setSizesType([...sizesType, 'средняя']) }
                            >
                                средняя
                            </StyledToggleButton>

                            <StyledToggleButton 
                                value='большая'
                                sx={{
                                    flexGrow: 1
                                }}
                                onClick={() => sizesType.includes('большая') 
                                    ? setSizesType(sizesType.filter(e => e !== 'большая')) 
                                    : setSizesType([...sizesType, 'большая']) }
                            >
                                большая
                            </StyledToggleButton>
                        </ToggleButtonGroup>

                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: {
                                md: 'row',
                                xs: 'column'
                            },
                            gap: '10px', 
                            alignItems: 'center' 
                            }}>
                            
                            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                                {imageFile ? <ImageIcon /> : <img src={imgSRC} alt={pizzaName} style={{ width: '30px' }} />}
                                <Typography variant="subtitle1">{currentImageName}</Typography>
                            </Box> 

                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Загрузить изображение
                                <VisuallyHiddenInput
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(event) => {
                                        const files = (event.target as HTMLInputElement).files

                                        if (files && files.length > 0) {
                                            setImageFile(files[0])
                                            setCurrentImageName(files[0].name)
                                        }
                                    }}
                                    multiple
                                />
                            </Button>
                        </Box>

                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Button
                                variant="outlined" 
                                color='primary'
                                startIcon={<FlipCameraAndroidIcon />}
                                disabled={
                                    pizzaIngredients.length > 5 && doughTypes.length > 0 && sizesType.length > 0 ? false : true
                                }
                                onClick={async () => {
                                    const doughTypesString = doughTypes.join(' ')
                                    const sizesTypeString = sizesType.join(' ')
                                    const updateResult = () => {
                                        if (imageFile) {
                                            return changePizzaTextAndImage({
                                                pizzaId, 
                                                pizzaName, 
                                                currentImageName, 
                                                pizzaPrice, 
                                                pizzaIngredients, 
                                                sizesTypeString, 
                                                doughTypesString, 
                                                hotStatus, 
                                                vegetarianStatus, 
                                                meatStatus, 
                                                mixStatus, 
                                                imageFile
                                            })
                                        } else {
                                            return changePizzaText({
                                                pizzaId, 
                                                pizzaName, 
                                                currentImageName, 
                                                pizzaPrice, 
                                                pizzaIngredients, 
                                                sizesTypeString, 
                                                doughTypesString, 
                                                hotStatus, 
                                                vegetarianStatus, 
                                                meatStatus, 
                                                mixStatus
                                            })
                                        }
                                    }
                                    
                                    if (await updateResult()) {
                                        changeUpdatePizzaList(!updatePizzaList)
                                        openModalChangePizza(false)
                                    }
                                }}
                            >
                                изменить
                            </Button>
                        </Box>
                    </>
                }
            </Grid2>
        </Stack>
    )
}