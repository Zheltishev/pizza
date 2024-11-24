import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { IPizza } from "../../../tsModals/tsModals";

export default function DashboardItem({...pizza}: IPizza) {
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
          border: 0,
        },
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
        pizza_rating
    } = pizza
    const imgSRC = `http://localhost:8000/images/${pizza_image_name}.png`

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                <img src={imgSRC} alt={pizza_name} style={{ width: '30px' }} />
            </StyledTableCell>
            <StyledTableCell align="right">{pizza_id}</StyledTableCell>
            <StyledTableCell align="right">{pizza_name}</StyledTableCell>
            <StyledTableCell align="right">{pizza_price}</StyledTableCell>
            <StyledTableCell align="right">{pizza_size}</StyledTableCell>
            <StyledTableCell align="right">{pizza_dough}</StyledTableCell>
            <StyledTableCell align="right">{pizza_ingredients}</StyledTableCell>
            <StyledTableCell align="right">{pizza_hot.toString()}</StyledTableCell>
            <StyledTableCell align="right">{pizza_meat.toString()}</StyledTableCell>
            <StyledTableCell align="right">{pizza_vegetarian.toString()}</StyledTableCell>
            <StyledTableCell align="right">{pizza_mix.toString()}</StyledTableCell>
            <StyledTableCell align="right">{pizza_rating}</StyledTableCell>
        </StyledTableRow>
    )
}