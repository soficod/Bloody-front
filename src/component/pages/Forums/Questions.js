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
import FormLabel from '@mui/material/FormLabel';
import { TrafficOutlined } from '@mui/icons-material';


const Questions = ({answers,setAnswers,error,setError,checked,setChecked,valueChecked ,setValueChecked,value,setValue})=>{

    
    const [dateValue, setDateValue] = React.useState(new Date('2021-08-18T21:11:54'));
    
    const handleChecked= (e)=>{
        setValueChecked(e.target.value)
        let tmp = {...answers};
        delete tmp["last_donation"];
        delete tmp["number_of_donations"];
        setAnswers(tmp);
    }
    
    const handleDateChange = (newValue) => {
      setDateValue(newValue);
    };
  
    
    return(
       
        <Box sx={{
            width:"100%",
            display:'flex',
            flexDirection:'column',
            
        }}>
          
         <h1 style={{margin:"auto",marginBottom:"60px",width:"90%",textAlign:"center",height:"50px",color:"rgb(79, 78, 78,0.9", backgroundColor:"rgb(143, 199, 255,0.2)"}}>Questionnaire</h1>
         <Box 
            sx={{
                width:"80%",
                margin:"auto"
            }}
         >
             <Box sx={{
                width:'100%',
            

            }}>
                 <FormLabel component="legend"
                  error={!checked && error.donationType && typeof(error) != "undefined"}
                  helperText={error.donationType && typeof(error) != "undefined" ? error.donationType: ' '}
                  sx={{color:"black",fontFamily: `'Source Sans Pro', sans-serif`,fontSize:'1.5em',backgroundColor:'rgb(154, 196, 237,0.2)',padding:"20px"}}
                    >
                   <p >Type de don</p>
                </FormLabel>
               
               <FormGroup sx={{pl:"30px"}}>
               <RadioGroup
                    onChange={e=>{
                        e.target.checked &&
                        setChecked(true)
                        setAnswers({...answers,donationType:e.target.value})
                    }}
                    defaultValue={answers.donationType}
                    error={true}
                    value={answers.donationType}
                    name="radio-buttons-group"
                
                >
                    <FormControlLabel 
                        value="Plaquette de sang" 
                       
                        control={<Radio />} label="Plaquette de sang"
                     />
                     
                    <FormControlLabel 
                        value="sang" 
                        
                         control={<Radio />}
                          label="Sang"
                     />
                 
                </RadioGroup>
               
                {
                     (!checked  && error.donationType && typeof(error) != "undefined")?
                      <p style={{paddingBottom:"10px",color:"rgb(216,47,47)"}}>{error.donationType}</p>
                      :
                       ""
                }
                </FormGroup>
               
            </Box>
        
            <Box sx={{
                width:'100%',
            

            }}>
               <p style={{fontSize:'1.5em',backgroundColor:'rgb(154, 196, 237,0.2)',padding:"20px"}}>Vous sentez-vous en forme pour donner votre sang ?</p>
               <FormGroup sx={{pl:"30px"}}>
               <RadioGroup
              
                    name="radio-buttons-group"
                >
                    <FormControlLabel  value="oui" control={<Radio  />} label="Oui" />
                     
                    <FormControlLabel value="non" control={<Radio  />} label="Non" />
                 
                </RadioGroup>
                </FormGroup>
               
            </Box>

            <Box sx={{
                width:'100%',
            

            }}>
                <p style={{fontSize:'1.5em',backgroundColor:'rgb(154, 196, 237,0.2)',padding:"20px"}}>Avez-vous déjà donné votre sang ?</p>
                <FormGroup sx={{pl:"30px"}}>
                    <RadioGroup
                            
                            name="radio-buttons-group"
                            onChange={e=>{
                                e.target.checked &&
                                setValueChecked(true)
                                setValue({...value,value:e.target.value})
                               
                            }}
                          
                           defaultChecked={valueChecked}
                          
                           value={value.value}

                          
                    >

                        <FormControlLabel  onChange ={handleChecked} value="oui" control={<Radio />} label="Oui" />
                        {
                            (value.value == "oui")?
                            <Box sx={{
                                width:'100%',   
                            }}>
                                <Box sx={{m:2}}>

                            <FormGroup row={true} sx={{backgroundColor:'rgb(154, 196, 237,0.1)',p:1}} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <InputLabel sx={{m:2,color:"rgb(88,92,89)"}} id="last_donation">Date du dernier don:</InputLabel>
                                        <DesktopDatePicker
                                                
                                                label="Date"
                                                inputFormat="dd/MM/yyyy"

                                                value={typeof(answers.last_donation) != "undefined" ? answers.last_donation:null}
                                                onChange={e=>{setAnswers({...answers,last_donation:new Date(e)})}}
                                                defaultValue={typeof(answers.number_of_donations) != "undefined" ? answers.number_of_donations:""}
                                                renderInput={(params) => <TextField  variant="standard" {...params} />}
                                                />
                                </LocalizationProvider>

                            </FormGroup >

                                <FormGroup row={true} sx={{backgroundColor:'rgb(154, 196, 237,0.1)',p:1}}>
                                    <InputLabel sx={{m:2,color:"rgb(88,92,89)"}} id="year">Nombre de don par an:</InputLabel>
                                    <TextField 
                                     type="number" 
                                     
                                     id="nom"
                                     label="/an"
                                     variant="standard"
                                     defaultValue={typeof(answers.number_of_donations) != "undefined" ? answers.number_of_donations:""}
                                     value={typeof(answers.number_of_donations) != "undefined" ? answers.number_of_donations:""}
                                     onChange={e=>{setAnswers({...answers,number_of_donations:e.target.value >= 0 ? e.target.value : 0})}}
                                       
                                    />
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
        </Box>
    )

}
export default Questions;