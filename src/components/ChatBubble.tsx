import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ message }: any) => {
  return (
    <View style={styles.container}>
      {message.parentMessageId && (
        <View style={styles.replyContainer}>
          <Text style={styles.replyText}>Replying to: {message.parentMessageId}</Text>
        </View>
      )}
      <Text style={styles.sender}>{message.sender}:</Text>
      <Text style={styles.message}>{message.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  sender: {
    fontWeight: 'bold',
  },
  message: {
    marginTop: 5,
  },
  replyContainer: {
    padding: 5,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    marginBottom: 5,
  },
  replyText: {
    fontSize: 12,
    color: '#555',
  },
});

export default ChatBubble;
