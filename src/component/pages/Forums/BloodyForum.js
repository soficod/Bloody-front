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
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

const BloodyForum = ()=>{
    
    const steps = ["Informations","Questionnaire","Maladies","Médicaments"]
    
    const goNext = () => 
    {
      switch(activeStep)
      {
        case 0: {
          axios.post('http://127.0.0.1:8000/api/people/validate',info)
          .then(res=>
            {
              console.log(res);
              setActivestep((activeStep)=> activeStep+1);
              
          })
          .catch(err =>
            {
              console.log(err.response.data)
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
              
              console.log(res);
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
                    bloodType:'',
                    answers:[]
                  })
                  setActivestep(0);
                })
                return;
              }
           
              axios.get('http://127.0.0.1:8000/api/points')
              .then(res=>
              {
                console.log(res.data.data)
                setParents((parents) => res.data.data)
                setLoading(false);
                setActivestep((activeStep)=> activeStep+1);
              })
              .catch(err =>console.log(err))
            })
            .catch(err=>{
              console.log(err.response.data)
             
              if(err.response.status == 422)
              {
              
                  setError({...error,donationType:err.response.data.errors.donationType})
              }

            })
          break;
        }
      
        case 2:{
          setActivestep((activeStep)=> activeStep+1);
          break;
        }
     
        case 3:{
              console.log('hello');
            const arr_maladies = [];
            console.log(maladies)
            Object.keys(maladies).forEach(key => 
            {
              for(let id of maladies[key])
              {
                arr_maladies.push(id);
              }
            
            })
  
            console.log("MALADIE: ", arr_maladies);
            let local_info = {...info, answers:arr_maladies}; 
            setInfo({...info, answers:arr_maladies});
            setLoading(true)    
            axios.post('http://127.0.0.1:8000/api/people/check',local_info)
            .then(res=>
            {
              setLoading(false);
              setResult((result) => res.data.data.results);
              setPerson((person) => res.data.data.person);
              setActivestep((activeStep)=> activeStep+1);
              console.log(person)
              console.log(result)
             
            
            
            })
            .catch(err =>console.log(err))
           
           
           
            break;
          }
          case 4:{setActivestep((activeStep)=> activeStep+1);
          break;
          }
      }
    
    

    }
    const [value,setValue]= React.useState({});
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
      bloodType:'',
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
      bloodType:'',
  
    })
  
    
    const[result,setResult]=React.useState([])
    const [parents,setParents]= React.useState([])
   
    const [person,setPerson] =React.useState({});
    const [checked,setChecked]=React.useState(false);
    const [valueChecked,setValueChecked] = React.useState(false);
    const renderSwitch =(steps)=>{
      switch(steps){
        case 0:
          return <Personalinfo error={error} info={info} setInfo={setInfo} />
        case 1:
          return <Questions  value={value} setValue={setValue} valueChecked ={valueChecked } setValueChecked={setValueChecked} setChecked={setChecked} setError={setError} error={error} checked={checked} setChecked={setChecked} answers={info} setAnswers={setInfo} />
        case 2:
          return <Maladies 
            parents={parents}
            maladies={maladies} 
            setMaladies={setMaladies}
           
          />
        
        case 3:return <Medicament 
            parents={parents}
            maladies={maladies} 
            setMaladies={setMaladies}/>
        case 4: return <ResultsPage setChecked={setChecked}setValue={setValue} info={info} setError={setError} result={result} setInfo={setInfo} setActivestep={setActivestep}  setMaladies={setMaladies} person={person}/>
        
      }
  
    }

    const [selectedTab, setSelectedTab] = React.useState(0) 

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