import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DBController {
  
    static async registerUser(sid) {
        try {
            await AsyncStorage.setItem('sid', sid);
            console.log("SID stored in AsyncStorage");
        } catch (error) {
            console.log("Error in registerUser: ", error);
        }
    }

    static async getUserSID() {
        try {
            const sid = await AsyncStorage.getItem('sid');
            console.log("SID retrieved from AsyncStorage: ", sid);
            return sid;
        } catch (error) {
            console.log("Error in getUserSID: ", error);
            return null;
        }
    }
    
}