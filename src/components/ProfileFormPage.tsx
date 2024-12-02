// src/components/ProfileFormPage.tsx

import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validateName, validateEmail, validateAge } from '../utils/validation';

const ProfileFormPage = () => {
  const { setProfile } = useProfile();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Pre-fill form if profile exists in localStorage or context
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const validationErrors: any = {};
    if (!validateName(formData.name)) validationErrors.name = 'Name must be at least 3 characters long';
    if (!validateEmail(formData.email)) validationErrors.email = 'Invalid email format';
    if (formData.age && !validateAge(formData.age)) validationErrors.age = 'Age must be a number';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/profiles`, formData);
      setProfile(response.data);
      localStorage.setItem('profile', JSON.stringify(response.data));
      navigate('/profile');
    } catch (error) {
      setErrors({ api: 'Failed to save profile. Please try again later.' });
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <h1>Create or Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <p>{errors.name}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
        />
        {errors.age && <p>{errors.age}</p>}
        {errors.api && <p>{errors.api}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ProfileFormPage;
