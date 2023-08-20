import React, { useEffect } from 'react';
import './Money.css';
import Bill from './Bill';
import Coin from './Coin';
import { FaMoneyBill, FaBitcoin } from 'react-icons/fa';


function Money(props) {
    const showBill = props.bank.map((bill, index)=> <Bill key={index} id={bill[0]} type={bill[0]} amount={bill[1]}/>)
    const showCoin= props.coin.map((coin, index)=> <Coin key={index} id={coin[0]} type={coin[0]} amount={coin[1]}/>)
    return (
        <div className="Money">
            <table className="BillTable">
                <tbody>

                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    <tr className='InnerTr'>
                                        <td>
                                            <center><FaMoneyBill className='billIcon'/></center>
                                        </td>
                                        
                                    </tr>
                                    <tr className='InnerTr'>
                                        <td>
                                            <p className="moneyEle amountEle">Amount:</p>
                                        </td>
                                        
                                    </tr>
                            
                                </tbody>
                            </table>
                            
                        
                        </td>
                    {showBill}
                    </tr>
                </tbody>
                
            </table>

            <table className="CoinTable">
                <tbody>
                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    <tr className='InnerTr'>
                                        <td>
                                            <center><FaBitcoin className='coinIcon'/></center>
                                        </td>
                                    
                                    </tr>
                                    <tr className='InnerTr'>
                                        <td>
                                            <p className="moneyEle amountEle">Amount:</p>
                                        </td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                            
                        </td>
                    {showCoin}
                    </tr>
                </tbody>
            </table>
            

        </div>
    );
}

export default Money;