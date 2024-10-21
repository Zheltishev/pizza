import { useSelector } from "react-redux";
import Header from "../../../components/header/Header";

export default function Profile() {
    const { userName } = useSelector((state) => state.rootReducer.userDataSlice )

    return (
        <>
            <Header />
            <> Hello {userName} </>
        </>
    )
}