import Layout from '../components/layouts/ClubHeader'
import Wave from '../components/WaveHeader'
import FormGenerator from '../components/FormGenerator/Index.jsx'
import Box from '@mui/material/Box';


export default function Page() {
  return (
    <Box sx={{ backgroundColor: 'red', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Wave headerTitle="Form Generator" />
      <FormGenerator />
    </Box>
  )
}