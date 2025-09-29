// src/pages/GetAllAIQAs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllAIQAs = () => {
  const [qas, setQAs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://api.astroone.in/api/chatbot/admin/get_all_ai_qa')
      .then((res) => {
        setQAs(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Error fetching AI QAs');
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🤖 AI Q&A </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {qas.map((qa) => (
            <div key={qa._id} style={styles.card}>
              <h3 style={styles.question}>{qa.questions.english}</h3>
              <p><strong>Answer (EN):</strong> {qa.answer.english}</p>
              <p><strong>Answer (HI):</strong> {qa.answer.hindi}</p>
              <p><strong>Question (HI):</strong> {qa.questions.hindi}</p>
              {/* <p style={styles.keywords}>
                <strong>Keywords:</strong> {qa.keywords.length ? qa.keywords.join(', ') : '—'}
              </p> */}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9fc',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem 1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  question: {
    marginBottom: '0.5rem',
    color: '#D56A14',
  },
  keywords: {
    color: '#555',
    fontStyle: 'italic',
  },
};

export default GetAllAIQAs;
