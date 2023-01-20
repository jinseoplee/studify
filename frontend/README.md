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

