import React from 'react'
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const Questions = ()=>{

    const [checked,setChecked]=React.useState(false);
    const [dateValue, setDateValue] = React.useState(new Date('2021-08-18T21:11:54'));

    const handleChecked= (e)=>{

        setChecked(e.target.value)
        
      
    }
    
    const handleDateChange = (newValue) => {
      setDateValue(newValue);
    };
  

    return(
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            '&> :not(style)' :{width:'100%'}
        }}>
            <Box sx={{
                width:'100%',
            

            }}>
               <p style={{fontSize:'1.5em',backgroundColor:'rgb(154, 196, 237,0.3)',padding:"20px"}}>Vous Sentez-vous en forme pour donner votre sang ?</p>
               <FormGroup sx={{pl:"30px"}}>
               <RadioGroup
                 
                    defaultValue="oui"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                     
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                 
                </RadioGroup>
                </FormGroup>
               
            </Box>

            <Box sx={{
                width:'100%',
            

            }}>
                <p style={{fontSize:'1.5em',backgroundColor:'rgb(154, 196, 237,0.3)',padding:"20px"}}>Avez vous déjà donné votre sang ?</p>
                <FormGroup sx={{pl:"30px"}}>
                    <RadioGroup
                            name="radio-buttons-group"
                        >

                        <FormControlLabel onChange ={handleChecked} value="oui" control={<Radio />} label="Oui" />
                        {
                            (checked == "oui")?
                            <Box sx={{
                                width:'100%',   
                            }}>
                                <Box sx={{m:2}}>

                            <FormGroup row={true} sx={{backgroundColor:'rgb(154, 196, 237,0.1)',p:1}} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <InputLabel sx={{m:2,color:"rgb(88,92,89)"}} id="demo-simple-select-standard-label">Date du dernier don:</InputLabel>
                                        <DesktopDatePicker
                                                
                                                label="Date"
                                                inputFormat="MM/dd/yyyy"
                                                value={dateValue}
                                                onChange={handleDateChange}
                                            
                                                renderInput={(params) => <TextField variant="standard" {...params} />}
                                                />
                                </LocalizationProvider>

                            </FormGroup >

                                <FormGroup row={true} sx={{backgroundColor:'rgb(154, 196, 237,0.1)',p:1}}>
                                    <InputLabel sx={{m:2,color:"rgb(88,92,89)"}} id="year">Nombre de don par an:</InputLabel>
                                    <TextField   type="number" id="nom" label="/an" variant="standard"  />
                                </FormGroup>

                                </Box>
                            </Box>
                        :
                            ""

                    }
                <FormControlLabel onChange ={handleChecked} value="non" control={<Radio />} label="Non" />
                    
                    </RadioGroup>
                </FormGroup>

        
        
            </Box>

        </Box>
    )

}
export default Questions;