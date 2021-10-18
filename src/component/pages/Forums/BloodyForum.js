import * as React from 'react';
import Personalinfo from './Personalinfo';
import Box from '@mui/material/Box';
import { AssignmentReturnedTwoTone } from '@mui/icons-material';
import Questions from './Questions';
import Maladies from './Maladies';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {bg1} from './background';


const BloodyForum = ()=>{
    
    const steps = ["step 1","step 2","step 3"]

    const [activeStep,setActivestep]=React.useState(0);
    
  
  
    const renderSwitch =(steps)=>{
      switch(steps){
        case 0:
          return <Personalinfo/>
        case 1:
          return <Questions/>
        case 2:
          return <Maladies/>
   
        
      }
  
    }
    return(
    <div style={{
     
      width: "100vw",
      height: "100vh",
      paddingTop:"50px"
    }}>
     <Box  

        sx={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          marginTop:'100px',
          maxWidth: "900px",
          width:'90%',
          margin:'auto',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          backgroundColor: "white"
          
        }}>
        <Box sx={{ width: '100%', m:6 }}>

           <Stepper activeStep={activeStep} alternativeLabel>

            {steps.map((label) => (
              
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

        </Box>
       
          {
            renderSwitch(activeStep)
          }
          <Box sx={{width:'100%',display: 'flex', flexDirection: 'row-reverse', pt: 2 ,justifyContent:'space-between'}}>
           
         {
          (activeStep==steps.length)?
          <Button
           variant="contained" 
           disabled={activeStep === 3}
           sx={{ m: 5 }}
           onClick={()=>{setActivestep((activeStep)=> activeStep+1)}}

           >
             Next</Button>
             :
             <Button
             variant="contained" 
             sx={{ m: 5 }}
             onClick={()=>{setActivestep((activeStep)=> activeStep+1)}}
  
             >
               Next </Button>
         }
          

        
          
          <Button
           variant="contained"
            sx={{ m: 5 }}
            disabled={activeStep === 0}
            onClick={()=>{setActivestep((activeStep)=> activeStep-1)}}
            >Previous </Button>
          </Box>
          

     </Box>
    </div>
    )

}
export default BloodyForum;