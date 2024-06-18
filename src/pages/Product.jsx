import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

/* estilos */

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  minWidth: 'calc(100vw - 17px)',
  paddingTop: 20,
  paddingBottom: 20,
  textAlign: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
  transition: 'background-color 0.3s, color 0.3s',
}));

const StyledTitle = styled(Typography)({
  marginBottom: 20,
});


const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: 20,
  marginBottom: 20,
  backgroundColor: theme.palette.mode === 'dark' ? '#383838' : '#f0f0f0',
  padding: theme.spacing(2),
  borderRadius: 8,
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  '& table': {
    borderCollapse: 'collapse',
    width: '100%',
  },
  '& th, td': {
    border: `1px solid ${theme.palette.mode === 'dark' ? '#666666' : '#dddddd'}`,
    padding: theme.spacing(1),
    textAlign: 'left',
  },
}));

/* componente */

export const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const query = location.state?.query;

  // Función para convertir el string de la tabla en JSX
  const parsearTablaHTML = (tablaString) => {
    let temporal = document.createElement('div');
    temporal.innerHTML = tablaString.trim();

    let tablaHTML = temporal.querySelector('table');

    return tablaHTML;
  };

  // Función para renderizar el valor
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      if (value.some(item => typeof item === 'string' && item.includes('<table'))) {
        return value.map((item, index) => {
          const tablaJSX = parsearTablaHTML(item);
          if (tablaJSX) {
            return (
              <TableContainer key={index} component={Paper} style={{ marginTop: 10 }}>
                <div dangerouslySetInnerHTML={{ __html: item }} />
              </TableContainer>
            );
          } else {
            return null;
          }
        });
      } else {
        return value.join(', ');
      }
    } else if (typeof value === 'object' && value !== null) {
      const filteredEntries = Object.entries(value).filter(([key, val]) => !key.toLowerCase().includes('table'));

      return (
        <StyledTableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableBody>
              {filteredEntries.map(([k, v]) => (
                <TableRow key={k}>
                  <TableCell>{k}</TableCell>
                  <TableCell>{renderValue(v)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      );
    } else {
      return String(value);
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <StyledTitle variant="h4">Detalles del medicamento</StyledTitle>
        {/* Mostrar detalles de openfda */}
        <Typography variant="h5">{product.openfda?.generic_name}</Typography>
        <Typography>{product.openfda?.brand_name}</Typography>
        
        {/* Mostrar detalles de todas las propiedades de product */}
        <StyledTableContainer>
          <Table>
            <TableBody>
              {Object.entries(product).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{renderValue(value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      <Button variant="contained" color="primary" onClick={() => navigate(`/results?query=${query}`)}>
        Volver a Resultados
      </Button>
    </StyledContainer>
  );
};
