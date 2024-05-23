import React, { useEffect, useMemo, useState } from "react";

export const Expense = () => {

    const [expense, setExpense] = useState([]);
    const [credits, setCredits] = useState();
    const [debits, setDebits] = useState();
    const [selectButton, setSelectButton] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    // To calculate credit and debit sum
    useMemo(() => {
        let cSum = 0, dSum = 0;
        for(const ele of expense){
            if(ele.type == 'credit'){
                cSum += ele.amount;
            }else{
                dSum += ele.amount;
            }
        }
        setCredits(cSum);
        setDebits(dSum);
    },[expense])


    // To add the inputs in our lists
    const addExpense = () => {
        if(amount != '' && selectButton != ''){
            setExpense([...expense, {
                id : expense.length + 1,
                amount : amount,
                description : description,
                type : selectButton
            }])
            setAmount('');
            setDescription('');
            setSelectButton('')
        }else{
            alert('Please fill all the details')
        }
    }

    // choose between credit or debit button
    const selectedButton = (e) => {
        setSelectButton(e.target.value);
    }

    // Update the changes in amount
    const updateAmount = (e) => {
        if(isNaN(Number(e.target.value))){
            setAmount('')
        }else
            setAmount(Number(e.target.value))
    }

    // Update description changes
    const updateDescription = e => {
            setDescription(e.target.value);
    }


    return(
        <div className="container">
            <h1>Expense Tracker</h1>

            <div className="total">
                <p className="credit">{`Rs. ${credits}`}</p>
                <p className="debit">{`Rs. ${debits}`}</p>
            </div>


            <div className="input-form">
                <div>
                    <p>Add expense :</p>
                    <div>
                        <input placeholder='Enter amount *' className="input-box" type="text" value={amount} onChange={updateAmount}></input>
                        
                        <button 
                        style={{ backgroundColor: selectButton == 'credit' ? 'rgb(183, 223, 183)' : 'lightgray' }}
                        className="creditBtn" value='credit' onClick={selectedButton}>credit</button>
                        <button 
                        style={{ backgroundColor: selectButton == 'debit' ? 'rgb(255, 165, 165)' : 'lightgray' }}
                        className="debitBtn" value='debit' onClick={selectedButton}>debit</button>
                    </div>
                    
                    <div>
                        <input placeholder="Description" className="input-box" type="text" value={description} onChange={updateDescription}></input>
                    </div>  
                </div>
                    <button className="addBtn" onClick={addExpense}>Add</button>
            </div>


            <div className="data">
                <ul className="lists">
                    {expense.map( (n) => {
                        return ( 
                            <li style={{color: n.type == 'credit' ? 'rgb(115 185 115)' : 'rgb(245 127 127)'}} >
                                <div>
                                    <p className="amount">{"Rs. "+n.amount}</p>
                                    <p className="amountType">
                                        {n.type}
                                    </p>
                                </div>
                                <p className="description">{`${n.description}`}</p>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        </div>
    )
}