# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

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
