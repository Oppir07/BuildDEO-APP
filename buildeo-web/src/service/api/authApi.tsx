import axios from 'axios'

const API_URL = 'http://127.0.0.1:8080';


export const registerUser = async (userData) => {
     try{
          const respone = await axios.post(`${API_URL}/users`,userData)
          return respone.data;
     }catch(err){
          console.error('Failed to create new user', err);
          throw err;
     }
};
