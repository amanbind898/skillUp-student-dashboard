"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a valid username.');
      return;
    }
    router.push(`/${username}`);
  };

  return (
    <div style={styles.container}>
      <h1>Student Coding Progress Tracker</h1>
      <p>Track your progress across coding platforms like LeetCode, CodeChef, and more!</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter your LeetCode username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Track Progress</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  form: {
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    marginLeft: '10px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Home;
