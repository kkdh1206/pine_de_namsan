import styled from 'styled-components';
import map from './korea-map.jpg';
import mountain from './mountain.jpg';
import tree from './tree.jpg';
import { Link } from 'react-router-dom';

function Explain() {
    return (
      <div>
        <AppBar>
          <Link to = '/' style = {{textDecoration : 'none'}}><Logo>남산위에저소나무.site 소개</Logo></Link>
        </AppBar>
      <Container>
        

        <Text>
          안녕하세요? 저희는 포항공과대학교에서 소나무 재선충 방재 예찰 AI를 개발하고있는 팀 남산위에 저소나무 입니다.
        </Text>
        <Text>
          저희가 이 사이트를 제작하게 된 배경은 아래와 같습니다.
          <br/><br/>
          현재 대한민국의 소나무 재선충은 점점 확산이 되어가는 중입니다.
          <br/>
          그러나 소나무 재선충의 방제 예산은 삭감되어 2023년부터 증가추세가 가파른 상황입니다.
          </Text>
          <img src={map} />;
          
          <Text>
            특히 위의 사진을 보면 알수 있듯이 경상북도에 극심한 피해를 입히고 있습니다.
            </Text>
            <ImageDiv>
            <Image src={mountain} />
            <Image src={tree} />
            </ImageDiv>
          
          
          <Text>
            위는 포항공과대학교 뒷산 노적봉과 학교내부 재선충 감염목을 촬영한 사진입니다.
            <br/>
            포항의 경우 정말 재선충을 흔하게 볼수 있습니다.

          소나무 재선충은 솔수염하늘소를 매개곤충으로 하여 퍼져나가고 있고,
          <br/>
          감염되면 치사율이 100%에 육박하는 무서운 병충해입니다.
          <br/>
          따라서, 이를 막으려면 감염된 소나무를 예찰을 통해 찾아서 제거하는 방법외에는 존재하지 않습니다.
          <br/>
          그렇기에 저희는 이 제한된 예산으로 어떻게 하면 효율적인 방제를 진행할 수 있을까를 고민하였고,
          <br/>
          결론적으로 CNN 으로 재선충이 걸린 나무의 feature를 뽑아내 transformer 로 학습된 
          <br/>
          AI를 통해서 적은비용으로 효율적이게 방제 예찰을 하는 것을 고안해냈습니다.

          <br/>

          저희가 만든 이 사이트의 목적은 다음과 같습니다.
          <br/><br/>
          1. 소나무 재선충 예찰의 효율성을 위한 AI 제작 테스트 및 데이터 수집
          <br/>
          2. 민간인도 쉽게 접근 가능한 소나무 재선충 확인 사이트 제공
          <br/>
          이를 통해서 민간인들도 재선충에 관심을 가지고 병충해에 걸린 나무를 판별해 예찰에 도움을 주고,
          <br/>
          최종적으로 수집된 데이터로 AI를 발전시켜 더욱 정밀한 재선충 탐지 모델을 만들어 재선충을 박멸하고자 합니다.
          
        </Text>

       
      </Container>
      </div>
    );
  }
  
  export default Explain;

  const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
`;
  const Container = styled.main`
  padding: 0 1rem;
  background-color: #e6f7e6;
  min-height: 100vh;
  padding: 2rem;
  width: 100%;

`;
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
  color: white;
  font-family: 'Lexend Deca';
`;

const Text = styled.p`
  color: '#030303';
    font-size: '20px';
    font-family: 'Roboto';
    font-weight: 700;
    line-height: '24px';
    text-align: 'center';
`;

const ImageDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 10px;
    padding: 30px;
    width: 500px;
`;
  