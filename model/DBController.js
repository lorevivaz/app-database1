import * as SQLite from 'expo-sqlite';
import { CommunicationController } from './CommunicationController';
import AsyncStorage from '@react-native-async-storage/async-storage';


export class DBController {
    // qui creo il costruttore per inizializzare il database
    constructor() {
    this.db = null ;
   }
//funzione per leggere il sid dell'utente e memorizzarlo nello storage al primo avvio dell'app tramite la chiamata api registerUser()
    async registerUser(sid) {
        try {
            await AsyncStorage.setItem('sid', sid);
            console.log("sid stored in AsyncStorage");
        } catch (error) {
            console.log("Error in registerUser: ", error);
        }
    }

    // qui creo la funzione per aprire il database con il metodo openDatabaseSync
    // execAsync esegue una query SQL di tipo DDL (Data Definition Language) come CREATE TABLE
    async openDB() {
        this.db =  await SQLite.openDatabaseSync('userDB');
        const query = "CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, sid TEXT );";
        await this.db.execAsync(query);    
    
    }

    // metodo asincrono per salvare un utente nel database
    // runAsync che esegue una query SQL di tipo DML (Data Manipulation Language) come INSERT INTO
    async saveUser(sid) {
        const query = "INSERT INTO Users (sid) VALUES (?);";
        await this.db.runAsync(query, sid);
    }
}