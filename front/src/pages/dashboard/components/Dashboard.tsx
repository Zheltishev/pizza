import { Box, Button, Grid2, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import Header from "../../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IPizza } from "../../../tsModals/tsModals";
import { useEffect } from "react";
import { changePizzaList } from "../../../redux/pizzaListSlice";
import DashboardItem from "./DashboardItem";

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
    
    useEffect(() => {
        fetch('http://localhost:8000/pizza-list')
            .then(res => res.json())
            .then(res => {
                dispatch(changePizzaList(res))
            })
    }, [dispatch])

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

                    <Grid2 style={{ paddingBlock: '1rem' }}>
                        <Box>
                            <Button>добавить</Button>
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
                                {pizzaList.map((pizza: IPizza) => (
                                    <DashboardItem key={pizza.pizza_id} {...pizza}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    
                </Box>
            </Grid2>
        </Box>
    )
}