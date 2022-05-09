import React, {useState, useRef} from 'react';
import CvForm from './Cvform/Cvform';
import emptyCV from './Utilities/emptyCv';
import { v4 as uuidv4 } from 'uuid';
import { useReactToPrint } from 'react-to-print';

const Main = () => {


  const [cv, setCv] = useState(emptyCV)

  const handleChangePersonal = (e) => {
    const { name, value, type} = e.target

    if (type === 'file') {
      handleChangeFile(e)
      return
    }

    setCv((prevState) => ({
      ...prevState,
      personalInfo: {
        ...prevState.personalInfo,
        [name]: value,
      },
    }))
  }

  const handleChangeFile = (e) => {
    const { name } = e.target
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setCv((prevState) => ({
        ...prevState,
        personalInfo: {
          ...prevState.personalInfo,
          [name]: reader.result,
        },
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleChangeExperience = (e, id) => {
    const { name, value } = e.target

    setCv((prevState) => {
      const newExperience = prevState.experience.map((experienceItem) => {
        if (experienceItem.id === id) {
          return { ...experienceItem, [name]: value }
        }
        return experienceItem
      })
      return { ...prevState, experience: [...newExperience] }
    })
  }

  const handleAddExperience = () => {
    setCv((prevState) => ({
      ...prevState,
      experience: [
        ...prevState.experience,
        {
          id: uuidv4(),
          position: '',
          company: '',
          city: '',
          from: '',
          to: '',
        },
      ],
    }))
  }

  const handleDeleteExperience = (id) => {
    setCv((prevState) => {
      const newExperience = prevState.experience.filter(
        (experienceItem) => experienceItem.id !== id
      )
      return { ...prevState, experience: [...newExperience] }
    })
  }
  
  const handleChangeEducation = (e, id) => {
    const { name, value } = e.target

    setCv((prevState) => {
      const newEducation = prevState.education.map((educationItem) => {
        if (educationItem.id === id) {
          return { ...educationItem, [name]: value }
        }
        return educationItem
      })
      return { ...prevState, education: [...newEducation] }
    })
  }

  const handleAddEducation = () => {
    setCv((prevState) => ({
      ...prevState,
      education: [
        ...prevState.education,
        {
          id: uuidv4(),
          universityName: '',
          city: '',
          degree: '',
          subject: '',
          from: '',
          to: '',
        },
      ],
    }))
  }

  const handleDeleteEducation = (id) => {
    setCv((prevState) => {
      const newEducation = prevState.education.filter(
        (educationItem) => educationItem.id !== id
      )
      return { ...prevState, education: [...newEducation] }
    })
  }

  const handleReset = () => {
    setCv(emptyCV)
  }

  const componentRef = useRef()

  // throws warning because react-to-print uses findDOMNode
  const handlePrint = useReactToPrint({ content: () => componentRef.current })


  return(
    <main className="cvMainContainer">
      <CvForm 
        cv={cv}
        onChangePersonal={handleChangePersonal}
        onChangeExperience={handleChangeExperience}
        onAddExperience={handleAddExperience}
        onDeleteExperience={handleDeleteExperience}
        onChangeEducation={handleChangeEducation}
        onAddEducation={handleAddEducation}
        onDeleteEducation={handleDeleteEducation}
        onPrint={handlePrint}
        onReset={handleReset}
      />

    </main>
  )
}

export default Main