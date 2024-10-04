import React, { useState } from 'react';
import styled from 'styled-components';
import { Upload } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AppBar = styled.header`
  background-color: #1E40AF;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Container = styled.main`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const UploadedImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
`;

const AnalysisResult = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 1rem;
`;

const MainPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);

      setIsLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post('https://your-api-endpoint.com/analyze', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setAnalysisResult(response.data);
      } catch (err) {
        console.error('Error analyzing image:', err);
        setError('이미지 분석 중 오류가 발생했습니다. 다시 시도해 주세요.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <AppBar>
        <Logo>이미지 분석 AI</Logo>
        <Link to='/explain'>
          <NavButton as="a">경북 재선충 현황</NavButton>
        </Link>
      </AppBar>

      <Container>
        <ImageUploadArea onClick={() => document.getElementById('imageInput').click()}>
          {selectedImage ? (
            <UploadedImage src={selectedImage} alt="Uploaded" />
          ) : (
            <>
              <Upload size={48} />
              <p>클릭하여 이미지 업로드</p>
            </>
          )}
        </ImageUploadArea>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        
        {isLoading && <LoadingMessage>이미지 분석 중...</LoadingMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {analysisResult && (
          <AnalysisResult>
            <h2>분석 결과</h2>
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </AnalysisResult>
        )}
      </Container>
    </>
  );
};

export default MainPage;