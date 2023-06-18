import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'
import '../CreateCampaign/createcampaign.scss'
import { FormField } from '../../components'
import { checkIfImage } from '../../utils'
import { moneybag } from '../../assets'
import { useNavigate } from 'react-router'
import { useStateContext } from '../../context'
import { Loader } from '../../components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateResearchCampaign = () => {
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const navigate = useNavigate();
  const { createResearchCampaign } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    organisationName: '',
    organisationLogo: '',
    researchLead: '',
    title: '',
    image: '',
    description: '',
    documentUrl: '',
    target: '',
    deadline: '',
  })

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
    console.log(form)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    checkIfImage(form.image, async (exists) => {
      if(exists){
        
      }
      else {
        // alert('Provide valid image URL')
        toast.error('Provide valid image URL')
        setForm({ ...form, image: '' })
      }
    })

    try {
      setIsLoading(true);
      
      //check if deadline is in the future
      if(form.deadline <= new Date().toISOString().slice(0, 10)){
        setForm({ ...form, deadline: '' })
        throw('Campaign deadline must be after the day of creation. Please try again.')           
      }

      //check if user is signed in to google
      if(localStorage.getItem("isSignedIn")==="false" || localStorage.getItem("isSignedIn")===null){
        throw('Please Sign In and try again.')
      }

      //create new research campaign
      await createResearchCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)}); //change target from readable form to weight of ETH
      console.log(form)
      
      //navigate('/campaigns');
      // toast.success("Campaign was successfully created.")

    } catch(error) {
      toast.error(error)
    }
    setIsLoading(false);

   }
  //  console.log(form)
  
  return (
    <>
      {isLoading && <Loader title="Creating campaign"/>}

      <div className='cc-page-container'>
        <header className='page-header'>
          <span><h1>create</h1></span>
          <div className="line"></div>
          <span><h1>research</h1></span>
          <div className="line"></div>
          <span><h1>campaign</h1></span>
          <div className="line"></div>
        </header>

          <form onSubmit={handleSubmit}>
            <div>
              <FormField
                  labelName="Name of organisation*"
                  inputType="text"
                  value={form.organisationName}
                  handleChange={(e) => {handleFormFieldChange('organisationName', e)}}
              />
              <FormField
                  labelName="Organisation logo URL*"
                  inputType="url"
                  value={form.organisationLogo}
                  handleChange={(e) => {handleFormFieldChange('organisationLogo', e)}}
              />
              <FormField
                  labelName="Research Lead*"
                  inputType="text"
                  value={form.researchLead}
                  handleChange={(e) => {handleFormFieldChange('researchLead', e)}}
              />
              <FormField
                  labelName="Campaign title *"
                  inputType="text"
                  value={form.title}
                  handleChange={(e) => {handleFormFieldChange('title', e)}}
              />
            </div>
              <FormField
                  labelName="About the research *"
                  inputType="text"
                  isTextArea
                  value={form.description}
                  handleChange={(e) => {handleFormFieldChange('description', e)}}
              />
              <FormField
                  labelName="Documents URL *"
                  inputType="url"
                  value={form.documentUrl}
                  handleChange={(e) => {handleFormFieldChange('documentUrl', e)}}
              />
              <FormField
                    labelName="Image URL *"
                    inputType="url"
                    value={form.image}
                    handleChange={(e) => {handleFormFieldChange('image', e)}}
              />
              <div className='banner'>
                <img src={moneybag} alt="funds"/>
                <h4>You will get 100% of the funds raised</h4>
              </div>
              <div>
                <FormField
                    labelName="Campaign goal(in ETH) *"
                    inputType="number"
                    value={form.target}
                    handleChange={(e) => {handleFormFieldChange('target', e)}}
                />
                <FormField
                    labelName="End Date *"
                    inputType="date"
                    value={form.deadline}
                    handleChange={(e) => {handleFormFieldChange('deadline', e)}}
                />
              </div>
              
              <button className='gradient-button' type='submit' title='Create new campaign'>
                Submit new campaign
              </button>
          </form>
      </div>
    </>
    
    
  )
}

export default CreateResearchCampaign