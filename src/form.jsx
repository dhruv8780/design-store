import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [file, setFile] = useState(null);
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await firestore.collection('designStore').add({
        companyName,
        fileUrl: '', // Placeholder for file URL, you can upload the file to Cloud Storage and store its URL here
        date: new Date(date)
      });
      console.log('Document written with ID: ', docRef.id);
      
      // Reset form fields
      setCompanyName('');
      setFile(null);
      setDate('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Company Name:
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </label>
      <br />
      <label>
        File:
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CompanyForm;
