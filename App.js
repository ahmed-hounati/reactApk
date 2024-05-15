import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://g9hc7scfph.execute-api.eu-north-1.amazonaws.com/dev/media')
      .then(res => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // empty dependency array to run effect only once

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.name}</Text>
      <FlatList
        data={item.users}
        keyExtractor={(nestedItem, nestedIndex) => nestedIndex.toString()}
        renderItem={({ item: nestedUser }) => (
          <Text style={styles.nestedUserName}>{nestedUser.name}</Text>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  userContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  nestedUserName: {
    fontSize: 18,
  },
});
