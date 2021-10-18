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


const Personalinfo = ()=>{
    const [info, setInfo] = React.useState({
        fname: '',
        lname: '',
        sex: '0',
        address:'',
        phone: '',
        birthdate:new Date(''),
        email:'',
        bloodType:''  
    })

    const [fnameEr,setfnameEr] =useState(false);
    const [lnameEr,setlnameEr] =useState(false);
    const [birthdateEr,setbirthdateEr] =useState(false);
    const [addressEr,setaddressEr] =useState(false);
    const [phoneEr,setphoneEr] =useState(false);
    const [emailEr,setemailEr] =useState(false);
    const [bloodTypeEr,setbloodTypeEr] =useState(false);
    const handleSubmit = (e)=>{
        e.preventDefault()
        setfnameEr(false)
        setlnameEr(false)
        setaddressEr(false)
        setemailEr(false)
        setphoneEr(false)
        setbirthdateEr(false)
        setbloodTypeEr(false)
        if(info.fname== '')
        {
            setfnameEr(true)
        }
        if(info.lname=='')
        {
            setlnameEr(true)
        }
        if(info.address=='')
        {
            setaddressEr(true)
        }
        if(info.email=='')
        {
            setemailEr(true)
        }
        if(info.phone=='')
        {
            setphoneEr(true)
        }
        if(info.birthdate==null)
        {
            setbirthdateEr(true)
        }
        if(info.bloodType=='')
        {
           setbloodTypeEr(true)
        }
    }
    return (
        <>
        
      
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                        error={fnameEr}
                    />
                    <br/>
                    <TextField 
                        id="prenom" 
                        defaultValue={info.fname}
                        label="Prenom" 
                        variant="standard" 
                        onChange={(e)=> setInfo({...info, fname:e.target.value})}
                        required
                        error={lnameEr}
                    />
                </Box>
               
                <FormControl component="fieldset">
                <FormLabel component="legend">Sexe</FormLabel>
                    <RadioGroup  defaultValue="male" row aria-label="gender" name="row-radio-buttons-group">
                    <FormControlLabel  value="male" control={<Radio />} label="Homme" />
                    <FormControlLabel value="female" control={<Radio />} label="Femme" />
                    </RadioGroup>
                </FormControl>
                <FormGroup >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
         
                <InputLabel id="bday">Date de naissance</InputLabel>          
                    <DesktopDatePicker
                            
                            
                            inputFormat="dd/MM/yyyy"
                            value={info.birthdate}
                            onChange={(e)=> setInfo({...info,birthdate:new Date(e)})}
                        
                            renderInput={(params) => <TextField  label="Date de naissance" {...params} required error={birthdateEr} />}
                            />
              
                </LocalizationProvider>
                </FormGroup>
                   
                
                    
                    <TextField 
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={e => setInfo({...info,address:e.target.value})}
                        label="Adresse"
                        defaultValue=""
                        required
                        error={addressEr}
                    />
                   
               
           
                    
                    <TextField 
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={e => setInfo({...info,email:e.target.value})}
                        label="Email"
                        defaultValue=""
                        type="mail"
                        required
                        error={emailEr}
                        
                    />
                   
              

   
                
                    <TextField
                        label="Numéro de téléphone"
                        type="tel"
                        onChange={e => setInfo({...info,phone:e.target.value.replace(/[^0-9]/g, '')})}
                        required
                        error={phoneEr}
                    />
                     
                     <FormControl >
                     <InputLabel id="bloodtype">Groupe sanguin</InputLabel>
                        <Select
                      
                        id="bloodtype"
                        value={info.bloodType}
                        label="Groupe sanguin"
                        onChange={e => setInfo({...info,bloodType:e.target.value})}
                        error={bloodTypeEr}
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
                     </FormControl>
                 
                 <Button
                    variant="contained" 
                    type="submit"
                    onClick={handleSubmit}
                  
                    

                    >
                        Submit
               </Button>

               
            </Box>
            </form>
        </>
    )
     



}
export default Personalinfo;