import React, { useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function JobApplyModal({screeningAnswers,setScreeningAnswers, fileInputRef, closeMessage, fileName, setFileName, handleInputChange, setErrors, errors, handleSubmit, fileSize, handleUploadClick, handleFileChange, formData, setFormData, setIsSubmitting, isSubmitting, submitError, setSubmitError, submitSuccess, open, onClose }) {

    const formRef = useRef(null);
    // const fileInputRef = useRef(null);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl w-[98vw] max-w-3xl p-0 relative">
                <div className="flex items-center gap-3 px-8 pt-8 pb-2">
                    <button
                        className="text-gray-600 hover:text-blue-700 text-xl"
                        onClick={onClose}
                        aria-label="Back"
                        type="button"
                    >
                        <FaArrowLeft />
                    </button>
                    <span className="font-semibold text-lg text-gray-700">Go to Apply Page</span>
                </div>
                <div className="px-8">
                    <h2 className="font-bold text-2xl mt-2 mb-1 text-gray-900">
                        Complete All Required Fields and Upload Your Resume to Proceed with Your Application
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Kindly ensure you answer all the recruiter’s questions accurately and upload your updated resume to successfully apply for the position.
                    </p>
                </div>
                <div className="w-full max-w-2xl mx-auto mt-8 mb-8 py-5 px-4 flex flex-col items-center gap-8 bg-white rounded-2xl shadow relative z-20">
                    <h3 className="w-full max-w-[600px] text-xl font-semibold leading-[120%] text-center text-black">
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
        </div>
    );
}