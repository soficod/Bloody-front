import React, { useState } from 'react'
import '../../../styles/Forums/personalinfo.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { fabClasses, FormGroup } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@mui/material/Button';


const Personalinfo = ({info, setInfo,error,setError})=>{
    


    return (
        <>
          
      
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { my:2,width:'100%'},
                    width:'90%',
                    margin: "auto"
                }}
                noValidate
                autoComplete="off"
                >
                  
                    <h1 style={{textAlign:"center",marginBottom:"60px",height:"50px",color:"rgb(79, 78, 78,0.9", backgroundColor:"rgb(143, 199, 255,0.2)"}}>Informations personnelles</h1>
               <Box
                   sx={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}
               >
                <Box
                    sx={{width:"300px"}}
                >
                    
                        <TextField 

                       
                     
                        onChange={(e)=>{
                            setInfo({...info,donor_id: e.target.value })
                            let tmp={...error}
                            delete tmp["donor_id"]
                            setError(tmp);
                        }}
                        defaultValue={typeof(info.donor_id) != "undefined" ?info.donor_id:null}
                        value={typeof(info.donor_id) != "undefined" ?info.donor_id:null}
                        id="donor_id"
                        label="Donneur ID"
                        variant="outlined"
                        required
                        error={  typeof(error.donor_id) != "undefined" && error.donor_id}
                        helperText={ typeof(error.donor_id) != "undefined"  &&  error.donor_id? error.donor_id : ' '}
                    />
                </Box>
               
                </Box>
                <Box sx={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    '&> :not(style)' :{width:'45%'}
                }}>
              
                   
                        
                    <TextField 
                        id="nom" 
                        defaultValue={info.lname}
                        label="Nom" 
                        variant="standard" 
                        onChange={(e)=>{ 
                            setInfo({...info, lname:e.target.value})
                            let tmp={...error}
                            delete tmp["lname"]
                            setError(tmp);
                        }}
                        required
                        
                        error={error.lname && typeof(error) != "undefined" }
                        helperText={error.lname && typeof(error) != "undefined" ? error.lname :' '}
                    />
                    <br/>
                    
                    <TextField 
                        id="prenom" 
                        defaultValue={info.fname}
                        label="Prenom" 
                        variant="standard" 
                        onChange={(e)=> {
                            setInfo({...info, fname:e.target.value})
                            let tmp={...error}
                            delete tmp["fname"]
                            setError(tmp);
                        }}
                        required
                        error={error.fname && typeof(error) != "undefined"}
                        helperText={error.fname && typeof(error) != "undefined" ? error.fname : ' '}
                    />
                </Box>
               
                <FormControl component="fieldset">
                <FormLabel component="legend"
                  error={error.sex && typeof(error) != "undefined"}
                  helperText={error.sex && typeof(error) != "undefined" ? error.sex: ' '}
                  
                  >Sexe</FormLabel>
                    <RadioGroup row aria-label="gender" 
                     
                     onChange={e => {
                         setInfo({...info, sex:e.target.value })
                         let tmp={...error}
                            delete tmp["sex"]
                            setError(tmp);
                        }} 
                     name="row-radio-buttons-group"
                     defaultValue={info.sex}
                     error={true}
                     value={info.sex}
                     helperText={error.sex && typeof(error) != "undefined" ? error.sex: ' '}
                     >
                    <FormControlLabel
                     value="man" 
                      control={<Radio />} 
                      label="Homme" 
                     />
                    <FormControlLabel    value="woman" control={<Radio />} label="Femme" />
                    </RadioGroup>
                    {
                        error.sex && typeof(error) != "undefined"?
                        <p style={{letterSpacing:"0.03333em",fontWeight:"400",fontSize:"0.75rem",fontFamily: '"Roboto","Helvetica","Arial",sans-serif',paddingBottom:"10px",color:"rgb(216,47,47)"}}>{error.sex}</p>
                        :
                        ""
                    }
                </FormControl>
              
                  
                        <TextField 

                       
                        type="number" 
                        onChange={(e)=>{
                            setInfo({...info,weight:e.target.value >=0 ? e.target.value : 0 })
                            let tmp={...error}
                            delete tmp["weight"]
                            setError(tmp);
                        }}
                        defaultValue={typeof(info.weight) != "undefined" ?info.weight:null}
                        value={typeof(info.weight) != "undefined" ?info.weight:null}
                        id="weight"
                        label="Poids"
                        variant="outlined"
                        required
                        error={  typeof(error.weight) != "undefined" && error.weight}
                        helperText={ typeof(error.weight) != "undefined"  &&  error.weight? error.weight : ' '}
                    />
                   
              
                   
                <FormGroup >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
         
                <InputLabel id="bday">Date de naissance</InputLabel>          
                    <DesktopDatePicker
                            
                            sx={{'&>':{marginRight:"0px"}}}
                            inputFormat="dd/MM/yyyy"
                            value={info.birthdate}
                            onChange={(e)=> {
                                setInfo({...info,birthdate:new Date(e)})
                                let tmp={...error}
                                delete tmp["birthdate"]
                                setError(tmp);
                            }}
                            defaultValue={info.birthdate}
                            renderInput={(params) => <TextField  label="Date de naissance" {...params} 
                            required 
                            error={error.birthdate && typeof(error) != "undefined"}
                            helperText={error.birthdate && typeof(error) != "undefined" ? error.birthdate : ' '}
                            />}
                            />
              
                </LocalizationProvider>
                </FormGroup>

                
                
                    
                    <TextField 
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={e => setInfo({...info,address:e.target.value})}
                        label="Adresse"
                        defaultValue={info.address}
                        error={error.address && typeof(error) != "undefined"}
                        helperText={error.address && typeof(error) != "undefined" ? "address required": ' '}
                    
                    />
                   
               
           
                    
                    <TextField 
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={e => setInfo({...info,email:e.target.value})}
                        label="Email"
                        defaultValue={info.email}
                        type="mail"
                        error={error.email && typeof(error) != "undefined"}
                        helperText={error.email && typeof(error) != "undefined" ? error.email: ' '}

                        
                    />
                   
              

   
                
                    <TextField
                        label="Numéro de téléphone"
                        type="tel"
                        defaultValue={info.phone}
                        onChange={e => setInfo({...info,phone:e.target.value.replace(/[^0-9]/g, '')})}
                        error={error.phone && typeof(error) != "undefined"}
                        helperText={error.phone && typeof(error) != "undefined" ? error.phone: ' '}
                        
                    />
                     
             
             

               
            </Box>
          
            
        </>
    )
     



}
export default Personalinfo;