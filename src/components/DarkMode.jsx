import React from "react";
import { Switch } from "@mui/material";
import { styled } from "@mui/system";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../contexts/ThemeContext';

/* estilos */

const SwitchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

/* componente */

export const DarkMode = () => {
  const { darkMode, toggleTheme } = useTheme();

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <SwitchContainer>
      <Brightness7Icon style={{ marginRight: 5 }} /> {/* Sol (modo claro) */}
      <Switch
        checked={darkMode}
        onChange={handleThemeChange}
        color="primary"
        inputProps={{ 'aria-label': 'toggle dark mode' }}
      />
      <Brightness4Icon style={{ marginLeft: 5 }} /> {/* Luna (modo oscuro) */}
    </SwitchContainer>
  );
};