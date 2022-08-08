import { configureStore } from '@reduxjs/toolkit';

import balanceSlice from './blance/blanceSlice';
import productSlice from './product/productSlice';

export const store = configureStore({
    reducer: {
        blance: balanceSlice,
        product : productSlice,
    },
})