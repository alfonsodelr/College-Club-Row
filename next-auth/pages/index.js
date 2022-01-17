import Layout from '../components/layouts/ClubHeader'
import Wave from '../components/WaveHeader'
import FormGenerator from '../components/FormGenerator/Index.jsx'
export default function Page() {
  return (
    <>
      <Wave headerTitle="Form Generator" />
      <FormGenerator />
    </>
  )
}