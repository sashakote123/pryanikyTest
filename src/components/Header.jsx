import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Header = ({handleLogout}) => {
    return (<AppBar position="static">
        <Toolbar>
            <Typography variant="h6">
                Pryaniky.com dataBase
            </Typography>
            <Box sx={{ marginLeft: 'auto' }}>
                <Button color="inherit" onClick={handleLogout}>
                    Выйти
                </Button>
            </Box>
        </Toolbar>
    </AppBar>);
}

export default Header;