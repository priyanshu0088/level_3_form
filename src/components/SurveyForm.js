// src/components/SurveyForm.js

import React, { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import validate from '../utils/validate';
import axios from 'axios';
import styles from './SurveyForm.module.css';

const SurveyForm = () => {
  const initialState = {
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: ''
  };

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [summary, setSummary] = useState(null);
  const { values, errors, handleChange, handleSubmit } = useForm(initialState, validate, async (values) => {
    const response = await fetchAdditionalQuestions(values.surveyTopic);
    setSummary({
      ...values,
      additionalQuestions: response.data.questions
    });
  });

  useEffect(() => {
    if (values.surveyTopic) {
      fetchAdditionalQuestions(values.surveyTopic);
    }
  }, [values.surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await axios.get(`https://api.example.com/questions?topic=${topic}`);
      setAdditionalQuestions(response.data.questions);
      return response;
    } catch (error) {
      console.error('Error fetching additional questions:', error);
      return { data: { questions: [] } };
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Survey Form</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Full Name</label>
          <input type="text" name="fullName" value={values.fullName} onChange={handleChange} className={styles.input} />
          {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} className={styles.input} />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Survey Topic</label>
          <select name="surveyTopic" value={values.surveyTopic} onChange={handleChange} className={styles.select}>
            <option value="">Select a topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p className={styles.error}>{errors.surveyTopic}</p>}
        </div>

        {values.surveyTopic === 'Technology' && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Favorite Programming Language</label>
            <select name="favoriteProgrammingLanguage" value={values.favoriteProgrammingLanguage} onChange={handleChange} className={styles.select}>
              <option value="">Select a language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteProgrammingLanguage && <p className={styles.error}>{errors.favoriteProgrammingLanguage}</p>}
            <label className={styles.label}>Years of Experience</label>
            <input type="number" name="yearsOfExperience" value={values.yearsOfExperience} onChange={handleChange} className={styles.input} />
            {errors.yearsOfExperience && <p className={styles.error}>{errors.yearsOfExperience}</p>}
          </div>
        )}

        {values.surveyTopic === 'Health' && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Exercise Frequency</label>
            <select name="exerciseFrequency" value={values.exerciseFrequency} onChange={handleChange} className={styles.select}>
              <option value="">Select frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <p className={styles.error}>{errors.exerciseFrequency}</p>}
            <label className={styles.label}>Diet Preference</label>
            <select name="dietPreference" value={values.dietPreference} onChange={handleChange} className={styles.select}>
              <option value="">Select preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <p className={styles.error}>{errors.dietPreference}</p>}
          </div>
        )}

        {values.surveyTopic === 'Education' && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Highest Qualification</label>
            <select name="highestQualification" value={values.highestQualification} onChange={handleChange} className={styles.select}>
              <option value="">Select qualification</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && <p className={styles.error}>{errors.highestQualification}</p>}
            <label className={styles.label}>Field of Study</label>
            <input type="text" name="fieldOfStudy" value={values.fieldOfStudy} onChange={handleChange} className={styles.input} />
            {errors.fieldOfStudy && <p className={styles.error}>{errors.fieldOfStudy}</p>}
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>Feedback</label>
          <textarea name="feedback" value={values.feedback} onChange={handleChange} className={styles.textarea}></textarea>
          {errors.feedback && <p className={styles.error}>{errors.feedback}</p>}
        </div>

        <button type="submit" className={styles.button}>Submit</button>

        {additionalQuestions.length > 0 && (
          <div className={styles.additionalQuestions}>
            <h3>Additional Questions</h3>
            {additionalQuestions.map((question, index) => (
              <div key={index} className={styles.additionalQuestion}>
                <label className={styles.label}>{question.label}</label>
                <input type={question.type} name={question.name} className={styles.input} />
              </div>
            ))}
          </div>
        )}
      </form>

      {summary && (
        <div className={styles.summary}>
          <h3>Summary of Submitted Data</h3>
          <p><strong>Full Name:</strong> {summary.fullName}</p>
          <p><strong>Email:</strong> {summary.email}</p>
          <p><strong>Survey Topic:</strong> {summary.surveyTopic}</p>
          
          {summary.surveyTopic === 'Technology' && (
            <>
              <p><strong>Favorite Programming Language:</strong> {summary.favoriteProgrammingLanguage}</p>
              <p><strong>Years of Experience:</strong> {summary.yearsOfExperience}</p>
            </>
          )}

          {summary.surveyTopic === 'Health' && (
            <>
              <p><strong>Exercise Frequency:</strong> {summary.exerciseFrequency}</p>
              <p><strong>Diet Preference:</strong> {summary.dietPreference}</p>
            </>
          )}

          {summary.surveyTopic === 'Education' && (
            <>
              <p><strong>Highest Qualification:</strong> {summary.highestQualification}</p>
              <p><strong>Field of Study:</strong> {summary.fieldOfStudy}</p>
            </>
          )}

          <p><strong>Feedback:</strong> {summary.feedback}</p>

          {summary.additionalQuestions && summary.additionalQuestions.length > 0 && (
            <div>
              <h4>Additional Questions</h4>
              {summary.additionalQuestions.map((question, index) => (
                <div key={index}>
                  <p><strong>{question.label}:</strong> {values[question.name]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
