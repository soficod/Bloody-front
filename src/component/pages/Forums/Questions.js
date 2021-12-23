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
import FormControl from '@mui/material/FormControl';
import { TrafficOutlined } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';


const Questions = ({answers,setAnswers,error,setError,checked,setChecked,valueChecked ,setValueChecked,value,setValue})=>{

    
    const [dateValue, setDateValue] = React.useState(new Date('2021-08-18T21:11:54'));

    const handleChecked= (e)=>{
        setValueChecked(e.target.value)
       
        let tmp = {...answers};
        delete tmp["last_donation"];
        delete tmp["number_of_donations"];
        setAnswers(tmp);
    }
    const handleCheckedFamily = (e)=>{
        let tmp = {...error};
        delete tmp["donor_type"];
        setError(tmp);
        let smp= {...answers, donor_type: e.target.value};
        delete smp["patient_fname"];
        delete smp["patient_lname"];
        delete smp["patient_service"];
        delete smp["patient_clinic"];
        setAnswers(smp);
        console.log(smp);

       
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
             {/*JSON.stringify(error)*/}
             <Box sx={{
                width:'100%',
            

            }}>
                
                <FormLabel component="legend"
                    error={typeof(error.donor_type) != "undefined" && error.donor_type}
                    helperText={typeof(error.donor_type) != "undefined" && error.donor_type  ? error.donor_type: ' '}
                    sx={{color:"black",fontFamily: `'Source Sans Pro', sans-serif`,fontSize:'1.5em',backgroundColor:'rgb(154, 196, 237,0.2)',padding:"20px"}}
                >
                   <p >Type de donneur</p>
                </FormLabel>
               
              <FormGroup sx={{pl:"30px"}}>

                <RadioGroup
                        defaultValue={typeof(answers.donor_type)!="undefined"?answers.donor_type:""}
                       
                        value={typeof(answers.donor_type)!="undefined"?answers.donor_type:""}
                        name="radio-buttons-group"
                        error={typeof(error.donor_type) != "undefined" }
                        helperText={typeof(error.donor_type) != "undefined" ? error.donor_type :''}
                    
                    >
                        <FormControlLabel 
                            value="regular" 
                            onChange={handleCheckedFamily}
                            control={<Radio />} 
                            label="Volontaire regulier"
                           
                        />
                        
                        <FormControlLabel 
                            value="irregular" 
                            onChange={handleCheckedFamily}
                            control={<Radio />}
                            label="Volontaire irrégulier"
                        
                        />
                        <FormControlLabel 
                            value="family" 
                            onChange={handleCheckedFamily}
                            control={<Radio />}
                            label="familial (compensation)"

                        />
                    
                </RadioGroup>
                {
                    (typeof(error.donor_type) != "undefined")?
                        <p style={{paddingBottom:"10px",color:"rgb(216,47,47)"}}>{error.donor_type}</p>
                    :
                        ""
                }
               {
                   (answers.donor_type == "family")?
                   <Box
                         sx={{  
                            m:2,
                            backgroundColor:'rgb(154, 196, 237,0.1)',
                            paddingRight:'30px',
                            paddingLeft:'30px',
                            padding:"30px"
                          
                            }}              
                   >
                        <Box 
                            sx={{   
                                display:"flex", 
                                '&> :not(style)' :{width:'48%'},
                                flexDirection:"row",
                                justifyContent:"space-between",
                                marginBottom:"40px"
                             
                            
                            }}
                        >
                            <TextField
                            id="outlined-name"
                            label="Nom malade"
                            variant="standard"
                            onChange ={(e)=>setAnswers({...answers,patient_fname:e.target.value})}
                            value={typeof(answers.patient_fname)!="undefined" ? answers.patient_fname :" "}
                            defaultValue={typeof(answers.patient_fname)!="undefined" ? answers.patient_fname :" "}
                        
                            />
                            <TextField
                            id="outlined-name"
                            label="Prénom malade"
                            variant="standard"
                            onChange ={(e)=>setAnswers({...answers,patient_lname:e.target.value})}
                            value={typeof(answers.patient_lname)!="undefined" ? answers.patient_lname :" "}
                            defaultValue={typeof(answers.patient_lname)!="undefined" ? answers.patient_lname :" "}
                            />
                        </Box>
                     <Box 
                 
                     sx={{   
                            display:"flex", 
                            '&> :not(style)' :{width:'48%'},
                            flexDirection:"row",
                            justifyContent:"space-between",
                            paddingBottom:"20px"
                            
                    }}
                    
                     >
                     
                      <TextField
                        id="outlined-name"
                        label="Service"
                        variant="standard"
                        onChange ={(e)=>setAnswers({...answers,patient_service:e.target.value})}
                        value={typeof(answers.patient_service)!="undefined" ? answers.patient_service :" "}
                        defaultValue={typeof(answers.patient_service)!="undefined" ? answers.patient_service :" "}
                        />
                          <TextField
                        id="outlined-name"
                        label="Clinique"
                        variant="standard"
                        onChange ={(e)=>setAnswers({...answers,patient_clinic:e.target.value})}
                        value={typeof(answers.patient_clinic)!="undefined" ? answers.patient_clinic :" "}
                        defaultValue={typeof(answers.patient_clinic)!="undefined" ? answers.patient_clinic :" "}
                       
                        />
                     </Box>
                        
                   
                   </Box>
                   :
                   " "
               }
              </FormGroup>
               
             </Box>

             <Box sx={{
                width:'100%',
            

            }}>
                
                <FormLabel 
                    component="legend"
                    error={typeof(error.donation_type) != "undefined" && error.donation_type}
                    helperText={typeof(error.donation_type) != "undefined" && error.donation_type  ? error.donation_type: ' '}
                    sx={{color:"black",fontFamily: `'Source Sans Pro', sans-serif`,fontSize:'1.5em',backgroundColor:'rgb(154, 196, 237,0.2)',padding:"20px"}}
                >
                   <p >Type de don</p>
                </FormLabel>
               
               <FormGroup sx={{pl:"30px"}}>
               <RadioGroup
                    onChange={e=>{
                        e.target.checked &&
                        setChecked(true)
                        setAnswers({...answers,donation_type:e.target.value})
                        let tmp={...error}
                        delete tmp["donation_type"]
                        setError(tmp);
                    }}
                    defaultValue={answers.donation_type}
                    error={true}
                    value={answers.donation_type}
                    name="radio-buttons-group"
                    required
                        
                    error={error.donation_type && typeof(error) != "undefined" }
                    helperText={error.donation_type && typeof(error) != "undefined" ? error.donation_type :' '}
                
                >
                    <FormControlLabel 
                        value="blood" 
                       
                        control={<Radio />} label="sang total"
                     />
                     
                    <FormControlLabel 
                        value="platelets" 
                        
                         control={<Radio />}
                          label="Plaquettes"
                     />
                      <FormControlLabel 
                        value="plasma" 
                        
                         control={<Radio />}
                          label="Plasma"
                     />
                      <FormControlLabel 
                        value="white" 
                        
                         control={<Radio />}
                          label="Globules blancs"
                     />
                        <FormControlLabel 
                        value="red" 
                        
                         control={<Radio />}
                          label="Globules rouges"
                     />
                 
                </RadioGroup>
               
                {
                    (typeof(error.donation_type) != "undefined")?
                        <p style={{paddingBottom:"10px",color:"rgb(216,47,47)"}}>{error.donation_type}</p>
                    :
                        ""
                }
                </FormGroup>
               
            </Box>
        
           <Box sx={{
                width:'100%',
            

            }}>
                <FormLabel component="legend"
                 error={typeof(error.site) != "undefined" && error.site}
                 helperText={typeof(error.site) != "undefined" && error.site  ? error.site: ' '}
                 sx={{color:"black",fontFamily: `'Source Sans Pro', sans-serif`,fontSize:'1.5em',backgroundColor:'rgb(154, 196, 237,0.2)',padding:"20px"}}
                 >
                <p >Site de collecte</p>
           </FormLabel>
                <FormGroup sx={{pl:"30px"}}>

                    <RadioGroup
                    
                    onChange={e=>{
                        e.target.checked &&
                      
                        setAnswers({...answers,site:e.target.value})
                        let tmp={...error}
                        delete tmp["site"]
                        setError(tmp);
                    }}
                    defaultValue={typeof(answers.site)!="undefined"?answers.site:""}
                   
                    value={typeof(answers.site)!="undefined"?answers.site:""}
                    name="radio-buttons-group"
                    
                    >
                    <FormControlLabel 
                            value="fixe" 
                            
                            control={<Radio />} 
                            label="fixe(in situ)"
                           
                        />
                        
                        <FormControlLabel 
                            value="mobile" 
                            
                            control={<Radio />}
                            label="mobile"
                        
                        />
                    </RadioGroup>
                    {
                    (typeof(error.site) != "undefined")?
                        <p style={{paddingBottom:"10px",color:"rgb(216,47,47)"}}>{error.site}</p>
                    :
                        ""
                     }
                </FormGroup>

            </Box>

            <Box sx={{
                width:'100%',
            

            }}>
            <FormLabel component="legend"
                error={typeof(error.have_donated) != "undefined" && error.have_donated}
                helperText={typeof(error.have_donated) != "undefined" && error.have_donated  ? error.have_donated: ' '}
                sx={{color:"black",fontFamily: `'Source Sans Pro', sans-serif`,fontSize:'1.5em',backgroundColor:'rgb(154, 196, 237,0.2)',padding:"20px"}}
                >
            <p >Avez-vous déjà donné votre sang ?</p>
           </FormLabel>
              
                <FormGroup sx={{pl:"30px"}}>
                    <RadioGroup
                            
                            name="radio-buttons-group"
                            onChange={e=>{
                                e.target.checked &&
                                setValueChecked(true)
                                setAnswers({...answers,have_donated:e.target.value})
                                let tmp={...error}
                                delete tmp["have_donated"]
                                setError(tmp);
                               
                            }}
                          
                           defaultChecked={valueChecked}
                           value={typeof(answers.have_donated)!="undefined"?answers.have_donated:""}
                           
                        

                          
                    >

                        <FormControlLabel  onChange ={handleChecked} value="yes" control={<Radio />} label="Oui" />
                        {
                            (answers.have_donated == "yes")?
                            <Box sx={{
                                width:'100%',   
                            }}>
                                <Box sx={{m:2}}>

                            <FormGroup 
                                
                                row={true}
                                 sx={{backgroundColor:'rgb(154, 196, 237,0.1)',p:1}} >
                                
                                    <InputLabel sx={{m:2,marginTop:"30px",color:"rgb(88,92,89)"}} id="last_donation">Don effectuer y'a plus de:</InputLabel>
                                    <TextField
                                         sx={{
                                            minWidth:"200px"
                                        }}
                                        type= "number"
                                        variant="standard"
                                        label="/semaine"
                                        defaultValue={typeof(answers.last_donation) != "undefined" ? answers.last_donation:""}
                                        value={typeof(answers.last_donation) != "undefined" ? answers.last_donation:""}
                                        onChange={e=>{
                                            setAnswers({...answers,last_donation:e.target.value >= 0 ? e.target.value : 0})
                                            
                                        }}
                                       
                                        />

                            </FormGroup >

                                <FormGroup row={true} sx={{backgroundColor:'rgb(154, 196, 237,0.1)',p:1}}>
                                    <InputLabel sx={{m:2,marginTop:"30px",color:"rgb(88,92,89)"}} id="year">Nombre de don par an:</InputLabel>
                                    <TextField
                                     sx={{
                                         minWidth:"200px"
                                     }}
                                     type="number" 
                                     
                                    
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
                <FormControlLabel onChange ={handleChecked} value="no" control={<Radio />} label="Non" />
                    
                    </RadioGroup>
                    {
                    (typeof(error.have_donated) != "undefined")?
                        <p style={{paddingBottom:"10px",color:"rgb(216,47,47)"}}>{error.have_donated}</p>
                    :
                        ""
                     }
                </FormGroup>

        
        
            </Box>
         </Box>
        </Box>
    )

}
export default Questions;