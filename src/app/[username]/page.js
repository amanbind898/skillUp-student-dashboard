"use client";
import { useEffect, useState } from 'react';
import fetchLeetCodeData from '../../lib/fetchLeetCodeData'; // Adjust import based on your structure
import { Bar } from 'react-chartjs-2'; // Import Chart.js library
import { Chart, registerables } from 'chart.js'; // Register necessary Chart.js components

// Register Chart.js components
Chart.register(...registerables);

const UserDashboard = ({ params }) => {
  const { username } = params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLeetCodeData(username);
        if (data) {
          setUserData(data);
        } else {
          setError('User data not found');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <div style={styles.loader}>Loading...</div>;
  if (error) return <p style={styles.error}>{error}</p>;

  // Prepare data for chart
  const chartData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Questions Solved',
        data: [userData.easySolved, userData.mediumSolved, userData.hardSolved],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h1>{username}'s Dashboard</h1>
      <h2>Total Solved: {userData.totalSolved}</h2>
      <h3>Ranking: {userData.ranking}</h3>
      <h3>Contribution Points: {userData.contributionPoint}</h3>
      <h3>Reputation: {userData.reputation}</h3>

      <h3>Difficulty Breakdown:</h3>
      <ul style={styles.list}>
        <li>Easy: {userData.easySolved} / {userData.totalEasy}</li>
        <li>Medium: {userData.mediumSolved} / {userData.totalMedium}</li>
        <li>Hard: {userData.hardSolved} / {userData.totalHard}</li>
      </ul>

      <h3>Questions Solved by Difficulty:</h3>
      <div style={styles.chartContainer}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Questions Solved by Difficulty',
    },
  },
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
  },
  loader: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '20px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  chartContainer: {
    marginTop: '30px',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default UserDashboard;
