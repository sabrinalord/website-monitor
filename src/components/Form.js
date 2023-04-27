import React, { useState } from 'react';
import axios from 'axios';
import api from '../services/api';

const Form = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [textToLookFor, setTextToLookFor] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/checkWebsite', {
        websiteUrl,
        textToLookFor,
        phoneNumber
      });
      if (response.data.message === 'Text not found') {
        setNotificationSent(true);
      } else {
        setNotificationSent(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {notificationSent && <p>Notification sent!</p>}
      <form onSubmit={handleSubmit}>
        <label>Website URL:</label>
        <input
          type="text"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
        <label>Text to look for:</label>
        <input
          type="text"
          value={textToLookFor}
          onChange={(e) => setTextToLookFor(e.target.value)}
        />
        <label>Phone number for notification:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
