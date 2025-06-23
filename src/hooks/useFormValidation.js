import { useState } from 'react';

/**
 * Custom hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validateFunction - Function that returns validation errors
 * @returns {Object} Form handling utilities
 */
export const useFormValidation = (initialValues, validateFunction) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setValues({
      ...values,
      [name]: value
    });
    
    // Clear error when typing if field has been touched
    if (touched[name] && errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Mark field as touched on blur
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched({
      ...touched,
      [name]: true
    });
    
    // Validate single field on blur
    const fieldError = validateFunction({ [name]: values[name] });
    
    if (fieldError[name]) {
      setErrors({
        ...errors,
        [name]: fieldError[name]
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (submitCallback) => {
    // Validate all fields
    const validationErrors = validateFunction(values);
    setErrors(validationErrors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    
    setTouched(allTouched);
    
    // If no errors, call submit callback
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        await submitCallback(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Focus first field with error
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
  };

  // Reset form to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues
  };
};

export default useFormValidation;