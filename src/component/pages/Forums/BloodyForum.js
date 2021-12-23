import * as React from 'react';
import Personalinfo from './Personalinfo';
import Box from '@mui/material/Box';
import Questions from './Questions';
import Maladies from './Maladies';
import axios from 'axios'
import ResultsPage from './ResultsPage';
import Swal from 'sweetalert2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DashBoard from './DashBoard'
import Form from './Form';
import Medicament from './Medicament';
import Risque from './Risque';
import Vaccin from './Vaccin';
import Expfctl from './Expfctl';
import Chirurgie from './Chirurgie'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";


const BloodyForum = ()=>{
    
  const steps = ["Informations","Questionnaire","Maladies","Médicaments","Comportement à risque","exploration fctl","chirurgie","vaccins"]
    
    const goNext = () => 
    {
      switch(activeStep)
      {
        case 0: {
          axios.post('http://127.0.0.1:8000/api/people',info)
          .then(res=>
            {
             
              setActivestep((activeStep)=> activeStep+1);
              setPerson((person) => res.data.data.id);
              
          })
          .catch(err =>
            {
          
              let errors=[];
              if(err.response.status == 422)
              {
                Object.keys(err.response.data.errors).forEach(key => 
                  {
                    errors[key] = err.response.data.errors[key][0];
                    
                  })
                  setError(errors)
              }

          })
          break;
        }
        case 1: {
        
          axios.post('http://127.0.0.1:8000/api/people/check-donation', info)
          .then(res=>
            {
              
              if(!res.data.data.result)
              {
                Swal.fire({
                  title:"Contre indication définitive.",
                  text:res.data.data.explanation,
                  icon:"error",
                  showConfirmButton:true,
                  confirmButtonText:"OK",
                  confirmButtonColor:"#1976D2"
                }).then((res) => {
                  
                  setInfo({
                    fname:'',
                    lname: '',
                    sex: '',
                    address:'',
                    phone: '',
                    birthdate:new Date(''),
                    email:'',
                    weight:null,
                    answers:[]
                   
                  })
                  setError({
                    fname:'',
                    lname:'',
                    sex: '',
                    address:'',
                    email:'',
                    phone:'',
                    birthdate:'',
                  
                
                

                
                  });
                  setMaladies({});
                  setActivestep(0);
                  setValue({});
                  setChecked(false);
                })
                return;
              }
           
              axios.get('http://127.0.0.1:8000/api/points')
              .then(res=>
              {
               
                setParents((parents) => res.data.data)
                setLoading(false);
                setActivestep((activeStep)=> activeStep+1);
                console.log(res.data.data);
              })
              .catch(err =>console.log(err))
            })
            .catch(err=>{
            
             
              if(err.response.status == 422)
              {
                  let errors = {...error}
                  Object.keys(err.response.data.errors).forEach(key => 
                   
                    errors[key] = err.response.data.errors[key][0]
                    
                  );
                  setError(errors);
              }

            })
          break;
        }
      
        case 2:{
          setActivestep((activeStep)=> activeStep+1);
          break;
        }
     
        case 3:{
            
            const arr_maladies = [];
            console.log(maladies)
            Object.keys(maladies).forEach(key => 
            {
              for(let id of maladies[key])
              {
                arr_maladies.push(id);
              }
            
            })
  
          
            let local_info = {...info, answers:arr_maladies}; 
            setInfo({...info, answers:arr_maladies});
            setLoading(true)    
            axios.post('http://127.0.0.1:8000/api/people/check',local_info)
            .then(res=>
            {
              setLoading(false);
              setResult((result) => res.data.data.results);
             
              setActivestep((activeStep)=> activeStep+1);
              console.log(res.data);
             
            
            
            })
            .catch(err =>console.log(err))
           
           
           
           break;
          }
          case 4:{setActivestep((activeStep)=> activeStep+1);
           break;
            }
          case 5:{setActivestep((activeStep)=> activeStep+1);
           break;
          }
          case 6:{setActivestep((activeStep)=> activeStep+1);
            break;
            }
          case 7:{setActivestep((activeStep)=> activeStep+1);
            break;
              }
          case 8:{setActivestep((activeStep)=> activeStep+1);
            break;
              }
      }
    
    

    }

    const [value,setValue]= React.useState({});
    const[donorTypeValue,setDonorTypeValue] = React.useState({})
    const [loading,setLoading]=React.useState(false);
    const [postData,setPostData]= React.useState([]);
    const [activeStep,setActivestep]=React.useState(0);
    const [info, setInfo] = React.useState({
      fname:'',
      lname: '',
      sex: '',
      address:'',
      phone: '',
      birthdate:new Date(''),
      email:'',
      type:'',
      answers:[]
    })

    const [maladies,setMaladies] = React.useState({});
    
    const [error, setError] = React.useState({
      fname:'',
      lname:'',
      sex: '',
      address:'',
      email:'',
      phone:'',
      birthdate:'',
    
    
  
    })
  
    
    const[result,setResult]=React.useState([])
    const [parents,setParents]= React.useState([])
   
    const [person,setPerson] =React.useState({});
    const [checked,setChecked]=React.useState(false);
    const [valueChecked,setValueChecked] = React.useState(false);
    const renderSwitch =(steps)=>{
      switch(steps){
        case 0:
          return <Personalinfo 
          error={error} 
          info={info} 
          setInfo={setInfo} />

        case 1:
          return <Questions
          donorTypeValue ={donorTypeValue} 
          setDonorTypeValue= {setDonorTypeValue}
          value={value} setValue={setValue} 
          valueChecked ={valueChecked } 
          setValueChecked={setValueChecked}
          setChecked={setChecked}
          setError={setError} 
          error={error} 
          checked={checked}
          setChecked={setChecked}
          answers={info}
          setAnswers={setInfo} />

        case 2:
          return <Maladies 
            parents={parents}
            maladies={maladies} 
            setMaladies={setMaladies} />
        
        case 3:return <Medicament 
            parents={parents}
            maladies={maladies} 
            setMaladies={setMaladies}/>
        
        case 4:return <Risque
        parents={parents}
        maladies={maladies} 
        setMaladies={setMaladies}/>

        case 5:return <Expfctl
        parents={parents}
        maladies={maladies} 
        setMaladies={setMaladies}/>

        case 6:return <Chirurgie
        parents={parents}
        maladies={maladies} 
        setMaladies={setMaladies}/>

        case 7:return <Vaccin
        parents={parents}
        maladies={maladies} 
        setMaladies={setMaladies}/>

        case 8: return <ResultsPage 
        setChecked={setChecked}
        setValue={setValue} 
        info={info}
        setError={setError}
        result={result} 
        setInfo={setInfo}
        setActivestep={setActivestep}
        setMaladies={setMaladies}
        person={person}/>
    
      }

  
    }

    const [selectedTab, setSelectedTab] = React.useState(0) 

    return(
    <div style={{
     
      width: "100vw",
      height: "100vh",
      paddingTop:"30px"
    }}>
     <Box  

        sx={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          marginTop:'100px',
          maxWidth: "1000px",
          width:'90%',
          margin:'auto',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          
          
        }}>
         
        <Tabs  
             
              value={selectedTab}
              onChange={(e, newVal) => setSelectedTab(newVal)}
              centered
        >
            <Tab 
              label="formulaire" 
              component={Link}
              to={"/"}
             
            />
            <Tab 
              label="DashBoard"
              component={Link}
              to={"/dashboard"}
            />
        </Tabs>
        <Routes>
          <Route 
            exact path="/"
            element={
              <Form
                steps={steps}
                activeStep={activeStep}
                renderSwitch={renderSwitch}
                goNext={goNext}
                setActivestep={setActivestep}
                loading={loading}
              />
            }
          />
          <Route 
            path="/dashboard"
            element={
              
            <DashBoard/>
            }
          />
        </Routes>
     </Box>
    </div>
    )

}
export default BloodyForum;