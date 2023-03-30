import { Box } from "@mui/system";

import Header from "./Header";
import React, {useState, useEffect} from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';



import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem, Typography } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";


//this is unnecessary piece of shit that ruins the beauty of this entire project - Fuck SJC 

const ReviseProduct = () => {

    const [inputItem, setInputItem] = useState({name:"", price:"", rating:"", description:"", supply:"", category:""});
    const [selected, setSelected] = useState('');

    const [update, setUpdate] = useState({name:"", price:"", rating:"", description:"", supply:"", category:""});
    const [newData, setData] = useState({});
    
    
    const [proID, setProID] = useState({id:''});
    
    const onChange = (e)=>{
        const {name, value} = e.target;
        setUpdate(prev => {
            return({...prev, [name]:value})
        });
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setInputItem(prev => {
            return({...prev, [name]:value})
        });
        

    }
    const onSelect = (e)=>{
        const {name, value} = e.target;
        setSelected(e.target.value)
        setInputItem((prev)=>{
            return({
              ...prev, [name]: value
            })
        })
    }

    // function to create new product 

    const handleClick =  async (e) => {
        e.preventDefault();
       
        
        const {name, price, rating, description, supply, category} =inputItem;
        
        
        // validation
        const cPrice = Number(price);
        const cRating = Number(rating);
        const cSupply =Number(supply)

        if(isNaN(cPrice) || isNaN(cRating) || cRating > 5 || isNaN(cSupply) || description.length > 60){
            alert("Wrong Data")
        }else{
               const res = await fetch("/general/form",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                
                name, price, rating, description, supply, category
            }),

        });
        console.log(res)
        }


       setInputItem({name:"", price:"", rating:"", description:"", supply:"", category:""})
       setSelected("")               
       
    }


    // function to delete product by ID

     const handleDelete = async(e)=>{
        e.preventDefault();
        const {id} =  proID;

        try{const res = await fetch("/general/form",{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                id
            })
            
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
          }
    }catch(error){
        //alert(`Error deleting item`);

    }
        setProID({id:''});

}

// funtion to find the product by id


const handleFind = async (e)=>{
    e.preventDefault();
    const id = proID.id
    //console.log(id)
   
    const response = await fetch(`/general/form/${id}`);
    const result = await response.json();

    setUpdate(result)
    

    //console.log(inputItem);

    

    

    
    
}





// function to update/edit product

