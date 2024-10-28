import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadFile } from '../utils/api'; // Asegúrate de ajustar la ruta si es diferente

const Uploader = ({ fetchPdfList }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0];
        setFile(selectedFile);
        Alert.alert('File Selected', `You selected: ${selectedFile.name}`);
      } else {
        console.log('No file selected or selection was canceled');
        setFile(null);
        Alert.alert('Cancelled', 'No file was selected.');
      }
    } catch (error) {
      console.error('Exception captured while trying to access file:', error);
      Alert.alert('Error', 'Failed to access file.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      Alert.alert('Error', 'Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await uploadFile(file);
      if (response.status === 201) {
        console.log("ok")
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    /*
    setLoading(true);
    try {
      const response = await uploadFile(formData);
      if (response.status === 201) {
        fetchPdfList();
        Alert.alert('Success', 'File uploaded successfully');
        setFile(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload file.');
    } finally {
      setLoading(false);
    }
      */
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>File Upload Test</Text>
      <Button title="Pick a PDF" onPress={handleFilePicker} />
      {file && <Text style={styles.fileName}>Selected: {file.name}</Text>}
      <Button title="Upload" onPress={handleUpload} disabled={!file || loading} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  fileName: {
    marginVertical: 10,
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

export default Uploader;
