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


const Personalinfo = ({info, setInfo,error})=>{
    


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
                  
                    <h1 style={{textAlign:"center",marginBottom:"60px",height:"50px",color:"rgb(79, 78, 78,0.9", backgroundColor:"rgb(143, 199, 255,0.2)"}}>Information personnelles</h1>
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
                        onChange={(e)=> setInfo({...info, lname:e.target.value})}
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
                        onChange={(e)=> setInfo({...info, fname:e.target.value})}
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
                     
                     onChange={e => {setInfo({...info, sex:e.target.value })}} 
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
                <FormGroup >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
         
                <InputLabel id="bday">Date de naissance</InputLabel>          
                    <DesktopDatePicker
                            
                            sx={{'&>':{marginRight:"0px"}}}
                            inputFormat="dd/MM/yyyy"
                            value={info.birthdate}
                            onChange={(e)=> setInfo({...info,birthdate:new Date(e)})}
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
                     
                     <FormControl >
                     <InputLabel id="bloodtype">Groupe sanguin</InputLabel>
                        <Select
                      
                        id="bloodtype"
                        value={info.bloodType}
                        defaultValue={info.bloodType}
                        label="Groupe sanguin"
                        onChange={e => setInfo({...info,bloodType:e.target.value})}
                        error={error.bloodType && typeof(error) != "undefined"}
                        helperText={error.bloodType && typeof(error) != "undefined" ? error.bloodType: 'hi '}
                        >
                        <MenuItem value='A+'>A+</MenuItem>
                        <MenuItem value='A-'>A-</MenuItem>
                        <MenuItem value='B+'>B+</MenuItem>
                        <MenuItem value='B-'>B-</MenuItem>
                        <MenuItem value='O+'>O+</MenuItem>
                        <MenuItem value='O-'>O-</MenuItem>
                        <MenuItem value='AB+'>AB+</MenuItem>
                        <MenuItem value='AB-'>AB-</MenuItem>

                     </Select>
                     {
                        error.bloodType && typeof(error) != "undefined"?
                        <p style={{lineHeight: "1.66",letterSpacing:"0.03333em",fontWeight:"400",fontSize:"0.75rem",fontFamily: '"Roboto","Helvetica","Arial",sans-serif',paddingBottom:"10px",color:"rgb(216,47,47)"}}>{error.bloodType}</p>
                        :
                        ""
                    }
                     </FormControl>
                 
             

               
            </Box>
            
        </>
    )
     



}
export default Personalinfo;