import axios from "axios";
import { setPosts, setPostDetails } from "../reducer/postReducers";
import { toast } from "react-toastify";

// Function to get all the posts
export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    dispatch(setPosts(response.data));
    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

// Function to get the details
export const getPostDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    dispatch(setPostDetails(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};
