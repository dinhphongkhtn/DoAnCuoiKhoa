import AsyncStorage from '@react-native-async-storage/async-storage';
export const setAccessToken = async value => {
    try {
      await AsyncStorage.setItem('accessToken', value);
    } catch (error) {
      console.log(error);
    }
  };
  
export  const getAccessToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log(accessToken);
      return accessToken;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const removeAccessToken = async ()=>{
    try{
      await AsyncStorage.removeItem('accessToken');
    }catch(error){
      console.log(error);
    }
  }