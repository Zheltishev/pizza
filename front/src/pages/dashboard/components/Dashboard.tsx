import { Box, Button, Dialog, Grid2, InputAdornment, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Header from "../../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IPizza } from "../../../tsModals/tsModals";
import { useEffect, useRef, useState } from "react";
import { changePizzaList } from "../../../redux/pizzaListSlice";
import DashboardItem from "./DashboardItem";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ModalAddNewPizza from "./ModalAddNewPizza";
import ClearIcon from '@mui/icons-material/Clear';

export default function Dashboard() {
    const dispatch = useDispatch()
    const { pizzaList } = useSelector((state: RootState) => state.rootReducer.pizzaListSlice)
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
    const [modalAddPizza, setModalAddPizza] = useState(false)
    const [updatePizzaList, setUpdatePizzaList] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [throttleValue, setThrottleValue] = useState('')
    const inputSeach = useRef<HTMLInputElement>(null)

    const changeModalAddPizza = (value: boolean) => {
        setModalAddPizza(value)
    }

    const changeUpdatePizzaList = (value: boolean) => {
        setUpdatePizzaList(value)
    }
    
    useEffect(() => {
        fetch('http://localhost:8000/pizza-list')
            .then(res => res.json())
            .then(res => {
                dispatch(changePizzaList(res))
            })
    }, [dispatch, updatePizzaList])

    useEffect(() => {
        const throttleTimer = setTimeout(() => {
            setThrottleValue(searchValue)
        }, 500)

        return () => {
            clearTimeout(throttleTimer)
        }
    }, [searchValue])

    return (
        <Box>
            <Header />
            <Grid2 
                container 
                sx={{ 
                    justifyContent: 'center',
                    padding: '1rem' 
                }}
            >
                <Box sx={{ 
                    width: {
                        lg: '1600px',
                        xs: '100%'
                    }
                 }}>
                    <h1>Dashboard</h1>

                    <Grid2 container style={{ justifyContent: 'space-between', paddingBlock: '1rem' }}>
                        <Box>
                            <TextField 
                                size="small"
                                placeholder="найти"
                                value={searchValue}
                                inputRef={inputSeach}
                                slotProps={{
                                    input: {
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <ClearIcon 
                                            sx={{ 
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    color: '#f3b244'
                                                }
                                            }}
                                            onClick={() => {
                                                setSearchValue('')
                                                if (inputSeach.current) inputSeach.current.focus()
                                            }}
                                          />
                                        </InputAdornment>
                                      ),
                                    },
                                  }}
                                onChange={(e) => setSearchValue(e.currentTarget.value)}
                            />
                        </Box>
                        <Box>
                            <Button
                                variant="outlined" 
                                color='primary'
                                startIcon={<NoteAddIcon />}
                                onClick={() => setModalAddPizza(true)}
                            >
                                добавить
                            </Button>
                        </Box>
                    </Grid2>

                    <TableContainer component={Paper}>
                        <Table aria-label="table">
                            <TableHead>
                                <TableRow>
                                <StyledTableCell>Image</StyledTableCell>
                                <StyledTableCell align="right">Id</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                                <StyledTableCell align="right">Price</StyledTableCell>
                                <StyledTableCell align="right">Size</StyledTableCell>
                                <StyledTableCell align="right">Dough</StyledTableCell>
                                <StyledTableCell align="right">Ingredients</StyledTableCell>
                                <StyledTableCell align="right">Hot</StyledTableCell>
                                <StyledTableCell align="right">Meat</StyledTableCell>
                                <StyledTableCell align="right">Vegetarian</StyledTableCell>
                                <StyledTableCell align="right">Mix</StyledTableCell>
                                <StyledTableCell align="right">Rating</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pizzaList
                                    .filter((pizza: IPizza) => throttleValue 
                                        ? pizza.pizza_name.toLowerCase().includes(throttleValue) || pizza.pizza_ingredients.toLowerCase().includes(throttleValue)
                                        : pizza )
                                    .map((pizza: IPizza) => (
                                        <DashboardItem key={pizza.pizza_id} changeUpdatePizzaList={changeUpdatePizzaList} updatePizzaList={updatePizzaList} {...pizza}/>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    
                </Box>
            </Grid2>

            {modalAddPizza && 
                <Dialog 
                    open={modalAddPizza}
                    onClose={() => setModalAddPizza(false)}
                >
                    <ModalAddNewPizza changeModalAddPizza={changeModalAddPizza} changeUpdatePizzaList={changeUpdatePizzaList} updatePizzaList={updatePizzaList} />
                </Dialog>}
        </Box>
    )
}