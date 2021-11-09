import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const Form = ({
    activeStep,
    renderSwitch,
    steps,
    goNext,
    setActivestep,
    loading
}) => 
{
    return(
        <>
        <Box sx={{ width: '100%', ml:6, mr:6, mb:6 }}>
            <Stepper sx={{mt:6}} activeStep={activeStep} alternativeLabel>

            {steps.map((label) => (
            
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
            ))}
            </Stepper>

            </Box>

            <Box sx={{width:'100%',display: 'flex', flexDirection: 'row-reverse', pt:0 ,justifyContent:'space-between'}}>

                {
                (activeStep==steps.length)?
                <Button
                    variant="contained" 
                    disabled={activeStep === 4}
                    sx={{ display:"none",m: 5 }}
                    onClick={()=>{goNext()}}

                >
                Suivant</Button>
                :
               
                (activeStep==steps.length -1)?
                <>
                {
                   !loading ?
                    <Button
                        variant="contained" 
                        sx={{ m: 5 }}
                        onClick={()=>{goNext()}}

                    >
                    Sauvgarder</Button>
                    :
                    <CircularProgress sx={{ m: 5 }} />


                }
                </>
                :
                <Button
                    variant="contained" 
                    sx={{ m: 5 }}
                    onClick={()=>{
                        goNext();
                }}

                >
                   Suivant
                </Button>
                }
            
                {
                    (activeStep==steps.length)? 
                    <Button
                    variant="contained"
                    sx={{ display:"none",m: 5 }}
                    disabled={activeStep === 4}
                    onClick={()=>{setActivestep((activeStep)=> activeStep-1)}}
                    >Précédent </Button>
                    :
                    <Button
                    variant="contained"
                    sx={{ m: 5 }}
                    disabled={activeStep === 0}
                    onClick={()=>{setActivestep((activeStep)=> activeStep-1)}}
                    >Précédent </Button>
                }
            </Box>
            {
            renderSwitch(activeStep)
            }
            <Box sx={{width:'100%',display: 'flex', flexDirection: 'row-reverse', pt: 2 ,justifyContent:'space-between'}}>

            {
                (activeStep==steps.length)?
                <Button
                variant="contained" 
                disabled={activeStep === 4}
                sx={{display:"none", m: 5 }}
                onClick={()=>{goNext()}}

                >
                Suivant</Button>
                :
               
                (activeStep==steps.length -1)?
                <>
                {
                    !loading ?
                    <Button
                        variant="contained" 
                        sx={{ m: 5 }}
                        onClick={()=>{goNext()}}

                    >
                    Sauvgarder</Button>
                    :
                    <CircularProgress sx={{ m: 5 }}  />


                }
                </>
                :
                <Button
                variant="contained" 
                sx={{ m: 5 }}
                onClick={()=>{
                    goNext();
                }}

                >
                    Suivant </Button>
            }




            {
                (activeStep==steps.length)? 
                <Button
                variant="contained"
                sx={{ display:"none",m: 5 }}
                disabled={activeStep === 4}
                onClick={()=>{setActivestep((activeStep)=> activeStep-1)}}
                >Précédent </Button>
                :
                <Button
                variant="contained"
                sx={{ m: 5 }}
                disabled={activeStep === 0}
                onClick={()=>{setActivestep((activeStep)=> activeStep-1)}}
                >Précédent </Button>
            }
            
        </Box>
        </>
    )
}

export default Form;