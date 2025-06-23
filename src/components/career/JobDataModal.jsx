import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function JobDataModal({ open, onClose, jobData , setApplyJobModalOpen}) {
  const [answers, setAnswers] = useState({});
  const [customAnswer, setCustomAnswer] = useState("");

  if (!open) return null;

  const handleRadioChange = (category, value) => {
    setAnswers((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleCustomChange = (e) => {
    setCustomAnswer(e.target.value);
  };

  const handleNext = () => {
    setApplyJobModalOpen(true);
    onClose();
  };

  return (
     <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-0 relative max-h-[80vh] overflow-y-auto">
        {/* Header with back arrow */}
        <div className="flex items-center gap-3 px-8 pt-8 pb-2">
          <button
            className="text-gray-600 hover:text-blue-700 text-xl"
            onClick={onClose}
            aria-label="Back"
          >
            <FaArrowLeft />
          </button>
          <span className="font-semibold text-lg text-gray-700">Go to Careers Page</span>
        </div>
        {/* Title and subtitle */}
        <div className="px-8">
          <h2 className="font-bold text-2xl mt-2 mb-1 text-gray-900">
            Complete All Required Fields and Upload Your Resume to Proceed with Your Application
          </h2>
          <p className="text-gray-500 mb-6">
            Kindly ensure you answer all the recruiter’s questions accurately and upload your updated resume to successfully apply for the position.
          </p>
        </div>
        {/* Card-like questions area */}
        <form className="bg-gray-50 rounded-xl mx-6 px-8 py-6 flex flex-col gap-8 shadow border">
          {Array.isArray(jobData?.screening_categories) &&
            jobData.screening_categories.map((category, idx) => (
              <div key={idx}>
                <label className="block font-medium mb-3 text-gray-900">
                  <span className="font-semibold mr-2">{idx + 1}.</span>
                  Are you eligible with respect to <span className="font-semibold">{category}</span>?
                </label>
                <div className="flex gap-8 ml-6">
                  <label className="flex items-center gap-2 text-gray-700 text-base">
                    <input
                      type="radio"
                      name={`screening_${idx}`}
                      value="yes"
                      checked={answers[category] === "yes"}
                      onChange={() => handleRadioChange(category, "yes")}
                      className="accent-blue-600 w-5 h-5"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-gray-700 text-base">
                    <input
                      type="radio"
                      name={`screening_${idx}`}
                      value="no"
                      checked={answers[category] === "no"}
                      onChange={() => handleRadioChange(category, "no")}
                      className="accent-blue-600 w-5 h-5"
                    />
                    No
                  </label>
                </div>
              </div>
            ))}

          {jobData?.custom_question && jobData.custom_question.trim() !== "" && (
            <div>
              <label className="block font-medium mb-3 text-gray-900">
                <span className="font-semibold mr-2">
                  {Array.isArray(jobData?.screening_categories)
                    ? jobData.screening_categories.length + 1
                    : 1}
                  .
                </span>
                {jobData.custom_question}
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                value={customAnswer}
                onChange={handleCustomChange}
                placeholder="Enter Your Answer"
              />
            </div>
          )}
        </form>
        {/* Next button */}
        <div className="flex justify-center mt-8 mb-6">
          <button
            type="button"
            className="w-1/2 py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-blue-700 to-blue-400 shadow-lg hover:from-blue-800 hover:to-blue-500 transition"
            onClick={handleNext}
          >
            Next <span className="ml-2">&#8594;</span>
          </button>
        </div>
      </div>
    </div>
  );
}