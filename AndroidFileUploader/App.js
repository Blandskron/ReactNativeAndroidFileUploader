// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { fetchPdfs } from './utils/api';
import PdfTable from './components/PdfTable';
import Uploader from './components/Uploader';

const App = () => {
  const [pdfUrls, setPdfUrls] = useState([]);
  const [openUploader, setOpenUploader] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetchPdfs();
      setPdfUrls(data || []);
    })();
  }, []);

  const fetchPdfList = async () => {
    try {
      const data = await fetchPdfs();
      setPdfUrls(data || []);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PDF Management</Text>
      <Button title="Upload PDF" onPress={() => setOpenUploader(true)} />
      <Uploader open={openUploader} onClose={() => setOpenUploader(false)} fetchPdfList={fetchPdfList} />
      <PdfTable pdfUrls={pdfUrls} fetchPdfList={fetchPdfList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;