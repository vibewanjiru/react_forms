// src/MedicalForm.js
import React, { useState } from 'react';
import './Form.css';

const MedicalForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    surname: '',
    email: '',
    nationality: '',
    phoneNumber: '',
    dateOfBirth: '',
    age: '',
    height: '',
    weight: '',
    bmi: '',
    pulse: '',
    bloodPressure: '',
    oxygenLevel: '',
    maritalStatus: '',
    gender: '',
    allergies: [],
    chronicIllnesses: false,
    previousSurgeries: false,
    emergencyContact: {
      firstName: '',
      middleName: '',
      surname: '',
      phoneNumber: '',
      email: '',
      relationship: ''
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'chronicIllnesses' || name === 'previousSurgeries') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      } else {
        if (checked) {
          setFormData((prevData) => ({
            ...prevData,
            allergies: [...prevData.allergies, value],
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            allergies: prevData.allergies.filter((allergy) => allergy !== value),
          }));
        }
      }
    } else if (name.startsWith('emergencyContact')) {
      const contactField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        emergencyContact: {
          ...prevData.emergencyContact,
          [contactField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'surname', 'email', 'nationality', 'phoneNumber', 
      'dateOfBirth', 'age', 'height', 'weight', 'bmi', 'pulse', 
      'bloodPressure', 'oxygenLevel', 'maritalStatus', 'gender',
      'emergencyContact.firstName', 'emergencyContact.surname', 
      'emergencyContact.phoneNumber', 'emergencyContact.email', 
      'emergencyContact.relationship'
    ];
    
    for (let field of requiredFields) {
      const value = field.includes('emergencyContact') ? formData.emergencyContact[field.split('.')[1]] : formData[field];
      if (!value) {
        return false;
      }
    }

    if (formData.allergies.length === 0 && !formData.chronicIllnesses && !formData.previousSurgeries) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        alert('Please fill all fields and select at least one checkbox.');
        return;
      }

      localStorage.setItem('medicalFormData', JSON.stringify(formData));
      alert('Submission successful');
      setFormData({
        firstName: '',
        middleName: '',
        surname: '',
        email: '',
        nationality: '',
        phoneNumber: '',
        dateOfBirth: '',
        age: '',
        height: '',
        weight: '',
        bmi: '',
        pulse: '',
        bloodPressure: '',
        oxygenLevel: '',
        maritalStatus: '',
        gender: '',
        allergies: [],
        chronicIllnesses: false,
        previousSurgeries: false,
        emergencyContact: {
          firstName: '',
          middleName: '',
          surname: '',
          phoneNumber: '',
          email: '',
          relationship: ''
        }
      });
    } catch (error) {
      alert('An error has occurred');
    }
  };

  return (
    <div className="form-container">
      <h1>Out-patient Medical Form</h1>
      <h2>Patient's Details</h2>
      <form onSubmit={handleSubmit}>
        <label>First name</label>
        <input type="text" name="firstName" placeholder="Add your patient's name" value={formData.firstName} onChange={handleChange} />

        <label>Middle name</label>
        <input type="text" name="middleName" placeholder="Add your patient's name" value={formData.middleName} onChange={handleChange} />

        <label>Surname</label>
        <input type="text" name="surname" placeholder="Add patient's surname" value={formData.surname} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" placeholder="Add patient's email" value={formData.email} onChange={handleChange} />

        <label>Nationality</label>
        <input type="text" name="nationality" placeholder="Add your nationality" value={formData.nationality} onChange={handleChange} />

        <label>Phone number</label>
        <input type="text" name="phoneNumber" placeholder="Add patient's phone number" value={formData.phoneNumber} onChange={handleChange} />

        <label>Date of birth</label>
        <input type="date" name="dateOfBirth" placeholder="MM/DD/YYYY" value={formData.dateOfBirth} onChange={handleChange} />

        <label>Age</label>
        <input type="text" name="age" placeholder="Add patient's age" value={formData.age} onChange={handleChange} />

        <label>Height</label>
        <input type="text" name="height" placeholder="Add patient's height" value={formData.height} onChange={handleChange} />

        <label>Weight</label>
        <input type="text" name="weight" placeholder="Add patient's weight" value={formData.weight} onChange={handleChange} />

        <label>BMI</label>
        <input type="text" name="bmi" placeholder="Add patient's BMI" value={formData.bmi} onChange={handleChange} />

        <label>Pulse</label>
        <input type="text" name="pulse" placeholder="Add patient's pulse" value={formData.pulse} onChange={handleChange} />

        <label>Blood pressure</label>
        <input type="text" name="bloodPressure" placeholder="Add patient's BP" value={formData.bloodPressure} onChange={handleChange} />

        <label>Oxygen level</label>
        <input type="text" name="oxygenLevel" placeholder="Add patient's oxygen level" value={formData.oxygenLevel} onChange={handleChange} />

        <h4>Status</h4>
        <div className="radio-group">
          <label>
            <input type="radio" name="maritalStatus" value="married" checked={formData.maritalStatus === 'married'} onChange={handleChange} /> Married
          </label>
          <label>
            <input type="radio" name="maritalStatus" value="single" checked={formData.maritalStatus === 'single'} onChange={handleChange} /> Single
          </label>
          <label>
            <input type="radio" name="maritalStatus" value="widow" checked={formData.maritalStatus === 'widow'} onChange={handleChange} /> Widow
          </label>
          <label>
            <input type="radio" name="maritalStatus" value="widower" checked={formData.maritalStatus === 'widower'} onChange={handleChange} /> Widower
          </label>
          <label>
            <input type="radio" name="maritalStatus" value="engaged" checked={formData.maritalStatus === 'engaged'} onChange={handleChange} /> Engaged
          </label>
          <label>
            <input type="radio" name="maritalStatus" value="others" checked={formData.maritalStatus === 'others'} onChange={handleChange} /> Others
          </label>
        </div>

        <h4>Gender</h4>
        <div className="radio-group">
          <label>
            <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleChange} /> Other
          </label>
        </div>

        <h3>Medical History</h3>
        <h4>Please check any of the following conditions that apply to the Patient's</h4>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="allergies" value="drug allergy" checked={formData.allergies.includes('drug allergy')} onChange={handleChange} /> Drug allergy
          </label>
          <label>
            <input type="checkbox" name="allergies" value="food allergy" checked={formData.allergies.includes('food allergy')} onChange={handleChange} /> Food allergy
          </label>
          <label>
            <input type="checkbox" name="allergies" value="seasonal allergy" checked={formData.allergies.includes('seasonal allergy')} onChange={handleChange} /> Seasonal allergy
          </label>
          <label>
            <input type="checkbox" name="allergies" value="allergic asthma" checked={formData.allergies.includes('allergic asthma')} onChange={handleChange} /> Allergic Asthma
          </label>
          <label>
            <input type="checkbox" name="allergies" value="anaphylaxis" checked={formData.allergies.includes('anaphylaxis')} onChange={handleChange} /> Anaphylaxis
          </label>
          <label>
            <input type="checkbox" name="allergies" value="other" checked={formData.allergies.includes('other')} onChange={handleChange} /> Other
          </label>
        </div>

        <label>
          <input type="checkbox" name="chronicIllnesses" checked={formData.chronicIllnesses} onChange={handleChange} /> Chronic Illnesses
        </label>
        <label>
          <input type="checkbox" name="previousSurgeries" checked={formData.previousSurgeries} onChange={handleChange} /> Previous Surgeries
        </label>

        <h2>Emergency Contact</h2>

        <label>First name</label>
        <input type="text" name="emergencyContact.firstName" placeholder="Add contact's first name" value={formData.emergencyContact.firstName} onChange={handleChange} />

        <label>Middle name</label>
        <input type="text" name="emergencyContact.middleName" placeholder="Add contact's middle name" value={formData.emergencyContact.middleName} onChange={handleChange} />

        <label>Surname</label>
        <input type="text" name="emergencyContact.surname" placeholder="Add contact's surname" value={formData.emergencyContact.surname} onChange={handleChange} />

        <label>Phone number</label>
        <input type="text" name="emergencyContact.phoneNumber" placeholder="Add contact's phone number" value={formData.emergencyContact.phoneNumber} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="emergencyContact.email" placeholder="Add contact's email" value={formData.emergencyContact.email} onChange={handleChange} />

        <label>Relationship</label>
        <input type="text" name="emergencyContact.relationship" placeholder="Add contact's relationship" value={formData.emergencyContact.relationship} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MedicalForm;
