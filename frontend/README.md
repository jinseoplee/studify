### 메인페이지 구현

전체 라우터를 App.js에 몰아넣어서 모든 라우터를 한곳에서 관리하려고 합니다.
useEffect를 사용하여 처음 localhost3000이 로딩 될때, 바로 /main-page로 이동시켜주기 위해서 redirect를 시켜주었습니다.
이때 react의 v5에서는 redirect가 있었지만 v6 부터는 redirect가 사라지고 Navigate가 생겼습니다.
Navigate replace to=어디로가고싶은가? 인데 여기서 replace는 redirect와 같은 역할을 해줍니다.

### useEffect에 대한 정리

- useEffect(() ⇒ { … } , [ dependencies ]);

- useEffect는 두개의 매개 변수 두개의 인수와 같이 호출이 됩니다.
  - 첫번째 인수는 함수입니다. 모든 컴포넌트 평가 후에 실행되어야 하는 함수.(지정된 의존성이 변경되는 경우)
  - 지정된 의존성이 2번째 인수로 들어가야합니다.(배열 형태)
- useEffect(() ⇒ { … }, []} 형태로 작성을 하면 의존성이 없기때문에 한번만 작동. 의존성이 변경되지 않기때문에.

(로그인 한 후 로그아웃 할때 새로고침하면 로그아웃이 안되게 할 수 있음).

모든 컴포넌트가 다시 렌더링 될 때마다 실행되지는 않고, 우리가 실행시키고 싶을 때만 실행 시켜줍니다.

만약 useEffect에 의존성이 없다면? ( [] 도 없다면?)

- 일반 state를 계속 랜더링 하기 때문에 무한 루프가 일어날수 있습니다. 추천하지 않습니다.

useEffect를 그냥 사용시 함수에 따라 다르지만 현재 강의에서는 키를 누를때마다 함수가 발동합니다. 이것이 좋게 작용하지 않을 경우가 있습니다.

사용자가 입력을 하다가 멈추고 어느정도 시간이 지나면 검사를 하는것. ⇒ 디바운싱이라는 기술

사용자의 입력을 디바운스 하는것 입니다.

useEffect() 마무리

- 모든 컴포넌트 렌더링 주기 후에 실행이 됩니다.(의존성에 빈배열도 없는경우).

### Router v6에 대한 정리

v5와 v6은 많이 다르다.

중첩된 콘텐츠가 삽입될 위치를 React Router에 알리기 위해선? → Outlet 컴포넌트를 사용.

일종의 placeholder로 중첩된 라우트 콘텐츠를 삽입할 위치를 React Router에게 알려줍니다.

특정 작업이 완료되었거나 버튼이 클릭 되었거나 HTTP요청이 전송됐을때 보통 다른페이지로 이동했습니다. v5에서는 useHistory훅으로 탐색. ⇒ v6에서는 useNavigate를 제공

```jsx
//const navigate = useNavigate();
//navigate('/welcome') //여기로 이동
//navigate('/welcome' , {replace : ture}
//이것은 리다이렉트하는 것.(현재 라우트가 새 라우트로 교체됌.)
//navigate(-1); //이것은 이전 페이지로 이동.
```

이때 navigate함수를 실행하면 다른 위치로 이동 할 수 있습니다.

### 비밀번호찾기 모달창 구현 오류해결

- 모달창이 떴을때 X버튼을 눌러도 모달창이 꺼지지 않았습니다

```jsx
//<div onClick={findPw}>
// 비밀번호 잊어버리셨나요?
// {modalOpen && <LoginModal setModalOpen={closeModal}></LoginModal>}
// </div>
```

위와 같이 구성을 해주었는데 LoginModal의 부분에서 props로 내려간 부분이
내가 원하는 closeModal이 되지않고 div태그 안에있는 findPw가 찍히는 것을 보았습니다.
따라서 modal창 띄워주는 부분이 LoginModal이 내가 원하는 함수를 props로 받기 위해 div태그 바깥으로 빼내어서 해결해 주었습니다.

### 리액트 훅의 규칙

최상위 컴포넌트가 아닌 일반 함수내에서 리액트 훅을 사용할때에는 그 함수의 시작이름이 무조건 대문자이어야 작동을합니다.
대부분 useState를 이용할때 많이 발생하는 오류입니다.

### 아이디 저장을 위한 cookie 사용

cookie란? - 웹 서버가 웹 브라우저에게 보내어 저장했다가 서버의 부가적인 요청이 있을때 다시 서버로 보내주는 문자열 정보.
쿠키는 주로 세션관리, 개인화 트래킹에 사용.
react에서 쿠키 사용
= npm install react-cookie 로 설치.
사용. const [cookies, setCookie, removeCookie] = useCookies();
setCookie('키값', '데이터값', {path, expires, maxAge...})
여기서 useCookies에 인자로 들어가는 값은 의존성을 띄며 값을 적지 않으면 모든 쿠키값이 변할때 마다 렌더링 됩니다.

### checkbox사용 막힘

체크박스안의 체크는 checked로 해야한다. value값은 현재 체크박스의 값을 나타내줄뿐.
checked를 이용하여 체크할지 말지 결정해줍니다.

