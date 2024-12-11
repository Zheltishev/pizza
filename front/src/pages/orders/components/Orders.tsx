import Header from "../../../components/header/Header";
import { Box, Grid2 } from "@mui/material";
import OrderList from "./OrderList";

export default function Orders() {

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
                    <OrderList />
                </Box>
            </Grid2>
        </Box>
    )
}