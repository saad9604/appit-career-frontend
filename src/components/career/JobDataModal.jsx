import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function JobDataModal({ screeningAnswers, setScreeningAnswers, open, onClose, jobData, setApplyJobModalOpen }) {
  const [answers, setAnswers] = useState({});
  const [customAnswer, setCustomAnswer] = useState("");
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleCustomChange = (e) => {
    setCustomAnswer(e.target.value);
  };

  const validateAnswers = () => {
    const newErrors = {};
    const totalQuestions = jobData?.screening_categories?.length || 0;

    for (let i = 0; i < totalQuestions; i++) {
      if (!answers[i]) {
        newErrors[i] = "This question is required";
      }
    }

    if (jobData?.custom_question && customAnswer.trim() === "") {
      newErrors["custom"] = "This question is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateAnswers()) return;

    const screening_answers = {};

    jobData.screening_categories.forEach((catStr, idx) => {
      const { question } = JSON.parse(catStr);
      screening_answers[question] = answers[idx];
    });

    if (jobData?.custom_question && customAnswer.trim() !== "") {
      screening_answers[jobData.custom_question] = customAnswer.trim();
    }

    // ✅ Instead of API call, set to parent state and log
    setScreeningAnswers(screening_answers);
    console.log("Screening Answers Collected:", screening_answers);

    setApplyJobModalOpen(true);
    onClose();
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl w-[95vw] max-w-2xl max-h-[90vh] flex flex-col p-0 relative overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-3 px-8 pt-8 pb-2 flex-shrink-0">
          <button
            className="text-gray-600 hover:text-blue-700 text-xl"
            onClick={onClose}
            aria-label="Back"
          >
            <FaArrowLeft />
          </button>
          <span className="font-semibold text-lg text-gray-700">Go to Careers Page</span>
        </div>

        {/* Intro */}
        <div className="px-8 flex-shrink-0">
          <h2 className="font-bold text-2xl mt-2 mb-1 text-gray-900">
            Complete All Required Fields and Upload Your Resume to Proceed with Your Application
          </h2>
          <p className="text-gray-500 mb-6">
            Kindly ensure you answer all the recruiter’s questions accurately and upload your updated resume to successfully apply for the position.
          </p>
        </div>

        {/* Form */}
        <form
          className="bg-gray-50 rounded-2xl mx-4 sm:mx-8 px-4 sm:px-8 py-6 flex flex-col gap-8 shadow border
          w-full max-w-[90%] min-w-0 min-h-[200px] flex-1 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 220px)" }}
        >
          {/* Screening Questions */}
          {Array.isArray(jobData?.screening_categories) &&
            jobData.screening_categories.map((catStr, idx) => {
              const { question, category } = JSON.parse(catStr);
              return (
                <div key={idx}>
                  <label className="block font-medium mb-3 text-gray-900">
                    <span className="font-semibold mr-2">{idx + 1}.</span>
                    {question}
                  </label>

                  {category === "Custom Question" ? (
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                      value={answers[idx] || ""}
                      onChange={(e) => handleAnswerChange(idx, e.target.value)}
                      placeholder="Enter your answer"
                    />
                  ) : (
                    <div className="flex gap-8 ml-6">
                      <label className="flex items-center gap-2 text-gray-700 text-base">
                        <input
                          type="radio"
                          name={`screening_${idx}`}
                          value="yes"
                          checked={answers[idx] === "yes"}
                          onChange={() => handleAnswerChange(idx, "yes")}
                          className="accent-blue-600 w-5 h-5"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-gray-700 text-base">
                        <input
                          type="radio"
                          name={`screening_${idx}`}
                          value="no"
                          checked={answers[idx] === "no"}
                          onChange={() => handleAnswerChange(idx, "no")}
                          className="accent-blue-600 w-5 h-5"
                        />
                        No
                      </label>
                    </div>
                  )}

                  {errors[idx] && (
                    <p className="text-red-500 text-sm mt-1 ml-6">{errors[idx]}</p>
                  )}
                </div>
              );
            })}

          {/* Custom Question (outside categories) */}
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
              {errors["custom"] && (
                <p className="text-red-500 text-sm mt-1">{errors["custom"]}</p>
              )}
            </div>
          )}
        </form>

        {/* Next Button */}
        <div className="flex justify-center mt-4 mb-6 flex-shrink-0 px-4 sm:px-8">
          <button
            type="button"
            className="w-full max-w-[520px] mx-auto flex items-center justify-center gap-3 py-3 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#002C4D] to-[#0066B3] shadow-[0_2px_8px_0_rgba(0,0,0,0.10)] border border-white/60 hover:from-[#001f36] hover:to-[#005696] transition-all duration-200"
            onClick={handleNext}
          >
            Next <span className="ml-2 text-xl">&#8594;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
