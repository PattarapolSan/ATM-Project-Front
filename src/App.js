import logo from './logo.svg';
import './App.css';
import Money from './Money';
import React, {useEffect, useState} from 'react';
import { Button, Input, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';





function App() {

  const [screen, setScreen] = useState('main');
  const [getBill, setGetBill] = useState([]);
  const [getCoin, setGetCoin] = useState([]);
  const [valErr, setValErr] = useState(false);
  const [btnErr, setBtnErr] = useState(true);
  const [withdrawAmount, setWithdraw] = useState('');
  const [bank, setBank] = useState([]);
  const [coin, setCoin] = useState([]);
 
 
 



  
  function getMoney() {
    axios.get("http://localhost:8080/money").then((response) => {

     setBank(response.data.bill);
     setCoin(response.data.coin);

    });
  }


  function doWithdraw() {
    let totalMoney = 0;
    bank.map((value)=> totalMoney += value[0][1] )
    coin.map((value)=> totalMoney += value[0][1])
    
    if (withdrawAmount > totalMoney) {
      setScreen('error');
    }
    else {
      axios.post("http://localhost:8080/withdraw",
    {
      amount: withdrawAmount
    }).then((response) => {
      // console.log(response.data.moneyResult)
      // console.log(response.data.moneyResult[0])
      // console.log(response.data.moneyResult[1])
      getMoney();
      let money = response.data.moneyResult;
      setGetBill(money[0]);
      setGetCoin(money[1]);
      if (money[0][0].length === 0) {
        setScreen('error');
      }
      else {
        setGetBill(money[0].filter((bill) => bill[1] !== 0));
        setGetCoin(money[1].filter((coin) => coin[1] !== 0));
        setScreen('result');
      }
    

      });
      
    }
    
      
      
      
    }

    useEffect(() => {
        getMoney();
    },[])

    


  function checkValid(e){

    let variable = e.target.value;
    
    if(!Number(variable) && variable !== '') {
      setValErr(true);
      setBtnErr(true);
      document.getElementById('AppBaseId').style.filter = "drop-shadow(1px 0px 50px rgba(250, 1, 1, 0.436))";
    }
    else if(variable === '') {
      setBtnErr(true);
    }   

    else{
      setWithdraw(variable);
      setValErr(false);
      setBtnErr(false);
      
      document.getElementById('AppBaseId').style.filter = "drop-shadow(1px 0px 30px rgb(113, 237, 229))";
    }
  }

  const withdrawBtn = <Button color="danger" size="lg" onClick={doWithdraw} disabled={btnErr}>Withdraw</Button>;
  const doneBtn = <Button color="success" size="lg" onClick={() => setScreen('main')}>Done</Button>;
  const errorBtn =   <Button color="warning" size="lg" onClick={() => setScreen('main')}>Back</Button>;

  const mainScreen = (
      
    <div className='mainScreen'>
      <center><p className='screenTitle'>Amount to withdraw</p></center>
      <center><Input bsSize="lg" placeholder='Enter amount' id='amount_input' invalid={valErr} onChange={checkValid}/></center>
      <center>{valErr ? <p className='inputStat'>Input Invalid</p> : <p className='inputStat'>&nbsp;</p>}</center>
    </div>



 
);

/*
const resultScreen = (
    <p></p>
  );
*/
const resultScreen = (
  <div className='inputField'>
    <center><p className='screenTitle'>Summary</p></center>
    <center>
        <tr>
            <th>
                Withdraw:
            </th>
            <th>
                ฿{withdrawAmount}
            </th>
        </tr>
        { getCoin.length === 0 ? <tr></tr> :
                <tr>
                <th>
                    Coin
                </th>
                <th>
                    Amount
                </th>
            </tr>
            
        }
        
        
            {getCoin.map((element, index) => 
                        <tr key={index}>
                            <td>{element[0]}</td>
                            <td>{element[1]}</td>
                        </tr>
                )}
            { getBill.length === 0 ? <tr></tr> :
                <tr>
                <th>
                    Bill
                </th>
                <th>
                    Amount
                </th>
            </tr>
            
        }

                {getBill.map((element, index) => 
                    <tr key={index}>
                        <td>{element[0]}</td>
                        <td>{element[1]}</td>
                    </tr>
            )}
        
    </center>
</div>
);




const errorScreen = (
    <h1>Not Enough Money</h1>
);

/*
<div className='moneyContainer'>
            <Money bank={bank} coin={coin}/>

            </div>
*/
    

  return (
    <div className="App">
      <div className="AppBase" id="AppBaseId">
        <div className='titleContainer'>
            <p className='title'>ATM V2</p>
        </div>
        <div className='moneyContainer'>
            <Money bank={bank} coin={coin}/>

            </div>
  
        
        <div className='contentContainer'> 

          <div className='Content'>
              {screen === 'main'? mainScreen : screen === 'result' ? resultScreen : errorScreen}
          </div>
          
        </div>
        <div className='buttonContainer'> 
          <div className='button'>
            {screen === 'main'? withdrawBtn : screen === 'result' ? doneBtn : errorBtn}
          </div>
          </div>
      </div>
      </div>
    

  );
}

export default App;
