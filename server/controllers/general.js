import User from '../models/Users.js'
import OverallStat from '../models/OverallStat.js'
import Transaction from '../models/Transaction.js'
import Product from '../models/Product.js'
import mongoose from 'mongoose'

export const getUser = async (req, res) => {
    try{
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
        
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

// export const getDashboard = async (req, res) => {
//     try {
//         const currentMonth = 'November'
//         const currentYear = 2021
//         const currentDate = '2021-11-15'
//         const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 })
//         const overallStat = await OverallStat.find({ year: currentYear });
//         const { totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, monthlyData, salesByCategory } = OverallStat[0]

//         const thisMonthStats = OverallStat[0].monthlyData.find(({ month }) => {
//             return month === currentMonth
//         })
        
//         const todayStats = OverallStat[0].dailyData.find(({ date }) => {
//             return date === currentDate
//         })

//         res.status(200).json({ totalCustomers, yearlySalesTotal, yearlyTotalSoldUnits, monthlyData, 
//                     salesByCategory, thisMonthStats, todayStats, transactions})
//     } catch (error) {
//         res.status(404).json({ message: error.message })
//     }
// }

export const processForm = async (req, res) => {
  console.log("In the process form controller.")
  console.log(req.body)
  res.status(200).json({
    success: true,
    message: "Form data received."
  })

  const {name, price, rating, supply, category, description} = req.body;
    console.log(name, price, rating, supply, category, description);

    const proData = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        price: price,
        rating: rating,
        supply: supply,
        category: category,
        description: description

    },
      { timestamps: true }
    );

    const result = await proData.save();
}


export const deleteForm = async(req, res) => {

  //console.log("In the process form controller.")
  //console.log(req.body)
  // res.status(200).json({
  //   success: true,
  //   message: "Form data received."
  // })

  const {id} = req.body;
  

 try{
  const deleteProduct = await Product.findByIdAndDelete(id);
  console.log(`deleted successfully: ${deleteProduct}`);
  
}catch(error){
  console.log(`Delete Not Successful: ${error}`)
  
  res.status(400).json({ error: error.message });
}

  
}

export const findProducts = async(req, res)=>{

  const id = req.params.id;
  console.log(id);
  try{
    const data = await Product.findById(id);
    //console.log(data);
    res.json(data);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }

  
}

export const updateForm = async(req, res)=>{

   //console.log(req.body);
  const {id,name, price, rating, description, supply, category} = req.body;
  
  await Product.findByIdAndUpdate(id,{
    name: name,
    price: price,
    rating: rating,
    supply: supply,
    category: category,
    description: description
  })

}



export const getDashboard = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};