const handleUpdate = (e)=>{
    e.preventDefault();
    const {id} = proID
    const {name, price, rating, description, supply, category} =update;
    

    console.log(name, price, rating, description, supply, category)
    console.log(id);

    const res =  fetch(`/general/form/`,{
        method: 'PATCH',
        headers:{
            "Content-Type":"application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
            id, name, price, rating, description, supply, category

           // test:"this is a test message"

        
        })
    });

    setUpdate({name:"", price:"", rating:"", description:"", supply:"", category:""})
    setProID({id:" "})
}


     
  
    
    

    return (
    <Box>

       {/* adding a product */}
        <Box sx={{padding: '1rem 0 0 1rem'}}>
            <Header title="Add New Product" subtitle="" />
        </Box>
        <Box  >
        <Box>
            
            <TextField id="outlined-basic" name="name" onChange={handleChange}  value = {inputItem.name} label="Name" variant="outlined" sx={{margin: '15px'}} />
           
        </Box>
        <Box>
            <TextField id="outlined-basic" name="price" onChange={handleChange} value = {inputItem.price} label="Price" variant="outlined"  sx={{margin: '15px'}}/>
            <TextField id="outlined-basic" name="rating" onChange={handleChange} value = {inputItem.rating} label="Rating" variant="outlined"  sx={{margin: '15px'}} />
        </Box>
        <Box>
            <TextField id="outlined-basic" name="supply" onChange={handleChange} value = {inputItem.supply} label="supply" variant="outlined"  sx={{margin: '15px'}}/>
            {/*<TextField id="outlined-basic" name="category" onChange={handleChange} label="category" variant="outlined"  sx={{margin: '15px'}} />*/}

            
            <Select sx={{margin: '15px', width: '150px', }}
            name = "category"
            value = {selected}
            id = "outlined-basic"
            onChange={onSelect}
            labelId = "label"
             >
            
                <MenuItem value='accessories'>accesssories</MenuItem>
                <MenuItem value='shoes'>shoes</MenuItem>
                <MenuItem value='clothing'>clothing</MenuItem>
                <MenuItem value='misc'>misc</MenuItem>
            </Select>
            
        </Box>
        
        <Box>
        <TextField
          id="outlined-multiline-flexible"
          label="Description" name="description" onChange={handleChange}
          value = {inputItem.description}
          multiline
          maxRows={4}
          sx={{margin: '15px', width: '300px'  }}
        />
        </Box>
        <Box sx={{margin: "15px"}}>
        <Button variant="outlined" style={{
            height: "50px" , width: "160px", borderColor:"white", color: "white"
            
        }} onClick = {handleClick}>Submit</Button>
        </Box>


        </Box>

        {/* form to delete a product */}
        <Box sx={{padding: '1rem 0 0 1rem'}}>
            <Header title="Delete a Product" subtitle="" />
        </Box>
        <Box>
         <TextField id="outlined-basic" name="id" onChange={(e)=>{
            const {name, value} = e.target;
            setProID(prev =>{
                return ({...prev, [name]:value})
            })
         }}  value = {proID.id} label="ID" variant="outlined" sx={{margin: '15px', width: "15rem"}} />
        </Box>

        <Box sx={{margin: "15px"}}>
        <Button variant="outlined" style={{
            height: "50px" , width: "160px", borderColor:"white", color: "white"
            
        }} onClick = {handleDelete}>Delete</Button>
        </Box>



        {/* form to edit an existing product */}
        <Box sx={{padding: '1rem 0 0 1rem'}}>
            <Header title="Edit Product" subtitle="" />
        </Box>
        <Box>
        <Typography sx={{p:"15px",textDecoration:"underline"}}>Enter ID of the product to be edited</Typography>

         <TextField id="outlined-basic" name="id" onChange={(e)=>{
            const {name, value} = e.target;
            setProID(prev =>{
                return ({...prev, [name]:value})
            })
         }}  value = {proID.id} label="ID" variant="outlined" sx={{ width: "15rem", ml: "15px", mr:"15px"}} />

        <Button variant="outlined" style={{
            height: "50px" , width: "160px", borderColor:"white", color: "white"
            
        }} onClick = {handleFind}>Find</Button>
         
        </Box>

        <Box>
        <Typography sx={{p:"15px", textDecoration:"underline"}}>Enter details to be changed</Typography>
        <Box>
            
            <TextField id="outlined-basic" name="name" onChange={onChange}  value = {update.name} label="Name" variant="outlined" sx={{margin: '15px'}} />
           
        </Box>
        <Box>
            <TextField id="outlined-basic" name="price" onChange={onChange} value = {update.price} label="Price" variant="outlined"  sx={{margin: '15px'}}/>
            <TextField id="outlined-basic" name="rating" onChange={onChange} value = {update.rating} label="Rating" variant="outlined"  sx={{margin: '15px'}} />
        </Box>
        <Box>
            <TextField id="outlined-basic" name="supply" onChange={onChange} value = {update.supply} label="supply" variant="outlined"  sx={{margin: '15px'}}/>
            {/*<TextField id="outlined-basic" name="category" onChange={handleChange} label="category" variant="outlined"  sx={{margin: '15px'}} />*/}

            
            <Select sx={{margin: '15px', width: '150px', }}
            name = "category"
            value = {update.category}
            id = "outlined-basic"
            onChange={onChange}
            labelId = "label"
             >
            
                <MenuItem value='accessories'>accesssories</MenuItem>
                <MenuItem value='shoes'>shoes</MenuItem>
                <MenuItem value='clothing'>clothing</MenuItem>
                <MenuItem value='misc'>misc</MenuItem>
            </Select>
            
        </Box>
        
        <Box>
        <TextField
          id="outlined-multiline-flexible"
          label="Description" name="description" onChange={onChange}
          value = {update.description}
          multiline
          maxRows={4}
          sx={{margin: '15px', width: '300px'  }}
        />
        </Box>
        <Box sx={{margin: "15px"}}>
        <Button variant="outlined" style={{
            height: "50px" , width: "160px", borderColor:"white", color: "white", marginBottom:"20px"
            
        }} onClick = {handleUpdate}>Submit</Button>
        </Box>


        </Box>
        
    </Box>
    
    )
}

export default ReviseProduct;

//64248735e86c0cdd29415c93