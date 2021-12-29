import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));
const StyledDonationCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(126, 127, 128)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));
const StyledDonationRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "rgb(240, 240, 240,0.2)",
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "rgb(219, 238, 255,0.2)",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Row(props) {
  const { row } = props;
  // const row = props.row <- this is the same thing
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.lname}
        </StyledTableCell>
        <StyledTableCell align="right">{row.fname}</StyledTableCell>
        <StyledTableCell align="right">{row.birthdate}</StyledTableCell>
        <StyledTableCell align="right">{row.sex == "woman" ? "Femme":"Homme"}</StyledTableCell>
    
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Donnations
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledDonationRow>
                 
                    <StyledDonationCell>Type de don</StyledDonationCell>
                    <StyledDonationCell>Type de donneur </StyledDonationCell>
                    <StyledDonationCell >Site</StyledDonationCell>
                    <StyledDonationCell >Date et heure</StyledDonationCell>
                    {
                      row.donations.map((donationRow)=>(
                        donationRow.patient_fname != null &&
                        <>
                              <StyledDonationCell key={donationRow.id}>Nom du malade</StyledDonationCell>
                              <StyledDonationCell key={donationRow.id}>Prénom du malade </StyledDonationCell>
                              <StyledDonationCell key={donationRow.id}>Service</StyledDonationCell>
                              <StyledDonationCell key={donationRow.id}>Clinique</StyledDonationCell>
                        </>
                      ))
                    }
             
                  </StyledDonationRow>
                </TableHead>
                <TableBody>
                  {row.donations.map((donationRow) => (
                    <StyledDonationRow key={donationRow.id}>
                      <StyledTableCell component="th" scope="row">
                        {donationRow.donation_type}
                      </StyledTableCell>
                      <StyledTableCell>{donationRow.donor_type == "regular"?"Régulier":donationRow.donor_type == "irregular"?"Irrégulier": "Famille"}</StyledTableCell>
                      <StyledTableCell >{donationRow.site=="fix"?"Fixe":donationRow.site=="mobile"? "Mobile":""}</StyledTableCell>
                      <StyledTableCell >{donationRow.created_at}</StyledTableCell>
                      
                      {
                        donationRow.patient_fname != null &&
                        <>
                        <StyledTableCell >{donationRow.patient_lname}</StyledTableCell>
                        <StyledTableCell >{donationRow.patient_fname}</StyledTableCell>
                        <StyledTableCell >{donationRow.patient_service}</StyledTableCell>
                        <StyledTableCell >{donationRow.patient_clinic}</StyledTableCell>
                        </>
                      }
                      
                      
                    </StyledDonationRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({data}) {
  return (
    <Box
      sx={{marginTop:"50px",
            width:"90%",
            '&>':{width:"80%"}
    }}
    >
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell>Nom</StyledTableCell>
            <StyledTableCell align="right">Prénom</StyledTableCell>
            <StyledTableCell align="right">Date de naissance</StyledTableCell>
            <StyledTableCell align="right">Sexe</StyledTableCell>
            
           
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
 
}
