import axios from "axios";

const {Kakao} = window;

const loginWithKakao = () =>{
  Kakao.Auth.authorize({
    redirectUri: 'http://localhost:3000/auth/kakao/callback'
  })
}

const KakaoLogin = () => { 
  return (
    <div>
      <a id="custom-login-btn" onClick={loginWithKakao}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="222"
        />
        <div>url에 토큰 정보 있음</div>
      </a>
    </div>
  );
};

export default KakaoLogin;