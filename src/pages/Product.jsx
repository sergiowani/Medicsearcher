import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableRow, useMediaQuery, Box } from '@mui/material';
import { styled, useTheme  } from '@mui/material/styles';
import parse from 'html-react-parser';

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
  const theme = useTheme();
  const product = location.state?.product;
  const query = location.state?.query;
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));

  // creo un array de string de todas las claves del objeto product
  const propiedades = Object.keys(product);

  // hago un array de objetos, por cada propiedad de product creo un objeto con un título y un contenido para pintar abajo
  const final = propiedades.map(e=>{
    return {title: e, contenido: product[e]}
  });

  // función para capitalizar la primera letra y reemplazar guiones bajos
  const titleFunction = (str) => {
    const result = str.replace(/_/g, ' ');
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const desktopContent = (
    <>
      <StyledTitle variant="h4">Detalles del medicamento</StyledTitle>
      <Typography variant="h5">{product.openfda?.generic_name}</Typography>
      <Typography>{product.openfda?.brand_name}</Typography>
      <StyledTableContainer>
        <Table>
          <TableBody>
            {final.map((e, i) => (
              <TableRow key={i}>
                <TableCell>{titleFunction(e.title)}</TableCell>
                <TableCell>
                  {typeof e.contenido === "string" && <p>{e?.contenido}</p>}
                  {Array.isArray(e.contenido) && e.contenido.map((elem, idx) => {
                    return e.title.includes("table") ? parse(elem) : <p key={idx}>{elem}</p>;
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/results?query=${query}`)}
      >
        Volver a Resultados
      </Button>
    </>
  );

  const tabletContent = (
    <>
      <StyledTitle variant="h5">Detalles del medicamento</StyledTitle>
      <Typography variant="h6">{product.openfda?.generic_name}</Typography>
      <Typography>{product.openfda?.brand_name}</Typography>
      <Box>
        {final.map((e, i) => (
          <Box key={i} mb={2}>
            <Typography 
              variant="h6" 
              sx={{ textDecoration: 'underline' }}
            >{titleFunction(e.title)}
            </Typography>
            <Box sx={{ textAlign: 'left' }}>
              {typeof e.contenido === "string" && <Typography>{e?.contenido}</Typography>}
              {Array.isArray(e.contenido) && e.contenido.map((elem, idx) => {
                return e.title.includes("table") ? parse(elem) : <Typography key={idx}>{elem}</Typography>;
              })}
            </Box>
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/results?query=${query}`)}
      >
        Volver a Resultados
      </Button>
    </>
  );

  return (
    <StyledContainer maxWidth={isTabletOrMobile ? "sm" : "lg"}>
      {isTabletOrMobile ? tabletContent : desktopContent}
    </StyledContainer>
  );
};
