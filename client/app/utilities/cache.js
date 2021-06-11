import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';

const prefix = "cache";
const expiryInMinutes = 5

const store = async (key, value) => {
  try {
      const item = {
          value: value,
          timestamp: Date.now()
      }
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const checkExpiry = (item) => {
    const now = moment(Date.now())
    const storedTime = moment(item.timestamp)
    return now.diff(storedTime, 'minutes') > expiryInMinutes
} 

const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(prefix + key)
        const item = JSON.parse(value)

        // If item does not exist
        if(!item) return null

        // If item is expired
        if(checkExpiry(item)){
            await AsyncStorage.removeItem(prefix + key)
            return null
        }

        return item.value

    } catch (error) {
        console.log(error)
    }
}

export default {
  store,
  get
};
