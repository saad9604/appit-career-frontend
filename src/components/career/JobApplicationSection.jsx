"use client";

import React, { useState, useRef, useEffect } from 'react';
// No need for router import since we're preventing redirection
import axios from 'axios';
import JobDataModal from './JobDataModal';
import JobApplyModal from './JobApplyModal';
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
  const [modalOpen, setModalOpen] = useState(false);
  const [applyJobModalOpen, setApplyJobModalOpen] = useState(false);
  const [screeningAnswers, setScreeningAnswers] = useState(null);
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

      const apiUrl = `https://appit-backend-wb0d.onrender.com/apply-job/${jobData?.id}`;

      const response = await axios.post(apiUrl, submitFormData, {
        headers: {
          'Accept': 'application/json',
        }
      });

      const result = response.data;
      console.log("result...", result)
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

        // ✅ Call screening answers API
        try {
          console.log("inside second try....", result.application.id)
          const screeningResponse = await axios.post(
            `https://appit-backend-wb0d.onrender.com/applications/${result.application.id}`,
            { screening_answers: screeningAnswers }, // must be an object with 'screening_answers' key
            {
              headers: {
                'Accept': 'application/json',
              }
            }
          );

          if (screeningResponse?.data?.success) {
            console.log("Screening questions added successfully");
          }
        } catch (error) {
          console.error("Error saving screening answers:", error);
        }

        setApplyJobModalOpen(false);
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
              <div className="w-full  flex flex-wrap items-center gap-4 sm:gap-6 mt-1 text-sm sm:text-base font-normal text-[#4F4F4F]">
                <div className="flex items-center gap-2">
                  <span>{formatPostedDate(jobData?.created_at)}</span>
                  <span>Openings: 2</span>
                  <span>Applicants: 120</span>
                </div>
                <div>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="px-8 py-1 rounded  text-white  transition rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#002C4D] to-[#0066B3] shadow-[0_2px_8px_0_rgba(0,0,0,0.10)] border border-white/60 hover:from-[#001f36] hover:to-[#005696] transition-all duration-200"
                  >
                    Apply
                  </button>
                </div>
              </div>

            </div>

            {/* Job description section */}
            <div className="w-[98%] mx-auto p-4 sm:p-6 md:p-6 flex flex-col items-start gap-6 bg-white rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-[0px_0px_4px_3px_rgba(0,0,0,0.25)] relative z-10">

              <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black">
                💼 Join {jobData?.company} as a {jobData?.job_title}
              </h3>

              <p className="text-sm sm:text-base font-normal leading-[140%] md:leading-[160%] text-black">
                {jobData?.description}
              </p>

              <div className="flex flex-col items-start gap-4 md:gap-6 mt-6 md:mt-8 w-full">
                <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black">
                  🛠️ Key Skills Required
                </h3>

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

            <div className="w-[98%] mx-auto p-4 sm:p-6 md:p-6 flex flex-col items-start gap-6 bg-white rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-[0px_0px_4px_3px_rgba(0,0,0,0.25)] relative z-10">

              <h3 className="text-lg sm:text-xl md:text-[21px] font-semibold leading-[120%] text-black">
                About Appit Software
              </h3>

              <p className="text-sm sm:text-base font-normal leading-[140%] md:leading-[160%] text-black">
                Appit Software is a forward-thinking technology company committed to delivering smart, scalable, and user-focused digital solutions. We specialize in software development, UI/UX design, cloud services, and AI-powered innovations that help businesses streamline operations and drive growth. With a focus on quality, performance, and creativity, we partner with startups, enterprises, and everything in between to turn ideas into impactful digital experiences.
              </p>
            </div>

            {/* Bottom space for better scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Right side - Application form */}

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
        <JobDataModal screeningAnswers={screeningAnswers} setScreeningAnswers={setScreeningAnswers} open={modalOpen} onClose={() => setModalOpen(false)} jobData={jobData} setApplyJobModalOpen={setApplyJobModalOpen} />
        <JobApplyModal screeningAnswers={screeningAnswers} setScreeningAnswers={setScreeningAnswers} fileInputRef={fileInputRef} closeMessage={closeMessage} fileName={fileName} setFileName={setFileName} handleInputChange={handleInputChange} errors={errors} setErrors={setErrors} handleSubmit={handleSubmit} fileSize={fileSize} handleUploadClick={handleUploadClick} handleFileChange={handleFileChange} formData={formData} setFormData={setFormData} setIsSubmitting={setIsSubmitting} isSubmitting={isSubmitting} submitError={submitError} setSubmitError={setSubmitError} submitSuccess={submitSuccess} open={applyJobModalOpen} onClose={() => setApplyJobModalOpen(false)} />
      </section>
    );
  }


};

export default JobApplicationSection;