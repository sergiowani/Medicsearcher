import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { DarkMode } from './DarkMode';

/* estilos */

const Logo = styled(Typography)({
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '& span': {
    display: 'inline-block',
    transition: 'transform 0.3s ease',
  },
  '& span:hover': {
    transform: 'scale(1.2)',
  },
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
  transition: 'background-color 0.3s, color 0.3s',
}));

const ToolbarContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    '& .MuiToolbar-root': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));

/* componente */

export default function AppNavBar({ onClick }) {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <ToolbarContainer>
      <StyledAppBar position="static">
        <Toolbar>
          <Logo 
            variant="h4" 
            component="div" 
            sx={{ flexGrow: 1 }} 
            onClick={handleClick}
          >
            <span style={{ color: '#4285F4' }}>P</span>
            <span style={{ color: '#DB4437' }}>h</span>
            <span style={{ color: '#F4B400' }}>a</span>
            <span style={{ color: '#4285F4' }}>a</span>
            <span style={{ color: '#0F9D58' }}>r</span>
            <span style={{ color: '#DB4437' }}>m</span>
            <span style={{ color: '#4285F4' }}>a</span>
          </Logo>
          <SearchBar 
            flexDirection="row" 
            marginBottom={0} 
            justifyContent="center" 
            alignItems="baseline" 
            marginTop={20} 
            button1MarginLeft={10} 
            onClick={onClick} 
          />
          <DarkMode 
            checked={darkMode} 
            onChange={toggleTheme} 
          />
        </Toolbar>
      </StyledAppBar>
    </ToolbarContainer>
  );
}
