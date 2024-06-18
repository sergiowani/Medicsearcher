import React from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { SearchBar } from "../components/SearchBar";
import { DarkMode } from "../components/DarkMode";
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from "react-router-dom";

/* estilos */

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  minWidth: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
  transition: 'background-color 0.3s, color 0.3s',
}));

const Title = styled(Typography)({
  fontSize: '6rem',
  marginBottom: 30,
  fontFamily: 'Arial, sans-serif',
  display: 'inline-block',
  cursor: 'default',
  '& span': {
    display: 'inline-block',
    transition: 'transform 0.3s ease',
  },
  '& span:hover': {
    transform: 'scale(1.2)',
  },
  '@media (max-width: 600px)': {
    fontSize: '4rem',
  },
});

/* componente */

export const Home = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth="lg" theme={{ palette: { mode: darkMode ? 'dark' : 'light' } }}>
      <Title variant="h3" gutterBottom>
        <span style={{ color: '#4285F4' }}>P</span>
        <span style={{ color: '#DB4437' }}>h</span>
        <span style={{ color: '#F4B400' }}>a</span>
        <span style={{ color: '#4285F4' }}>a</span>
        <span style={{ color: '#0F9D58' }}>r</span>
        <span style={{ color: '#DB4437' }}>m</span>
        <span style={{ color: '#4285F4' }}>a</span>
      </Title>
      {/* <SearchBar onClick={(text)=>{navigate(`/results?query=${text}`)}} /> */}
      <SearchBar onClick={(text)=>{navigate(`/results?query=${text}`)}} />
      <DarkMode />
    </StyledContainer>
  );
};
