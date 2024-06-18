import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Results } from '../pages/Results';
import { Product } from '../pages/Product';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<Results />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
};

export default AppRoutes;
