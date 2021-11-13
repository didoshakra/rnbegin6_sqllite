//app.js https://reactnativecode.com/creating-sqlite-database-table-in-react-native/
//Створення {name: 'SchoolDatabase.db'}+'Student_Table'
import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'SchoolDatabase.db'});

const App = () => {
  const createTable = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Student_Table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Student_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Student_Table(student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_name VARCHAR(30), student_phone INT(15), student_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
    Alert.alert('SQLite Database and Table Successfully Created...');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={{textAlign: 'center', fontSize: 22, color: 'red'}}>
        ReactNative SQLlite
      </Text>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={createTable}>
          <Text style={styles.touchableOpacityText}>
            Click Here To Create SQLite Database and Table in React Native
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  touchableOpacity: {
    backgroundColor: '#1B5E20',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  touchableOpacityText: {
    color: '#FFFFFF',
    fontSize: 23,
    textAlign: 'center',
    padding: 8,
  },
});

export default App;
