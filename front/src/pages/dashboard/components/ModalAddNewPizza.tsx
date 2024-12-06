import { Box, Button, Grid2, Stack, TextField, ToggleButton, ToggleButtonGroup, ToggleButtonProps, Typography, styled } from "@mui/material";
import { IModalAddPizza } from "../../../tsModals/tsModals";
import AddIcon from '@mui/icons-material/Add';
import GrassIcon from '@mui/icons-material/Grass';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
import createNewPizza from "../middleware/createNewPizza";

export default function ModalAddNewPizza(props: IModalAddPizza) {
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
      });
    const { changeModalAddPizza, changeUpdatePizzaList, updatePizzaList } = props
    const [newPizzaName, setNewPizzaName] = useState('')
    const [pizzaPrice, setPizzaPrice] = useState<number>(0)
    const [ingredientsList, setIngredientsList] = useState('')
    const [doughTypes, setDoughTypes] = useState<string[]>([])
    const [sizesType, setSizesTypes] = useState<string[]>([])
    const [hotStatus, setHotStatus] = useState(false)
    const [vegetarianStatus, setVegetarianStatus] = useState(false)
    const [meatStatus, setMeatStatus] = useState(false)
    const [mixStatus, setMixStatus] = useState(false)
    const [imageFile, setImageFile] = useState<File>()

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
                <Typography variant="h5" color="primary">
                    Добавить новую пиццу
                </Typography>

                <TextField 
                    label="название" 
                    variant="outlined" 
                    autoComplete="off" 
                            size="small"
                    sx={{
                        width: '100%'
                    }}
                    onChange={e => setNewPizzaName(e.currentTarget.value)}
                />

                <TextField 
                    label="ингредиенты" 
                    variant="outlined" 
                    autoComplete="off" 
                            size="small"
                    sx={{
                        width: '100%'
                    }}
                    onChange={e => setIngredientsList(e.currentTarget.value)}
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
                            size="small"
                            onChange={e => setPizzaPrice(Number(e.currentTarget.value))}
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
                        <GrassIcon 
                            color={vegetarianStatus ? 'primary' : 'disabled'} 
                            fontSize="large" 
                            sx={{cursor: 'pointer'}}
                            onClick={() => {setVegetarianStatus(!vegetarianStatus)}} 
                        />
                        <KebabDiningIcon 
                            color={meatStatus ? 'primary' : 'disabled'} 
                            fontSize="large" 
                            sx={{cursor: 'pointer'}}
                            onClick={() => {setMeatStatus(!meatStatus)}} 
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
                            ? setSizesTypes(sizesType.filter(e => e !== 'маленькая')) 
                            : setSizesTypes([...sizesType, 'маленькая']) }
                    >
                        маленькая
                    </StyledToggleButton>

                    <StyledToggleButton 
                        value='средняя'
                        sx={{
                            flexGrow: 1
                        }}
                        onClick={() => sizesType.includes('средняя') 
                            ? setSizesTypes(sizesType.filter(e => e !== 'средняя')) 
                            : setSizesTypes([...sizesType, 'средняя']) }
                    >
                        средняя
                    </StyledToggleButton>

                    <StyledToggleButton 
                        value='большая'
                        sx={{
                            flexGrow: 1
                        }}
                        onClick={() => sizesType.includes('большая') 
                            ? setSizesTypes(sizesType.filter(e => e !== 'большая')) 
                            : setSizesTypes([...sizesType, 'большая']) }
                    >
                        большая
                    </StyledToggleButton>
                </ToggleButtonGroup>

                <Box>
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
                                }
                            }}
                            multiple
                        />
                    </Button>
                </Box>

                <Button
                    variant="outlined" 
                    color='primary'
                    startIcon={<AddIcon />}
                    disabled={
                        newPizzaName.length > 2 && ingredientsList.length > 5 && 
                        doughTypes.length > 0 && sizesType.length > 0 && 
                        pizzaPrice > 0 && imageFile ? false : true
                    }
                    onClick={async () => {
                        if (imageFile) {
                            const doughTypesString = doughTypes.join(' ')
                            const sizesTypeString = sizesType.join(' ')

                            const result = await createNewPizza({newPizzaName, pizzaPrice, ingredientsList, doughTypesString, sizesTypeString, hotStatus, vegetarianStatus, meatStatus, mixStatus, imageFile})
                        
                            if (result) {
                                changeUpdatePizzaList(!updatePizzaList)
                                changeModalAddPizza(false)
                            }
                        }
                    }}
                >
                    добавить
                </Button>
            </Grid2>
        </Stack>
    )
}