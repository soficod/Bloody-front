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
