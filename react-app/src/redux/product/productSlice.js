import {createSlice} from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name:'product',
    initialState:{
        items:[
        {
            id:1,
            imgUrl:'/assets/images/big-mac.jpeg',
            title:'Big Mac',
            price:2,
            count:0,
        },
        {
            id:2,
            imgUrl:'/assets/images/flip-flops.jpeg',
            title:'Flip Flops',
            price:3,
            count:0,
        },
        {
            id:3,
            imgUrl:'/assets/images/coca-cola-pack.jpeg',
            title:'Coca Cola Pack',
            price:5,
            count:0,
        },
        {
            id:4,
            imgUrl:'/assets/images/movie-ticket.jpeg',
            title:'Movie Ticket',
            price:12,
            count:0,
        },
        {
            id:5,
            imgUrl:'/assets/images/book.jpeg',
            title:'Book',
            price:15,
            count:0,
        },
        {
            id:6,
            imgUrl:'/assets/images/lobster-dinner.jpeg',
            title:'Lobster Dinner',
            price:45,
            count:0,
        },
    ],
    receiptItems: [],
    total: 0
    },
    reducers:{ 
        
        increment: (state, action) =>{
            const id = action.payload;
            const productItem = state.items.find(item =>item.id === id);
            
            // fişe eklemek için
            if(productItem.count ===0){
                state.receiptItems.push(productItem);
            }
            else if(productItem.count > 0){
                const receiptItem = state.receiptItems.find(item =>item.id === productItem.id);
                receiptItem.count+=1;
            }

            productItem.count +=1;  
        }, 

        decrease: (state, action) =>{
            const id = action.payload;
            const productItem = state.items.find(item =>item.id === id);
            const receiptItem = state.receiptItems.find(item =>item.id === productItem.id);

            if(productItem.count === 1){
                productItem.count=0;
                state.receiptItems = state.receiptItems.filter(item => item.id !== receiptItem.id);
            }
            else {
                productItem.count -=1;
                receiptItem.count-=1;
            }
        },
        
        calculation:(state, action) => {
            let totalPrice = 0;

            for (let i = 0; i < state.items.length; i++) {
                var item = state.items[i];

                if(item.count > 0)
                {
                    totalPrice += item.price * item.count;
                }
            }
            state.total = totalPrice;
        }

    }
})

export const {increment,decrease,calculation} = productSlice.actions;
export default productSlice.reducer;