import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: 'background.paper', mt: 'auto' }}>
      <Typography variant="body2" color="textSecondary">
        © 2024 Pryaniky.com
      </Typography>
    </Box>
  );
}

export default Footer;