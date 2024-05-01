import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const Form = () => {
    const [companyName, setCompanyName] = useState('');
    const [file, setFile] = useState(null);
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Store the form data in Firestore
            await firestore.collection('companies').add({
                companyName,
                file,
                date,
            });

            // Reset the form fields
            setCompanyName('');
            setFile(null);
            setDate('');

            console.log('Form data stored successfully!');
        } catch (error) {
            console.error('Error storing form data:', error);
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

export default Form;