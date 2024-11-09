import React, { useState, useEffect } from 'react';
import styled, {keyframes} from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import pine from './pine.png';
import pineIcon from './pine_icon.png';


// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   body, html {
//     margin: 0;
//     padding: 0;
//     width: 100%;
//     overflow-x: hidden;
//   }
// `;
// //  



const AppBar = styled.header`
 background-color: #005f00;
  color: white;
  padding: 1rem;  // 좌우 패딩 증가
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const liquidAnimation = keyframes`
0% {
  d: path('M 0 0 Q 25 5, 50 0 Q 75 -5, 100 0 L 100 100 L 0 100');
}
25% {
  d: path('M 0 0 Q 25 -5, 50 0 Q 75 5, 100 0 L 100 100 L 0 100');
}
50% {
  d: path('M 0 0 Q 25 5, 50 0 Q 75 -5, 100 0 L 100 100 L 0 100');
}
75% {
  d: path('M 0 0 Q 25 -5, 50 0 Q 75 5, 100 0 L 100 100 L 0 100');
}
100% {
  d: path('M 0 0 Q 25 5, 50 0 Q 75 -5, 100 0 L 100 100 L 0 100');
}
`;


const LiquidContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.animatedHeight}%;
  overflow: hidden;
`;

const SVGContainer = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  top: -2.5%
  left: 0;
`;

const AnimatedPath = styled.path`
  animation: ${liquidAnimation} 2s ease-in-out infinite;
  fill: ${props => {
    if (props.probability < 30) return 'rgba(76, 175, 80, 0.9)';
    if (props.probability < 70) return 'rgba(255, 193, 7, 0.9)';
    return 'rgba(244, 67, 54, 0.9)';
  }};
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

const Row = styled.div`
display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 100px;

`;


const Column = styled.div`
display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

`;

const Container = styled.main`
background-color: #e6f7e6;
  min-height: 100vh;
  padding: 5rem 2rem 2rem 2rem;  // 상단 패딩을 AppBar 높이보다 크게 설정
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;  // padding이 width에 포함되도록
  overflow-x: hidden;  // 가로 스크롤 방지
`;

const Container2 = styled.div`
display: flex;
align-items: center;
justify-content: center;

`;


const ImageUploadArea = styled.div`

max-width: 800px;
min-width: 400px;
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

const ProbabilityBar2 = styled.div`
  background-size: cover;
  height: 30px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #000000; /* 테두리 추가 */
`;

const ProbabilityFill2 = styled.div`
  height: 100%;
  width: ${({ probability }) => probability}%;
  background-color: ${props => {
    if (props.probability < 30) return 'rgba(76, 175, 80, 1)';  // 녹색 + 투명도
    if (props.probability < 70) return 'rgba(255, 193, 7, 1)';  // 노랑 + 투명도
    return 'rgba(244, 67, 54, 1)';  // 빨강 + 투명도
  }};
  transition: width 2s ease-in-out;
`;

// const AnalysisResult = styled.div`
//   background-color: #f0f0f0;
//   border-radius: 8px;
//   padding: 1rem;
//   margin-top: 2rem;
// `;

const LoadingMessage2 = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 1rem;
`;

const ResultText = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 1rem 0;
  color: ${props => {
    if (props.prediction === "정상") return "#2E7D32";  // 진한 초록색
    return "#D32F2F";  // 진한 빨간색
  }};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;



const ProbabilityFill = styled.div`
  position: absolute;
  bottom: 0;  // 아래에서부터 시작
  width: 100%;
  height: ${props => props.animatedHeight}%;  // width 대신 height로 변경
  background-color: ${props => {
    if (props.probability < 30) return 'rgba(76, 175, 80, 0.9)';  // 녹색 + 투명도
    if (props.probability < 70) return 'rgba(255, 193, 7, 0.9)';  // 노랑 + 투명도
    return 'rgba(244, 67, 54, 0.9)';  // 빨강 + 투명도
  }};
  border-radius: 10px;&::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(255, 255, 255, 0.5);
    filter: blur(2px);
  }
`;

const LoadingMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #333;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


// const Wave = styled.div`
//   position: absolute;
//   width: 200%;
//   height: 20px;  // 물결 높이
//   background: linear-gradient(
//     90deg,
//     transparent,
//     rgba(255, 255, 255, 0.3),
//     transparent
//   );
//   top: ${props => `calc(${100 - props.animatedHeight}% - 10px)`};  // 물결 위치
//   animation: ${waveAnimation} 2s linear infinite;
// `;



const ProbabilityBar = styled.div`
 background-image: url(${pineIcon});
  background-size: 120px;  // 배경 이미지 크기 축소
  background-position: center;
  background-repeat: repeat;
  height: 130px;
  width: 100px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin: 20px auto;
`;



const ProbabilityText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0px;
  margin-top:0px;
`;

const MainPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animatedHeight, setAnimatedHeight] = useState(0);  // width -> height로 변경애니메이션 너비 상태 추가

  const AnalysisContainer = styled.div`
  display: ${({ isLoading }) => (isLoading ? 'none' : 'block')};
  animation: fadeIn 1s ease-in-out;
`;

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

        setAnalysisResult(response.data);
        setAnimatedHeight(0);
        console.log("Response: ",response);
        console.log("data: ",response.data);
      } catch (err) {
        console.error('Error analyzing image:', err);
        setError('이미지 분석 중 오류가 발생했습니다. 다시 시도해 주세요.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    if (analysisResult) {
      const targetWidth = analysisResult.confidence;
      let current = 0;
      const step = targetWidth / 60; // 60프레임으로 나누어 애니메이션
      let animationFrameId;

      const animate = () => {
        if (current < targetWidth) {
          current= Math.min(current + step, targetWidth);
          setAnimatedHeight(current);
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animate();

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [analysisResult]);

  return (
    <>
      <AppBar>
        <Logo>소나무 진찰 AI</Logo>
        <Link to='/explain'>
          <NavButton as="a"><Text>
          사이트 소개   ㅋㅋㅋ
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
        
        
      </Container2>
      <Container2>

          {isLoading && <LoadingMessage>이미지 분석 중...</LoadingMessage>}
          {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}

          {!isLoading && analysisResult && (
            <AnalysisContainer isLoading={isLoading}>
              <Row>
<Column>
<h1>분석 결과</h1>
              <ProbabilityText>
                재선충 확률: {analysisResult.confidence.toFixed(2)}%
              </ProbabilityText>
              <ResultText prediction={analysisResult.prediction}>
      {analysisResult.prediction} 입니다.
    </ResultText>
</Column>

<ProbabilityBar>
              <LiquidContainer animatedHeight={animatedHeight}>
    <SVGContainer viewBox="0 -5 100 100" preserveAspectRatio="none">
      <AnimatedPath
        probability={analysisResult.confidence}
        d="M 0 0 Q 25 -5, 50 0 Q 75 5, 100 0 L 100 100 L 0 100"
      />
    </SVGContainer>
  </LiquidContainer>
              </ProbabilityBar>
              </Row>
              
              <ProbabilityBar2>
            <ProbabilityFill2 probability={analysisResult.confidence} />
          </ProbabilityBar2>
<p> AI 결과값</p>
              <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
            </AnalysisContainer>
          )}
        </Container2>
      </Container>
    </>
  );
};

export default MainPage;