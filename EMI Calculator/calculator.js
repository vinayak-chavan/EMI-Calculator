const express = require("express");
const moment = require("moment");
const route = express.Router();

route.get("/", (req, res) => {
  try{
    const { booking_date, checkin_date, amount } = req.body;

    // couting difference between dates
    const date1 = new Date(booking_date);
    const date2 = new Date(checkin_date);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    //check if difference is of 30 days or not
    if(diffInDays <= 30){
      let emi_available = false; 
      res.send(`emi_available ${emi_available}`);
      
    } else {

    let emi_available = true;
    
    // calculating last date EMI
    const lastDate = new Date(date2 - 14 * oneDay);

    // couting total number of EMIs to be paid
    const diffTime = lastDate.getTime() - date1.getTime();
    totalWeeks = Math.round(diffTime / (oneDay * 7));

    let EMIarray = [];
    
    EMIarray.push(emi_available);
    // adding first EMI data in object
    let firstEMI = {
      date: moment.utc(date1).format("YYYY-MM-DD"),
      amount: amount / 4,
    };
    EMIarray.push(firstEMI);

    // coutinh remaining EMI amount
    let remainingAmount = amount - (amount / 4);
    EMIperWeek = amount / (totalWeeks);

    // adding remaining EMI data into object
    for(let i=1; i<=totalWeeks; i++){
      let newDate = new Date(date1.setDate(date1.getDate() + 7 * 1));
      let EMI = {
        date: moment.utc(newDate).format("YYYY-MM-DD"),
        amount: EMIperWeek,
      };

      EMIarray.push(EMI);
    }

    res.send(EMIarray)
    }
  } catch (err){
    console.log('something went wrong');
  }
});

module.exports = route;
