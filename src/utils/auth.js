import AsyncStorage from '@react-native-community/async-storage';

export const setToken = async (token) =>
  await AsyncStorage.setItem('jwt', token);

export const getToken = async () => await AsyncStorage.getItem('jwt');

export const setUser = async (user) =>
  await AsyncStorage.setItem('user', JSON.stringify(user));

export const getUser = async () => {
  const user = await AsyncStorage.getItem('user');
  return JSON.parse(user);
};

export const unsetAuth = async () => {
  AsyncStorage.removeItem('user');
  AsyncStorage.removeItem('jwt');
};
