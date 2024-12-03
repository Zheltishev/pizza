import { Dialog, styled, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { IDashboardItem } from "../../../tsModals/tsModals";
import CloseIcon from '@mui/icons-material/Close';
import GrassIcon from '@mui/icons-material/Grass';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import { useState } from "react";
import ModalChangePizzaProps from "./ModalChangePizzaProps";

export default function DashboardItem({...dashboardItem}: IDashboardItem) {
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
          border: 0,
        },
        '&:hover': {
          backgroundColor: '#555555'
        }
      }));
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
    const {
        pizza_id,
        pizza_name,
        pizza_image_name,
        pizza_price,
        pizza_size,
        pizza_dough,
        pizza_ingredients,
        pizza_hot,
        pizza_meat,
        pizza_vegetarian,
        pizza_mix,
        pizza_rating,
        changeUpdatePizzaList, 
        updatePizzaList
    } = dashboardItem
    const imgSRC = `http://localhost:8000/images/${pizza_image_name}.png`
    const [modalChangePizza, setModalChangePizza] = useState(false)

    const openModalChangePizza = (value: boolean) => {
        setModalChangePizza(value)
    }

    return (
        <>
          <StyledTableRow
            onClick={() => {
              setModalChangePizza(true)
            }}
          >
              <StyledTableCell component="th" scope="row">
                  <img src={imgSRC} alt={pizza_name} style={{ width: '30px' }} />
              </StyledTableCell>
              <StyledTableCell align="right">{pizza_id}</StyledTableCell>
              <StyledTableCell align="right">{pizza_name}</StyledTableCell>
              <StyledTableCell align="right">{pizza_price}</StyledTableCell>
              <StyledTableCell align="right">{pizza_size}</StyledTableCell>
              <StyledTableCell align="right">{pizza_dough}</StyledTableCell>
              <StyledTableCell align="right">{pizza_ingredients}</StyledTableCell>
              <StyledTableCell align="center">{pizza_hot ? <LocalFireDepartmentIcon color="primary" /> : <CloseIcon color="error" />}</StyledTableCell>
              <StyledTableCell align="center">{pizza_meat ? <KebabDiningIcon color="primary" /> : <CloseIcon color="error" />}</StyledTableCell>
              <StyledTableCell align="center">{pizza_vegetarian ? <GrassIcon color="primary" /> : <CloseIcon color="error" />}</StyledTableCell>
              <StyledTableCell align="center">{pizza_mix ? <JoinLeftIcon color="primary" /> : <CloseIcon color="error" />}</StyledTableCell>
              <StyledTableCell align="right">{pizza_rating}</StyledTableCell>
          </StyledTableRow>
          
          {modalChangePizza && 
                <Dialog 
                    open={modalChangePizza}
                    onClose={() => setModalChangePizza(false)}
                >
                    <ModalChangePizzaProps 
                      openModalChangePizza={openModalChangePizza}
                      changeUpdatePizzaList={changeUpdatePizzaList} 
                      updatePizzaList={updatePizzaList} 
                      pizzaId={pizza_id} 
                    />
                </Dialog>}
        </>
    )
}