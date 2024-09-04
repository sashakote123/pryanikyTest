import LoginForm from "./LoginForm";
import { Box } from "@mui/material";

const LoginPage = () => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
            <LoginForm />
        </Box>
    );
}

export default LoginPage