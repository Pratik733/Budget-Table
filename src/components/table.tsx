import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './table.css';

const tabledata = [
  { Code: "00000", Particulars: "RECEIPTS", Editable: 0 },
  { Code: "01000", Particulars: "Jamaat Operating Income", Editable: 0 },
  { Code: "01010", Particulars: "Sabilul-Barakat", Editable: 0 },
  { Code: "01011", Particulars: "    Residence", Editable: 1 },
  { Code: "01012", Particulars: "    Establishment", Editable: 1 },
  { Code: "01013", Particulars: "    Mutawatteneen", Editable: 1 },
  { Code: "01020", Particulars: "Niyaaz & Hamza AS", Editable: 0 },
  { Code: "01021", Particulars: "    Shehrullah/Lailatul Qadr", Editable: 1 },
  { Code: "01022", Particulars: "    Ashara(including Ashura Collection)", Editable: 1 },
  { Code: "01023", Particulars: "    Other Miqaats", Editable: 1 },
  { Code: "01030", Particulars: "Other Income", Editable: 0 },
  { Code: "01031", Particulars: "    Jamaat Laagat", Editable: 1 },
  { Code: "01032", Particulars: "    Income from Jamaatkhana", Editable: 1 },
  { Code: "01033", Particulars: "    Rent from properties", Editable: 1 },
  { Code: "01034", Particulars: "    Voluntary Contributions", Editable: 1 },
  { Code: "01035", Particulars: "    Ikraam fund for Shehrullah", Editable: 1 },
  { Code: "01036", Particulars: "    Agricultural Income", Editable: 1 },
  { Code: "01037", Particulars: "    Miscellaneous Income", Editable: 1 },
]



function table() {

  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  //Fetch data from API
  async function fetchData() {
    try {
      const response = await fetch('https://192.154.255.82:7070/ BudgetMasters/GetBudgetById/5'); //here 5 is our budget id
      const data = await response.json();
      console.log(data);
      setResponseData(data);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchData();
    // console.log(responseData)
  }, []);

  //POST data to API
  async function postData() {
    try {
      const response = await fetch('https://192.154.255.82:7070/ BudgetMasters/PutBudget/5', {  //updating 'actual' in budget id 5
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseData),
      });
      const data = await response.json();
      console.log(data); //Log response
    }
    catch (error) {
      setError(error);
    }
  }


  const [sub, setSub] = useState(0);
  function updateTotal(event) {
    const inputElements = event.target.parentNode.parentNode.querySelectorAll('input');
    const outputElement = event.target.parentNode.parentNode.querySelector('output');
    let total = 0;
    let subTotal = 0;
    for (const inputElement of inputElements) {
      if (Number.isNaN(parseInt(inputElement.value, 10))) {
        total += 0;
      }
      else {
        total += parseInt(inputElement.value, 10);
      }
    }
    outputElement.value = total;

    const outputElements = document.querySelectorAll('output');
    const values = [];
    for (const outputElement1 of outputElements) {
      if (Number.isNaN(parseInt(outputElement1.value, 10))) {
        total += 0;
      }
      else {
        values.push(outputElement1.value);
      }
    }
    for (const value of values) {
      subTotal += parseInt(value, 10);
      setSub(subTotal);
    }
  }

  function submitHandler() {
    console.log(sub);
    responseData.actual = sub;
    postData();
  }

  return (
    <div className="container">
      <h1>Financial Projections ver 9.0</h1>
      <table className="rwd-table">
        <tbody>
          <tr>
            <th style={{ width: "4em" }}>Code</th>
            <th>Particulars</th>
            <th>Actual as per tally books of account upto 31.12.2021</th>
            <th>Aprox Receipt & Payment 1.1.2022 to 31.03.2022</th>
            <th>Actual in Kind or Sponsors upto 31.12.2021</th>
            <th>Approx in Kind or Sponsors 1.1.2022 to 31.3.2022</th>
            <th>Actual</th>
          </tr>
          {tabledata.map((item, i) => (
            <tr>
              <td data-th="Code">{item.Code}</td>
              <td data-th="Particulars" className={`${item.Editable ? "Editable" : "NonEditable"}`}>
                {item.Particulars}
              </td>
              <td data-th="Actual as per tally books of account upto 31.12.2021">
                {item.Editable ? <input placeholder="0" defaultValue={0} onChange={updateTotal} /> : null}
              </td>
              <td data-th="Aprox Receipt & Payment 1.1.2022 to 31.03.2022">
                {item.Editable ? <input placeholder="0" defaultValue={0} onChange={updateTotal} /> : null}
              </td>
              <td data-th="Actual in Kind or Sponsors upto 31.12.2021">
                {item.Editable ? <input placeholder="0" defaultValue={0} onChange={updateTotal} /> : null}
              </td>
              <td data-th="Approx in Kind or Sponsors 1.1.2022 to 31.3.2022">
                {item.Editable ? <input placeholder="0" defaultValue={0} onChange={updateTotal} /> : null}
              </td>
              <td data-th="Actual">{item.Editable ? <output > 0 </output> : null}</td>
            </tr>

          ))}
          <tr>
            <td data-th="Code"></td>
            <td data-th="Particulars">Total</td>
            <td data-th="Actual as per tally books of account upto 31.12.2021"></td>
            <td data-th="Aprox Receipt & Payment 1.1.2022 to 31.03.2022"></td>
            <td data-th="Actual in Kind or Sponsors upto 31.12.2021"></td>
            <td data-th="Approx in Kind or Sponsors 1.1.2022 to 31.3.2022"></td>
            <td data-th="Actual">{sub} <button className= "submitButton" type="submit" onClick={submitHandler}>
          Submit to budgetId: 5
      </button></td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}


export default table