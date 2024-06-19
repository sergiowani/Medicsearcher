import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { Search as SearchIcon, Backspace as BackspaceIcon } from "@mui/icons-material";
import { styled, useTheme } from "@mui/system";

/* estilos */

const SearchContainer = styled('div')(({ flexDirection, marginBottom, justifyContent, alignItems, marginTop }) => ({
  display: 'flex',
  flexDirection: flexDirection || 'column',
  alignItems: alignItems || 'center',
  justifyContent: justifyContent || 'flex-start',
  width: '100%',
  marginBottom: marginBottom !== undefined ? marginBottom : 30,
  marginTop: marginTop !== undefined ? marginTop : 0,
}));

const StyledTextField = styled(TextField)({
  marginBottom: 30,
  width: 'calc(100%/3)',
  '@media (max-width: 950px)': {
    width: '90%',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
  },
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 10,
  '& button': {
    textTransform: 'none',
  },
  '& button:nth-of-type(2)': {
    marginLeft: 10,
  },
  // Ocultar en tamaño tablet y móvil
  '@media (max-width: 950px)': {
    display: 'none',
  },
});

const StyledButton = styled(Button)(({ button1MarginLeft }) => ({
  backgroundColor: '#1a73e8',
  color: 'white',
  marginLeft: button1MarginLeft || 0,
  '&:hover': {
    backgroundColor: '#135ba1',
  },
}));

const StyledButton2 = styled(Button)({
  backgroundColor: '#34A853',
  color: 'white',
  '&:hover': {
    backgroundColor: '#337d47',
  },
});

const StyledInputAdornment = styled(InputAdornment)({
  height: '100%',
  '& button': {
    height: '100%',
    minWidth: 0,
    padding: 0,
  }
});

/* componente */

export const SearchBar = ({ flexDirection, marginBottom, justifyContent, alignItems, marginTop, button1MarginLeft, onClick }) => {
  const [query, setQuery] = useState(""); 
  const theme = useTheme();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onClick(query);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer 
      flexDirection={flexDirection} 
      marginBottom={marginBottom} 
      justifyContent={justifyContent} 
      alignItems={alignItems} 
      marginTop={marginTop}
    >
      <StyledTextField
        variant="outlined"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: query && (
            <StyledInputAdornment position="end">
              <Button onClick={handleClear} size="small">
                <BackspaceIcon />
              </Button>
            </StyledInputAdornment>
          ),
        }}
      />
      <ButtonContainer>
        <StyledButton 
          variant="contained" 
          style={{ marginLeft: button1MarginLeft }}
          onClick={handleSearch} 
        >Buscar con Phaarma
        </StyledButton>
        <StyledButton2 
          variant="contained" 
          onClick={handleSearch}
        >Voy a tener suerte
        </StyledButton2>
      </ButtonContainer>
    </SearchContainer>
  );
};
