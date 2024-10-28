import React from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { Card, Title, Button, Paragraph } from 'react-native-paper';
import { deletePdf } from '../utils/api';

const PdfTable = ({ pdfUrls, fetchPdfList }) => {
  const handleDelete = async (name) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await deletePdf(name);
              fetchPdfList();
            } catch (error) {
              console.error('Error deleting file:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={pdfUrls}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph>{item.url}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => Alert.alert('View', `Opening ${item.url}`)}>View</Button>
            <Button color="red" onPress={() => handleDelete(item.name)}>Delete</Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

export default PdfTable;