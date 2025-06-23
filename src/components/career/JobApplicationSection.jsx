"use client";

import React, { useState, useRef, useEffect } from 'react';
// No need for router import since we're preventing redirection
import axios from 'axios';
// Recipient email for formsubmit.co
const RECIPIENT_EMAIL = 'info@appitsoftware.com';

const JobApplicationSection = ({ jobData }) => {
  // No router needed as we're handling submission in-page
  console.log('jobdata...', jobData)
  // Animation states
  const textContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: jobData?.job_title
  });

  // File state
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [fileBase64, setFileBase64] = useState("");
  const [fileSize, setFileSize] = useState("");

  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Refs
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  // Set initial text position
  useEffect(() => {
    if (textContainerRef.current) {
      // Set to show first section fully
      textContainerRef.current.scrollTop = 0;
    }
  }, []);

  // Scrolling effect for text (similar to CareerFirstSection)
  useEffect(() => {
    const handleMouseEnter = () => {
      setIsHoveringText(true);
    };

    const handleMouseLeave = () => {
      setIsHoveringText(false);
    };

    // Scroll handler - only active when hovering over text
    const handleScroll = (event) => {
      // Skip for mobile or if not hovering text
      if (window.innerWidth < 768 || !isHoveringText || !textContainerRef.current) return;

      const textContainer = textContainerRef.current;
      const textHeight = textContainer.scrollHeight - textContainer.clientHeight;

      // Determine direction
      const scrollingDown = event.deltaY > 0;

      // Special handling when scrolling down and reached bottom
      if (scrollingDown && textContainer.scrollTop >= textHeight - 20) {
        setHasReachedBottom(true);
        return; // Let default scroll take over
      }

      // Special handling when scrolling up and at the top
      if (!scrollingDown && textContainer.scrollTop <= 0) {
        setHasReachedBottom(false);
        return; // Let default scroll take over
      }

      // If we're hovering and not at an edge case, handle scrolling
      if (isHoveringText) {
        event.preventDefault();

        // Calculate how much to scroll
        const scrollAmount = event.deltaY;
        textContainer.scrollTop += scrollAmount;
      }
    };

    // Reset states when section scrolls out of view
    const handleWindowScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();

      // If completely out of view, reset states
      if (sectionRect.bottom < 0 || sectionRect.top > window.innerHeight) {
        setHasReachedBottom(false);

        // Reset scroll position for next time
        if (textContainerRef.current) {
          textContainerRef.current.scrollTop = 0;
        }
      }
    };

    // Add event listeners
    if (textContainerRef.current) {
      textContainerRef.current.addEventListener('mouseenter', handleMouseEnter);
      textContainerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('scroll', handleWindowScroll);

    // Cleanup
    return () => {
      if (textContainerRef.current) {
        textContainerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        textContainerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }

      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [isHoveringText, hasReachedBottom]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Convert file to Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        try {
          // Get the base64 string
          const base64String = reader.result;
          // Check if the file size might be too large for EmailJS
          if (base64String.length > 5000000) { // ~5MB limit for EmailJS
            console.warn('File may be too large for email attachment');
          }
          resolve(base64String);
        } catch (error) {
          console.error('Error processing file:', error);
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Check file type
      const acceptedFileTypes = [
        // Images
        'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp',
        // Documents
        'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/rtf', 'text/plain', 'application/vnd.oasis.opendocument.text'
      ];

      if (acceptedFileTypes.includes(selectedFile.type)) {
        // File size check
        const maxSizeBytes = 10 * 1024 * 1024; // 10MB max
        if (selectedFile.size <= maxSizeBytes) {
          setFile(selectedFile);
          setFileName(selectedFile.name);
          setFileSize(formatFileSize(selectedFile.size));

          try {
            // Convert file to base64 for email attachment
            const base64 = await convertFileToBase64(selectedFile);
            setFileBase64(base64);

            setErrors({
              ...errors,
              file: ""
            });
          } catch (error) {
            console.error("Error converting file to base64:", error);
            setErrors({
              ...errors,
              file: "Error processing file. Please try again."
            });
          }
        } else {
          setFile(null);
          setFileName("No file chosen");
          setFileBase64("");
          setFileSize("");
          setErrors({
            ...errors,
            file: `File size exceeds ${formatFileSize(maxSizeBytes)} limit. Please upload a smaller file.`
          });
        }
      } else {
        setFile(null);
        setFileName("No file chosen");
        setFileBase64("");
        setFileSize("");
        setErrors({
          ...errors,
          file: "Please upload a valid resume file (image, PDF, Word, or text document)"
        });
      }
    } else {
      setFile(null);
      setFileName("No file chosen");
      setFileBase64("");
      setFileSize("");
    }
  };

  // Handle file upload button click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name cannot exceed 100 characters";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s()\-]{8,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // File validation
    if (!file) {
      newErrors.file = "Resume is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Close message
  const closeMessage = () => {
    setSubmitSuccess(false);
    setSubmitError("");
  };

  // Handle form submission with AJAX
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const submitFormData = new FormData();
        submitFormData.append('name', formData.name);
        submitFormData.append('email', formData.email);
        submitFormData.append('phone', formData.phone);
        submitFormData.append('message', formData.message);

        if (file) {
          submitFormData.append('attachment', file);
        }

        // Send to your backend with job id as param
        // const apiUrl = `http://localhost:5000/apply-job/${jobData.id}`;
        const apiUrl = `https://appit-backend-wb0d.onrender.com/apply-job/${jobData?.id}`;

        const response = await axios.post(apiUrl, submitFormData, {
          headers: {
            'Accept': 'application/json',
            // 'Content-Type' is set automatically by axios when using FormData
          }
        });

        const result = response.data;

        if (result && result.success) {
          setIsSubmitting(false);
          setSubmitSuccess(true);
          setFormData({
            name: "",
            phone: "",
            email: "",
            message: "Job Application for Jr UI UX Designer Intern"
          });
          setFile(null);
          setFileName("No file chosen");
          setFileBase64("");
          setFileSize("");
          if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
          }
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 20000);
        } else {
          setIsSubmitting(false);
          setSubmitError('Failed to submit your application. Please try again later.');
          setTimeout(() => {
            setSubmitError("");
          }, 20000);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setIsSubmitting(false);
        setSubmitError('Failed to submit your application. Please try again later.');
        setTimeout(() => {
          setSubmitError("");
        }, 20000);
      }
    } else {
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }

    console.log('form data....', formData);
  };

  const formatPostedDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 30) {
      // Format as "Posted: 30+ days ago"
      return 'Posted: 30+ days ago';
    } else if (diffDays === 1) {
      return 'Posted: 1 day ago';
    } else if (diffDays > 1) {
      return `Posted: ${diffDays} days ago`;
    } else {
      // Format as "Posted on DD MMM YYYY"
      return `Posted on ${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;
    }
  };

  if (!jobData) {
    return (
      <section className="w-full py-12 flex justify-center items-center">
        <div className="text-gray-500 text-lg font-medium">
          Job details not found. Please try again later.
        </div>
      </section>
    );
  } else {
    return (
      <section
        ref={sectionRef}
        className="w-full bg-white py-6 sm:py-8 md:py-12 lg:py-16 px-3 xs:px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 font-['Jost'] mt-8 sm:mt-12 md:mt-16 lg:mt-20 relative z-10 pb-8 sm:pb-12 md:pb-16 lg:pb-0"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-20 xl:gap-24 lg:pl-8 xl:pl-12">

          {/* Left side - Job details card and description */}
          <div
            ref={textContainerRef}
            className="w-full lg:w-[600px] xl:w-[650px] lg:mr-4 xl:mr-8 flex flex-col items-start gap-8 sm:gap-9 md:gap-10 lg:-mt-16 xl:-mt-16 h-[520px] sm:h-[580px] md:h-[640px] lg:h-[680px] xl:h-[720px] overflow-y-auto scrollbar-hide relative z-20 lg:ml-4 xl:ml-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Job details card */}
            <div className="w-[98%] mx-auto p-4 sm:p-6 md:p-6 flex flex-col items-start gap-6 bg-white rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-[0px_0px_4px_3px_rgba(0,0,0,0.25)] relative z-10 mt-16">

              {/* Top section with job title, role, icons */}
              <div className="w-full flex flex-row justify-between items-start gap-6">
                <div className="flex flex-col items-start gap-2.5 w-[calc(100%-70px)] sm:w-[calc(100%-80px)] md:w-[calc(100%-90px)]">
                  {/* Title and role */}
                  <div className="flex flex-col items-start gap-2.5">
                    <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black">{jobData?.job_title}</h3>
                    <p className="text-base md:text-[16px] font-semibold leading-[120%] text-[#252525]">{jobData?.company}</p>
                  </div>

                  {/* Icons with text */}
                  <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-6 mt-1">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                        <path d="M14 6V4H10V6H14ZM4 9V18C4 18.55 4.45 19 5 19H19C19.55 19 20 18.55 20 18V9C20 8.45 19.55 8 19 8H5C4.45 8 4 8.45 4 9ZM20 6C21.11 6 22 6.89 22 8V19C22 20.11 21.11 21 20 21H4C2.89 21 2 20.11 2 19L2.01 8C2.01 6.89 2.89 6 4 6H8V4C8 2.89 8.89 2 10 2H14C15.11 2 16 2.89 16 4V6H20Z" fill="#454545" />
                      </svg>
                      <span className="text-sm sm:text-base font-normal leading-[120%] text-[#454545]">0 years</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.247 20.969C13.3971 19.9254 14.4615 18.7911 15.43 17.577C17.47 15.014 18.711 12.487 18.795 10.24C18.8282 9.32679 18.6771 8.41626 18.3505 7.56278C18.024 6.7093 17.5288 5.9304 16.8945 5.27259C16.2602 4.61478 15.4998 4.09157 14.6588 3.7342C13.8177 3.37684 12.9133 3.19265 11.9995 3.19265C11.0857 3.19265 10.1813 3.37684 9.34022 3.7342C8.49918 4.09157 7.73881 4.61478 7.10451 5.27259C6.4702 5.9304 5.975 6.7093 5.64846 7.56278C5.32192 8.41626 5.17076 9.32679 5.204 10.24C5.289 12.487 6.531 15.014 8.57 17.577C9.53846 18.7911 10.6029 19.9254 11.753 20.969C11.8637 21.069 11.946 21.1417 12 21.187L12.247 20.969ZM11.262 22.134C11.262 22.134 4 16.018 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10C20 16.018 12.738 22.134 12.738 22.134C12.334 22.506 11.669 22.502 11.262 22.134ZM12 12.8C12.7426 12.8 13.4548 12.505 13.9799 11.9799C14.505 11.4548 14.8 10.7426 14.8 10C14.8 9.25739 14.505 8.5452 13.9799 8.0201C13.4548 7.495 12.7426 7.2 12 7.2C11.2574 7.2 10.5452 7.495 10.0201 8.0201C9.495 8.5452 9.2 9.25739 9.2 10C9.2 10.7426 9.495 11.4548 10.0201 11.9799C10.5452 12.505 11.2574 12.8 12 12.8ZM12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10C8 8.93913 8.42143 7.92172 9.17157 7.17157C9.92172 6.42143 10.9391 6 12 6C13.0609 6 14.0783 6.42143 14.8284 7.17157C15.5786 7.92172 16 8.93913 16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14Z" fill="#454545" />
                      </svg>
                      <span className="text-sm sm:text-base font-normal leading-[120%] text-[#454545] break-words">{jobData?.job_type} - {jobData?.job_location}</span>
                    </div>
                  </div>
                </div>

                {/* Blue circle with "U" */}
                <div className="w-[60px] h-[60px] md:w-[74px] md:h-[74px] rounded-full bg-[#0066B3] flex items-center justify-center flex-shrink-0 self-start">
                  <span className="text-lg md:text-[21px] font-semibold text-white">U</span>
                </div>
              </div>

              {/* Job post details */}
              <div className="w-full flex flex-wrap items-center gap-4 sm:gap-6 mt-1 text-sm sm:text-base font-normal text-[#4F4F4F]">
                <span>{formatPostedDate(jobData?.created_at)}</span>
                <span>Openings: 2</span>
                <span>Applicants: 120</span>
              </div>
            </div>

            {/* Job description section */}
            <div className="w-full flex flex-col gap-6 md:gap-8">
              <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black">💼 Join {jobData?.company} as a {jobData?.job_title}</h3>

              <p className="text-sm sm:text-base font-normal leading-[140%] md:leading-[160%] text-black">
                {jobData?.description}
              </p>

              <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black mt-2 md:mt-4">🧩 Your Responsibilities</h3>

              <ul className="list-disc pl-5 space-y-1 md:space-y-2 text-sm sm:text-base font-normal leading-[180%] md:leading-[200%] text-black">
                <li>Collaborate with product managers and developers to understand business goals and user needs.</li>
                <li>Design user-centric solutions including wireframes, prototypes, and high-fidelity visuals.</li>
                <li>Conduct user research, usability testing, and translate insights into design improvements.</li>
                <li>Ensure all designs are visually compelling, intuitive, and accessible across platforms.</li>
                <li>Develop and maintain design systems, style guides, and UI standards.</li>
                <li>Stay current with industry trends, tools, and best practices in UX/UI design.</li>
                <li>Present design concepts clearly and effectively to stakeholders and team members.</li>
                <li>Iterate designs based on feedback, testing, and project requirements.</li>
              </ul>

              <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black mt-6 md:mt-8">📌 Role Details</h3>

              <ul className="list-disc pl-5 space-y-1 md:space-y-2 text-sm sm:text-base font-normal leading-[180%] md:leading-[200%] text-black">
                <li>Position: UI/UX Designer</li>
                <li>Department: UX, Design & Architecture</li>
                <li>Industry: IT Services & Consulting</li>
                <li>Employment Type: Full-Time, Permanent</li>
                <li>Location: Gachibowli Hyderabad</li>
              </ul>

              <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black mt-6 md:mt-8">🎓 Education</h3>

              <ul className="list-disc pl-5 space-y-1 md:space-y-2 text-sm sm:text-base font-normal leading-[180%] md:leading-[200%] text-black">
                <li>UG: Any Graduate</li>
                <li>PG: Any Postgraduate</li>
              </ul>

              <div className="flex flex-col items-start gap-4 md:gap-6 mt-6 md:mt-8 w-full">
                <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black">🛠️ Key Skills Required</h3>

                <div className="flex items-center align-content-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap w-full">
                  {(jobData?.selected_skills && jobData?.selected_skills.length > 0 ? jobData?.selected_skills : ['No skills listed']).map((skill, index) => (
                    <span
                      key={index}
                      className="flex justify-center items-center px-2 sm:px-2.5 md:px-3 py-1 md:py-1.5 rounded-2xl border border-gray-400 text-xs md:text-sm font-normal mb-1 overflow-hidden"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom space for better scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Right side - Application form */}
          <div className="w-[90%] xs:w-[90%] sm:w-[90%] md:w-[80%] max-w-[320px] sm:max-w-[340px] md:max-w-[360px] lg:w-[380px] xl:w-[414px] mx-auto mt-16 mb-8 sm:mt-20 sm:mb-10 md:mt-24 md:mb-12 lg:-mt-16 xl:-mt-24 lg:ml-4 xl:ml-8 py-5 sm:py-6 lg:py-6 px-4 sm:px-5 md:px-6 lg:px-4 xl:px-6 flex flex-col items-center gap-6 sm:gap-8 md:gap-10 bg-white rounded-[20px] sm:rounded-[24px] md:rounded-[50px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] lg:sticky lg:top-[120px] lg:self-start relative z-20">
            <h3 className="w-full max-w-[332px] text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-center text-black">
              Apply Now and help shape the future with APPIT
            </h3>

            {/* Success message */}
            {submitSuccess && (
              <div className="w-full px-4 py-4 rounded-lg bg-green-100 border-2 border-green-500 lg:border lg:border-green-400 text-green-700 mb-4 animate-fadeIn relative z-10 shadow-md lg:shadow-none lg:py-3">
                <button onClick={closeMessage} className="absolute top-2 right-2 text-green-700 hover:text-green-900 focus:outline-none lg:focus:outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="flex items-center justify-center mb-2 lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-center font-bold text-green-800">Application Submitted Successfully!</p>
                </div>
                <p className="text-center font-medium hidden lg:block">Your application has been submitted successfully!</p>
                <p className="text-center text-sm mt-1">We'll review your application and get back to you soon.</p>
                <div className="mt-3 text-center lg:hidden">
                  <p className="text-green-700 font-medium">Thank you for your interest in APPIT Software!</p>
                </div>
              </div>
            )}

            {/* Error message */}
            {submitError && (
              <div className="w-full px-4 py-4 rounded-lg bg-red-100 border-2 border-red-500 lg:border lg:border-red-400 text-red-700 mb-4 animate-fadeIn relative z-10 shadow-md lg:shadow-none lg:py-3">
                <button onClick={closeMessage} className="absolute top-2 right-2 text-red-700 hover:text-red-900 focus:outline-none lg:focus:outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="flex items-center justify-center mb-2 lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-center font-bold text-red-800">Submission Failed</p>
                </div>
                <p className="text-center font-medium hidden lg:block">{submitError}</p>
                <p className="text-center text-sm mt-1 lg:hidden">Please try again later or contact us directly at {RECIPIENT_EMAIL}.</p>
                <p className="text-center text-sm mt-1 hidden lg:block">Please try again or contact us directly.</p>
                <div className="mt-2 text-center lg:hidden">
                  <button
                    onClick={() => {
                      setSubmitError('');
                      setTimeout(() => {
                        // Give form a chance to be visible before trying again
                        if (formRef.current) {
                          formRef.current.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 300);
                    }}
                    className="px-4 py-1 bg-red-200 hover:bg-red-300 text-red-800 rounded-md transition-colors duration-300 mt-1"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            <form ref={formRef} className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[356px] flex flex-col items-start gap-5 sm:gap-6 md:gap-8 lg:gap-6" onSubmit={handleSubmit}>
              {/* Name input */}
              <div className="w-full">
                <div className={`w-full h-[48px] sm:h-[52px] md:h-[56px] lg:h-[56px] flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-4 px-3 sm:px-4 md:px-6 lg:px-6 py-2 sm:py-2.5 lg:py-2.5 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] lg:rounded-[50px] border ${errors.name ? 'border-red-500' : 'border-black'} shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 overflow-hidden`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-auto lg:h-auto flex-shrink-0">
                    <path d="M4.5 21C4.5 21 3 21 3 19.5C3 18 4.5 13.5 12 13.5C19.5 13.5 21 18 21 19.5C21 21 19.5 21 19.5 21H4.5ZM12 12C13.1935 12 14.3381 11.5259 15.182 10.682C16.0259 9.83807 16.5 8.69347 16.5 7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3C10.8065 3 9.66193 3.47411 8.81802 4.31802C7.97411 5.16193 7.5 6.30653 7.5 7.5C7.5 8.69347 7.97411 9.83807 8.81802 10.682C9.66193 11.5259 10.8065 12 12 12Z" fill={errors.name ? '#EF4444' : 'black'} />
                  </svg>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your Name"
                    className="w-full text-xs sm:text-sm font-normal outline-none focus:outline-none bg-transparent"
                    value={formData.name}
                    onChange={handleInputChange}
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                </div>
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs mt-1 ml-2" aria-live="polite">{errors.name}</p>
                )}
              </div>

              {/* Phone number input */}
              <div className="w-full">
                <div className={`w-full h-[48px] sm:h-[52px] md:h-[56px] lg:h-[56px] flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-4 px-3 sm:px-4 md:px-6 lg:px-6 py-2 sm:py-2.5 lg:py-2.5 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] lg:rounded-[50px] border ${errors.phone ? 'border-red-500' : 'border-black'} shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 overflow-hidden`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-auto lg:h-auto flex-shrink-0">
                    <path d="M20.4375 9.23438C20.5406 9.23438 20.625 9.15 20.625 9.04688V7.64062C20.625 7.5375 20.5406 7.45312 20.4375 7.45312H16.5938V3.5625C16.5938 3.45937 16.5094 3.375 16.4062 3.375H14.9062C14.8031 3.375 14.7188 3.45937 14.7188 3.5625V7.45312H9.375V3.5625C9.375 3.45937 9.29063 3.375 9.1875 3.375H7.6875C7.58437 3.375 7.5 3.45937 7.5 3.5625V7.45312H3.5625C3.45937 7.45312 3.375 7.5375 3.375 7.64062V9.04688C3.375 9.15 3.45937 9.23438 3.5625 9.23438H7.5V14.7656H3.5625C3.45937 14.7656 3.375 14.85 3.375 14.9531V16.3594C3.375 16.4625 3.45937 16.5469 3.5625 16.5469H7.5V20.4375C7.5 20.5406 7.58437 20.625 7.6875 20.625H9.1875C9.29063 20.625 9.375 20.5406 9.375 20.4375V16.5469H14.7188V20.4375C14.7188 20.5406 14.8031 20.625 14.9062 20.625H16.4062C16.5094 20.625 16.5938 20.5406 16.5938 20.4375V16.5469H20.4375C20.5406 16.5469 20.625 16.4625 20.625 16.3594V14.9531C20.625 14.85 20.5406 14.7656 20.4375 14.7656H16.5938V9.23438H20.4375ZM14.7188 14.7656H9.375V9.23438H14.7188V14.7656Z" fill={errors.phone ? '#EF4444' : 'black'} />
                  </svg>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Enter Your Mobile Number"
                    className="w-full text-xs sm:text-sm font-normal outline-none focus:outline-none bg-transparent"
                    value={formData.phone}
                    onChange={handleInputChange}
                    aria-required="true"
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                </div>
                {errors.phone && (
                  <p id="phone-error" className="text-red-500 text-xs mt-1 ml-2" aria-live="polite">{errors.phone}</p>
                )}
              </div>

              {/* Email input */}
              <div className="w-full">
                <div className={`w-full h-[48px] sm:h-[52px] md:h-[56px] lg:h-[56px] flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-4 px-3 sm:px-4 md:px-6 lg:px-6 py-2 sm:py-2.5 lg:py-2.5 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] lg:rounded-[50px] border ${errors.email ? 'border-red-500' : 'border-black'} shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 overflow-hidden`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-auto lg:h-auto flex-shrink-0">
                    <path d="M19.875 3.75H4.125C3.42904 3.75074 2.76179 4.02755 2.26967 4.51967C1.77755 5.01179 1.50074 5.67904 1.5 6.375V17.625C1.50074 18.321 1.77755 18.9882 2.26967 19.4803C2.76179 19.9725 3.42904 20.2493 4.125 20.25H19.875C20.571 20.2493 21.2382 19.9725 21.7303 19.4803C22.2225 18.9882 22.4993 18.321 22.5 17.625V6.375C22.4993 5.67904 22.2225 5.01179 21.7303 4.51967C21.2382 4.02755 20.571 3.75074 19.875 3.75ZM19.2103 8.09203L12.4603 13.342C12.3287 13.4444 12.1667 13.4999 12 13.4999C11.8333 13.4999 11.6713 13.4444 11.5397 13.342L4.78969 8.09203C4.71038 8.03214 4.64377 7.95709 4.59372 7.87123C4.54367 7.78537 4.51118 7.69042 4.49815 7.5919C4.48511 7.49338 4.49179 7.39325 4.51778 7.29733C4.54378 7.20142 4.58858 7.11162 4.64958 7.03316C4.71058 6.95471 4.78656 6.88916 4.87312 6.84032C4.95967 6.79149 5.05506 6.76034 5.15376 6.74869C5.25245 6.73704 5.35248 6.74513 5.44802 6.77247C5.54357 6.79981 5.63272 6.84587 5.71031 6.90797L12 11.7998L18.2897 6.90797C18.447 6.7892 18.6447 6.73711 18.84 6.76296C19.0354 6.78881 19.2128 6.89053 19.3338 7.04612C19.4547 7.20171 19.5096 7.39866 19.4865 7.59439C19.4634 7.79011 19.3642 7.96888 19.2103 8.09203Z" fill={errors.email ? '#EF4444' : 'black'} />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Mail ID"
                    className="w-full text-xs sm:text-sm font-normal outline-none focus:outline-none bg-transparent"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1 ml-2" aria-live="polite">{errors.email}</p>
                )}
              </div>

              {/* Resume upload */}
              <div className="w-full">
                <div className="w-full flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    className={`flex items-center gap-1 xs:gap-1.5 sm:gap-2 lg:gap-2 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-6 py-1.5 sm:py-2 md:py-3 lg:py-3 ${errors.file ? 'bg-red-500 hover:bg-red-600' : 'bg-[#0066B3] hover:bg-[#005696]'} rounded-[30px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[50px] text-white text-[10px] xs:text-xs sm:text-sm cursor-pointer shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 overflow-hidden relative z-10 w-[150px] xs:w-[160px] sm:w-[170px] md:w-[180px] lg:w-[190px] min-w-fit`}
                    aria-controls="file-upload"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-auto lg:h-auto flex-shrink-0">
                      <path d="M6.66625 22.7678H17.3334C19.4128 22.7678 20.4474 21.7131 20.4474 19.6238V10.5034H13.175C11.8892 10.5034 11.2867 9.89054 11.2867 8.60483V1.23212H6.66625C4.5971 1.23212 3.55225 2.29669 3.55225 4.3864V19.6238C3.55225 21.723 4.5971 22.7678 6.66625 22.7678ZM13.2054 9.12726H20.3368C20.2665 8.7154 19.9751 8.3134 19.5032 7.8214L13.9584 2.18655C13.4964 1.7044 13.0747 1.41297 12.6525 1.34226V8.58512C12.6525 8.9464 12.8437 9.12726 13.2054 9.12726Z" fill="white" />
                    </svg>
                    <span>Upload Your Resume</span>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      name="attachment"
                      ref={fileInputRef}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.bmp,.webp,.rtf,.txt,.odt"
                      onChange={handleFileChange}
                      aria-required="true"
                      aria-invalid={errors.file ? "true" : "false"}
                      aria-describedby={errors.file ? "file-error" : undefined}
                    />
                  </button>
                  <span className="text-xs sm:text-sm text-black truncate max-w-[150px]" title={fileName}>{fileName}</span>
                </div>
                {errors.file && (
                  <p id="file-error" className="text-red-500 text-xs mt-1 ml-2" aria-live="polite">{errors.file}</p>
                )}
                {fileSize && (
                  <p className="text-green-600 text-xs mt-1 ml-2">
                    File size: {fileSize}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1 ml-2">
                  Accepted formats: images, PDF, Word, text documents
                </p>
              </div>

              {/* Apply button */}
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting ? "true" : "false"}
                className={`w-full h-[42px] sm:h-[44px] md:h-[48px] lg:h-[48px] mt-3 sm:mt-4 md:mt-6 lg:mt-4 xl:mt-6 flex justify-center items-center rounded-[12px] sm:rounded-[14px] md:rounded-[16px] lg:rounded-[16px] text-white text-sm sm:text-base lg:text-base font-semibold bg-gradient-to-r from-[#002C4D] to-[#0066B3] shadow-[2px_4px_4px_2px_rgba(0,0,0,0.25)_inset] hover:from-[#001f36] hover:to-[#005696] active:shadow-[1px_2px_2px_1px_rgba(0,0,0,0.25)_inset] transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''} overflow-hidden relative z-10`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SUBMITTING...
                  </div>
                ) : 'APPLY'}
              </button>
            </form>
          </div>
        </div>

        {/* Custom scrollbar styles */}
        <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
        
        /* Ensure proper stacking during scroll */
        section {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>
      </section>
    );
  }


};

export default JobApplicationSection;