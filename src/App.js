import logo from './logo.svg';
import './App.css';
import * as React from 'react';

function App() {
  
  const [selected, setSelected] = React.useState('');
  const [money, setMoney] = React.useState('');
  const [returnMoney, setReturnMoney] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);
  const [cashBackDetail, setCashDetail] = React.useState({});

  const products = [
    {name: 'Fanta', price: 5},
    {name: 'Cola', price: 6},
    {name: 'Sprite', price: 7},
    {name: 'Tea', price: 8},
  ];

  const fractions = [50, 100, 20, 25, 5, 10,  1];

  const selectedChangeHandler = (event) => {
    let name = products[event.target.value].name;
    let price = products[event.target.value].price;
    setSelected({name: name, price: price});

  };

  const moneyChangeHandler = (event) => {
    setMoney(event.target.value);
  };

  const btnClickHandler = () => {
    
    let cashBack = money - selected.price;
    
    setReturnMoney(cashBack);
    let cashBackList = [];

    let descFraction = fractions.sort(function(a, b){return b-a});

    let tempCashback = 0;

    let i = 0;
    while (cashBack > 0) {
      if(typeof descFraction[i] !== 'number'){
        i = 0; 
      }

      tempCashback = cashBack - descFraction[i];
      if(tempCashback >= 0) cashBack = tempCashback;

      if((cashBack >= 0) && (tempCashback >= 0)) cashBackList.push(descFraction[i]);

      i++;

    }

    var countCashBack = {};
    cashBackList.forEach((i) => { countCashBack[i] = ++countCashBack[i]|| 1});
    // console.log("countCashBack: ", countCashBack);

    setCashDetail(countCashBack);

    setShowResult(true);

    
  }

  const resetClickHandler = () => {
    setSelected('');
    setReturnMoney(0);
    setShowResult(false);
    setCashDetail({});
    setMoney('');
  }

  return (
    <>

      <h1>
          Excercise Vending Machine - Singa Fintech

      </h1>
      <p><strong> by Adnan Kasim (adnankasim8@gmail.com)</strong></p> 

      <div>
        <h4>Daftar Uang Pecahan</h4>
        <ul>
          {fractions.map((value, index) => <li key={index++}>Rp. {value},-</li>)}
        </ul>
      </div>

      <div>
      <h4>Daftar Produk & harganya</h4>
      <select 
        disabled={showResult ? true : false}
        // value={selected} 
        onChange={selectedChangeHandler}
      >
        <option value="">-- Daftar --</option>
        {products.map((value, index) => <option key={index} value={index}> {value.name} (Rp. {value.price},-)</option>)}
      </select>
      </div>

      <div>
        <h4>Jumlah Uang anda inputkan: </h4>
        <input disabled={showResult ? true : false} type="text" value={money} onChange={moneyChangeHandler} />
      </div>

      <div>
        <br />
        <button disabled={selected ? false : true} onClick={btnClickHandler}>Beli</button>
        <button onClick={resetClickHandler}>Reset</button>
      </div>

      <div>
        <br />
        <h4>Hasil: </h4>
        <h5>Produk: {showResult ? selected.name : '-'}</h5>
        <h5>Harga: Rp. {showResult ? selected.price : '-'},-</h5>
        <h5>Kembalian: Rp. {showResult ? returnMoney : '-'},-</h5>
        
        <h5>Detail Kembalian: </h5>
        {showResult && (
        <ol>
          {Object.keys(cashBackDetail).map((val, index) => <li key={index}>Rp. {val},- ({cashBackDetail[val]} lembar)</li>
          )}          
        </ol>
        )}

      </div>

      <br />
      <br />
      <br />


    </>
  )

}

export default App;
