
import { Box, AppBar, Toolbar, styled, Stack, Button } from '@mui/material';

import { IconLifebuoy, IconGift, IconBriefcase } from '@tabler/icons-react';
import { Typography } from '@mui/material';
import Link from "next/link";
import LivePreviewDropdown from './LivePreviewDropdown';
import BuyNowDropdown from './BuyNowDropdown';




const Topbar = () => {


    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: 'none',
        background: theme.palette.grey[600],
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: '61px',
        },
    }));
    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: '100%',
        color: theme.palette.text.secondary,
    }));

    const GhostButton = styled(Button)(({ theme }) => ({
        color: theme.palette.primary.contrastText,
        backgroundColor: "#ffffff00",
        boxShadow: "none",
        borderRadius: "999px",
        fontWeight: 400,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        "& .MuiButton-startIcon": {
            marginRight: "4px",
        }
    }));

    return (
        <AppBarStyled position="static">
            <ToolbarStyled>
                <Typography variant="h6">Topbar</Typography>
            </ToolbarStyled>
        </AppBarStyled>
    );
};


export default Topbar;
