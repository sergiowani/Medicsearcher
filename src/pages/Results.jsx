import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppNavBar from '../components/AppNavBar';
import useAxios from '../hooks/useFetch';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material';
import { Container, Typography, Link as MuiLink } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

/* estilos */

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  minWidth: '100vw',
  paddingTop: 20,
  paddingBottom: 20,
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
  transition: 'background-color 0.3s, color 0.3s',
}));

const StyledTitle = styled(Typography)({
  marginBottom: 20,
  '@media (max-width: 600px)': {
    fontSize: '1.5rem',

  },
});

const StyledList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  '& li': {
    marginBottom: 10,
  },
});

const LoadingMessage = styled(Typography)({
  marginTop: 20,
  color: 'orange',
  fontSize: '1.5rem',
});

const ErrorMessage = styled(Typography)({
  marginTop: 20,
  color: 'red',
  fontSize: '1.5rem',
});

const StyledLink = styled(MuiLink)({
  cursor: 'pointer',
});

/* componente */

export const Results = () => {
  const [drugs, setDrugs] = useState([]);
  const location = useLocation();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');

  let url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}+OR+openfda.generic_name:${query}&limit=10`

  const { response, loading } = useAxios({ url, method: 'get' })

  useEffect(() => {
    if (response !== null) {
      setDrugs(response);
    }
  },[loading, response])

  return (
    <div>
      {/* <AppNavBar onClick={(text)=>{setQuery(text)}} /> */}
      <AppNavBar onClick={(text)=>{navigate(`/results?query=${text}`)}} />
      <StyledContainer maxWidth="lg" theme={{ palette: { mode: darkMode ? 'dark' : 'light' } }}>
        <StyledTitle variant="h4">Resultados de búsqueda para "{query}":
        </StyledTitle>
        {loading && <LoadingMessage>Cargando...</LoadingMessage>}
        <StyledList>
        {drugs.length < 1 ? (
              <ErrorMessage>No se encontraron resultados.</ErrorMessage>
            ) : (
              drugs.map((drug, index) => (
                <li key={index}>
                  <StyledLink  component="a" onClick={() => navigate(`/product/${drug.id}`, { state: { product: drug, query: query } })}>
                    {drug.openfda.generic_name} ({drug.openfda.brand_name}) ({drug.openfda.route})
                  </StyledLink >
                </li>
              ))
            )}
        </StyledList>
      </StyledContainer>
    </div>
  );
};
