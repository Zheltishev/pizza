import { useSelector } from "react-redux";
import Header from "../../../components/header/Header";
import OrderHistory from "./OrderHistory";
import { RootState } from "../../../redux/store";
import { Box, Grid2 } from "@mui/material";

export default function Profile() {
    const { userId } = useSelector((state: RootState) => state.rootReducer.userDataSlice )

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
                    <OrderHistory  userId={userId} />
                </Box>
            </Grid2>
        </Box>
    )
}