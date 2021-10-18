import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

import FormControlLabel from '@mui/material/FormControlLabel';

const Maladies = ()=>{

        const [checked,setChecked]=React.useState(false);

        const handleChecked =(e)=>{
            setChecked(e.target.checked)
        }
    return(
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'left',
            width:'85%',
          
            ml:5,
            '&> :not(style)' :{width:'100%'}
        }}>
         <Box sx={{
             
                
        
                my:3
               

            }}>
                <Box sx={{  backgroundColor:'rgb(154, 196, 237,0.1)',pl:1}}>
                <FormControlLabel control={<Checkbox  value='cardio' onChange={handleChecked}/>} label="Cardio" />
                </Box>
                    {
                        (checked)&&
                        <Box sx={{display:'flex',flexDirection:'column',m:3}}>
                            <FormControlLabel control={<Checkbox  />} label="Accident vasculaire cérébral AVC" />
                            <FormControlLabel control={<Checkbox  />} label="Anévrysme" />
                            <FormControlLabel control={<Checkbox  />} label="Angor connu, infractus du myocarde (Antécédents)" />
                            <FormControlLabel control={<Checkbox  />} label="Artérite" />
                        </Box>
                    }

            </Box>
            <Box sx={{
             
                
           
             my:3
            

         }}>
             <Box sx={{  backgroundColor:'rgb(154, 196, 237,0.1)',pl:1}}>
             <FormControlLabel control={<Checkbox  />} label="Cardio" />
             </Box>
            

         </Box>
         <Box sx={{
             
                
           
             my:3
            

         }}>
              <Box sx={{  backgroundColor:'rgb(154, 196, 237,0.1)',pl:1}}>
             <FormControlLabel control={<Checkbox  />} label="Cardio" />
             </Box>

         </Box>
         <Box sx={{
             
                
            
             my:3
            

         }}>
             <Box sx={{  backgroundColor:'rgb(154, 196, 237,0.1)',pl:1}}>
             <FormControlLabel control={<Checkbox  />} label="Cardio" />
             </Box>

         </Box>
         <Box sx={{
             
                
            
             my:3
            

         }}>
             <Box sx={{  backgroundColor:'rgb(154, 196, 237,0.1)',pl:1}}>
             <FormControlLabel control={<Checkbox  />} label="Cardio" />
             </Box>

         </Box>
        
        </Box>
    )

}
export default Maladies;