### useEffect에 초기 랜더링([]) 빈괄호를 사용했는데 두번 랜더링 되는 이유.

리액트에는 Strict모드가 존재합니다. 이 옵션이 켜져있는 경우에 개발 모드일 경우 구성요소를 두 번 렌더링 시켜줍니다.
한번만 렌더링 시켜주고 싶다면 index.js에 React.StrictMode가 처음 root 컴포넌트를 감싸고 있는지 확인해주며
React.StrictMode를 삭제 시켜주면 됩니다.

### Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. 에러

위의 에러는 값이 있어야 하는데 값이 undefined로 들어가 있는 경우에 발생하는 에러입니다. 에러를 해결하기 위해선 공백이나 초기값을 지정해 주어야합니다.

### useHistory? useNavigate?란?

router v5에서는 useHistory를 사용하여 방문기록을 저장해 주는 컴포넌트를 사용했습니다. 뒤로가기, 앞으로 가기등을 할 수가 있습니다.
router v6에서는 history대신 navigate가 생기게 되었는데 useNavigate를 사용하여 첫번째 인자에 이동경로, 두번째 인자에는 state속성에 따라 파라미터를 넣어줍니다. 이때 이동한 경로에서 useLocation 을 사용하여 location을 취득하여 location.state안의 속성에 따라 값을 가져오면 파라미터의 값을 이동한 페이지에서도 작성이 가능합니다.

### portal을 사용하는 이유?

현재 모달창을 띄우기 위해 사용을 해 주었는데 모달이란 다이얼로그 실행 시 포커스와 제어권을 독점해 다이얼로그를 종려하기 전 까지 기존의 화면을 제어할 수 없게 하는 것입니다. 따라서 모달은 항상 화면의 최상위에 위치해야합니다.
일반적으로 띄울때에는 언제나 최상위에 보여지는 것을 보장할수가 없습니다. 만약 자식 컴포넌트에서 모달 컴포넌트를 랜더링 할시에는 이 모달 컴포넌트는 부모 컴포넌트의 스타일의 영향을 받을수가 있습니다.
이때 사용하는 것이 portal이며 공식 문서에는
=> Portal이란 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링 하는 최고의 방법을 제공합니다. 라고 합니다
사용법은 ReactDom.createPortal(child, container) 형식입니다. 첫번째 인자 child 는 포탈을 사용해 계층 밖으로 보낼 대상이 되는 컴포넌트, 두번째 인자 container는 포탈로 이동할 목적지, 즉 child를 랜더링 할 DOM Element를 넣어줍니다.
만들땐 우선 public 에 있는 index.html에 컴포넌트가 렌더링 될 DOM Element를 추가해주어야합니다. (대부분 root아이디 아래에 생성)
그러고서 씌워줄 파일을 하나 만들어 createPortal(<>{children}</>, document.getElementById("index.html에 써준 id요소 이름")) 작성해줍니다. 위의 코드는 포탈을 만드는데 해당하는 부분은 자식컴포넌트의 요소를 전부 들고올 {children}과 어디로 보여줄지 이동하는 id값을 찾아줍니다.
그러고서 모달창을 위의 컴포넌트로 감싸줄시에 F12를 눌러 요소를 보면 root 안에 다 있는 것이 아닌 내가 지정한 이름의 요소가 하나 더 생겨 그 아래에 생긴 것을 볼수가 있습니다.

### axios요청에서 backend부분으로는 데이터 요청이 잘가는데(데이터 추가가 됌.) 현재 우리페이지에서 CORS에러가 뜨며 net :: err_failed 200 가 뜨는 오류.

처음에는 CORS에러라 백엔드 부분이 문제인줄 알았지만 서버를 연결하고 요청을 보냈을때 데이터가 잘가며 에러가 떠서 난항을 겪었습니다.
브라우저 내의 CORS정책에 막혀 미들웨어를 통하여 우회하는 식으로 해결해주었습니다.

1. npm install http-proxy-middleware를 설치해줍니다.
2. src폴더내에 setupProxy.js파일을 생성해줍니다.
   아래의 내부 코드를 작성해줍니다.

```
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", { //내 주소를 작성.
      target: "http://192.168.31.202:8080/",
      changeOrigin: true,
    })
  );
};
```

3. 내가 axios요청 보낸 곳의 주소는 저 앞의 주소 이후를 써주면 됩니다. 그러고 실행.

### jwt 토큰을 이용한 로그인 방법.

Access Token : 실질적인 인증을 위한 JWT로 유효기간이 매우 짧은 특징을 가지고 있다.
Refresh Token : Access Token의 짧은 유효기간을 보완하기 위해 사용되며, 본 토큰을 사용해 Access Token 만료 시 재발급을 위해 사용된다.
Refresh Token 사용이유는 ?
= Access Token은 유효기간이 짧고 보안적으로 취약해서 Refresh 토큰을 사용하여 유효기간을 늘리고 보안을 상향하는 방식으로 사용합니다.

### Redux사용(useSelector(), useDispacth())

useSelector는 connect함수를 이용하지 않고 리덕스의 state를 조회할 수가 있습니다. useDispatch는 생성한 action을 useDispatch를 통해 발생시킬 수 있습니다.
