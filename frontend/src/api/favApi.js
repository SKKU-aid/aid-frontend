import axios from 'axios';

// 관심 장학 추가
export const addToFavorites = async (userID, scholarshipID) => {
  console.log('관심 장학 추가 시도:', userID, scholarshipID);
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${userID}/fav-scholarships`, {
      userID,
      scholarshipID,
    });
    if (response.data.success) {
      console.log('관심 장학 추가 성공:', response.data.message);
      return response.data;
    } else {
      console.error('Failed to add to favorites:', response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

// 관심 장학 삭제
export const removeFromFavorites = async (userID, scholarshipID) => {
  console.log('관심 장학 삭제 시도:', userID, scholarshipID);
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userID}/fav-scholarships`, {
      data: { userID, scholarshipID },
    });
    if (response.data.success) {
      console.log('관심 장학 삭제 성공:', response.data.message);
      return response.data;
    } else {
      console.error('Failed to remove from favorites:', response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};
