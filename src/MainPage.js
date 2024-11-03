import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import pine from './pine.png';

const AppBar = styled.header`
  background-color: #005f00;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  font-family: 'Lexend Deca';
`;

const Text = styled.p`
  font-family: 'Lexend Deca';
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
  padding: 0 1rem;
  background-color: #e6f7e6;
  min-height: 100vh;
  padding: 2rem;
  width: 100%;

`;

const Container2 = styled.div`
display: flex;
align-items: center;
justify-content: center;

`;


const ImageUploadArea = styled.div`

max-width: 800px;
min-width: 800px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  margin-bottom: 2rem;
  background-color: white;
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


const ProbabilityBar = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  height: 20px;
  border-radius: 10px;
  margin-top: 10px;
`;

const ProbabilityFill = styled.div`
  width: ${props => props.probability}%;
  background-color: ${props => {
    if (props.probability < 30) return '#4CAF50';
    if (props.probability < 70) return '#FFC107';
    return '#F44336';
  }};
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
`;

const ProbabilityText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
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

        const response = await axios.post('http://www.xn--910b5a253doufp5ag7ou9bwxc.site/api/data', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log("Response: ",response);
        console.log("data: ",response.data)
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
          <NavButton as="a"><Text>
          사이트 소개
            </Text></NavButton>
        </Link>
      </AppBar>

      <Container>
      <Container2>
        <ImageUploadArea onClick={() => document.getElementById('imageInput').click()}>
          {selectedImage ? (
            <UploadedImage src={selectedImage} alt="Uploaded" />
          ) : (
            <>
            
            <img src={pine}/>
              <Text>클릭하여 이미지 업로드</Text>
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
          <ProbabilityText>
            재선충 확률: {analysisResult.probability.toFixed(2)}%
          </ProbabilityText>
          <ProbabilityBar>
            <ProbabilityFill probability={analysisResult.probability} />
          </ProbabilityBar>
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        </AnalysisResult>
      )}
      </Container2>
      </Container>
    </>
  );
};

export default MainPage;