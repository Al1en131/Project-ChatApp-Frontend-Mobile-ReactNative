import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

type MessageListPageProps = {
  navigation: any;
  route: any;
};

type Message = {
  receiver_id: string;
  receiver_name: string;
  last_message: string;
};

type User = {
  username: string;
};

const MessageListPage: React.FC<MessageListPageProps> = ({ navigation, route }) => {
  const { userId } = route.params;  // Make sure you're passing the userId correctly from the previous screen
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Fetch messages for the current user
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:5000/api/messages/user/${userId}`);
        setMessages(response.data);  // Set the fetched messages
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [userId]);

  // Fetch users to start new chats
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:5000/api/users`);
        const filteredUsers = response.data.filter((user: User) => user.id !== userId);  // Exclude the current user
        setUsers(filteredUsers);  // Set available users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [userId]);

  // Open the chat room with a specific user
  const openChatRoom = (receiverId: string) => {
    navigation.navigate('Chat', { userId, receiverId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.receiver_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageItem}
            onPress={() => openChatRoom(item.receiver_id)}
          >
            <Text>{`Chat with ${item.receiver_name}`}</Text>
            <Text>{item.last_message}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={<Text style={styles.subHeader}>Recent Chats</Text>}
      />

      <Text style={styles.header}>Available Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => openChatRoom(item.id)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={<Text style={styles.subHeader}>Start a New Chat</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
  },
  messageItem: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  userItem: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
});

export default MessageListPage;
