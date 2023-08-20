import React ,{useState}from 'react';
import './Bill.css'

function Bill(props) {
    return (
        <td>
            <table>
                <tbody>
                    <tr className='InnerTr'>
                        <td>
                            <p className="moneyEle" id="billType">฿{props.type}</p>
                        </td>
                        
                    </tr>

                    <tr className='InnerTr'>
                        <td>
                            <p className="moneyEle">{props.amount}</p>
                        </td>   

                    </tr>

                </tbody>
            </table>
        </td>
        

    );
}

export default Bill;