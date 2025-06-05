// src/pages/GetAllQAs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetAllQAs = () => {
  const [qas, setQAs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://astrooneapi.ksdelhi.net/api/chatbot/admin/get_all_qa')
      .then(res => {
        setQAs(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert('Error fetching data');
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📖 Q&A Management</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {qas.map((qa) => (
            <div key={qa._id} style={styles.card}>
              <h3 style={styles.question}>{qa.questions.english}</h3>
              <p><strong>Answer:</strong> {qa.answer.english}</p>
              <p><strong>Category:</strong> {qa.categoryId?.categoryName?.english}</p>
              <p style={styles.keywords}>
                <strong>Keywords:</strong> {qa.keywords.join(', ')}
              </p>
            </div>
          ))}
        </>
      )}

      <button onClick={() => navigate('/letter-to-god/add-qa')} style={styles.fab}>
        ➕
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9fc',
    minHeight: '100vh',
    position: 'relative'
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
  fab: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#D56A14',
    color: 'white',
    fontSize: '1.5rem',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    cursor: 'pointer',
  },
};

export default GetAllQAs;
