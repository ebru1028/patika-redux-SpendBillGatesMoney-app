import React from 'react';
import {useEffect } from 'react';
import NumberFormat from 'react-number-format';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrease, calculation } from '../redux/product/productSlice';

const Home = () => {
    const blance = useSelector(state => state.blance.item);
    const total = useSelector(state => state.product.total);
    const products = useSelector(state => state.product.items);
    const receiptItems = useSelector(state => state.product.receiptItems)

    const dispatch = useDispatch();

    const handleClick = (id, e) => {
        e.preventDefault();
        dispatch(increment(id));
        dispatch(calculation());
    }

    useEffect(() => {
        dispatch(calculation());
    })

    return (
        <div>
            <section className='profile-info'>
                <div className='wrapper'>
                    <div className='inner'>
                        <img alt='' src='/assets/images/billgates.jpeg' className='profile-img' />
                        <h1>Spend Bill Gates' Money</h1>
                    </div>
                </div>
            </section>

            <section className='blance'>
                <div className='wrapper'>
                    <div className='inner'>
                        <NumberFormat className='many' value={blance - total} displayType={'text'} thousandSeparator={true} prefix={'$'}></NumberFormat>
                    </div>
                </div>
            </section>

            <section className='products'>
                <div className='wrapper'>
                    <div className='cards'>
                        {
                            products.map((product) =>

                                <div className='item' key={product.id}>
                                    <div className='inner'>
                                        <img alt='' src={product.imgUrl} className='profile-img' />
                                        <p className='title'>{product.title}</p>
                                        <p className='price'>
                                            <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'}></NumberFormat>
                                        </p>
                                        <div className='controls'>
                                            <button className={`btn-sell ${product.count > 0 ? "active" : ""}`} onClick={() => dispatch(decrease(product.id))}>Sell</button>
                                            <input type="number" className='piece' value={product.count} />
                                            <button className='btn-buy' onClick={(e) => handleClick(product.id, e)}>Buy</button>
                                        </div>
                                    </div>

                                </div>

                            )
                        }
                    </div>
                </div>
            </section>

            {
                receiptItems.length > 0 &&

                <section className='receipt'>
                    <div className='wrapper'>
                        <div className='inner'>
                            <div className='content'>
                                <h3>Your Receipt</h3>

                                <table>
                                    <tbody>
                                        {
                                            receiptItems.map((item) =>

                                                <tr key={item.id}>
                                                    <td>{item.title}</td>
                                                    <td>X {item.count}</td>
                                                    <td className='price'>
                                                        <NumberFormat className='many' defaultValue={item.count * item.price} displayType={'text'} thousandSeparator={true} prefix={'$'}></NumberFormat>
                                                    </td>
                                                </tr>

                                            )}
                                    </tbody>
                                </table>


                                <div className='black-line'></div>

                                <div className='total-price'>
                                    <p className='title'>TOTAL</p>
                                    <p className='price'>{total}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            }
        </div>
    );
};

export default Home;