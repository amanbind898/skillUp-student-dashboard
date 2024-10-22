import axios from 'axios';

// Function to fetch LeetCode user data
const fetchLeetCodeData = async (username) => {
  try {
    const response = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    return null;
  }
};

export default fetchLeetCodeData;
