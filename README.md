# Getting Started with Create React App

### [ directory ]
```sh
│  README.md
├─public
├─src
│  ├─assets         // cdn 전 or 개발 이미지
│  ├─components     // 공용 component
│  ├─pages          // 페이지 단위 component
│  ├─service        // axios wrap
│  ├─store          // redux store
│  ├─style          // 공용 css
│  ├─translations   // 번역관련
│  └─
└─
```
### [ 사용 미들웨어 ]
``` typescript
    1. typescript
      - hooks
    2. redux
      - "react-redux": "^7.2.6"
      - "redux-persist": "^6.0.0"
    3. axios
      - "axios": "^0.24.0"
    4. mui 5 (material ui 5)
      - "@emotion/react": "^11.7.0"
      - "@emotion/styled": "^11.6.0"
      - "@mui/material": "^5.2.2"
      - "@mui/styles": "^5.2.2"
      - "@types/styled-components": "^5.1.16"
    5. 번역
      - "react-intl": "^5.23.0"
    6. 기타
      - "eslint": "^7.11.0" (설정파일 참고)
```

### [ Redux 사용법 ]
step 1 : action 정의
파일 src/store/modules/{이름}/actions.ts
``` typescript
    export const CHANGE_TEST_MODE = 'test/CHANGE_TEST_MODE'; 
    export interface ChangeTestModeAction { type: string; payload: string; }
    export const changeTestmode = (payload: string): ChangeTestModeAction => ({
        type: CHANGE_TEST_MODE,
        payload,
    });
```

step 2: reducer 만들기 - action에 따른 동작 구현
파일 src/store/modules/{이름}/reducer.ts
``` typescript
    export interface TestState {
        mode: string | 'light' | 'dark';
    }

    const currentMode: string = localStorage.getItem('test-mode') || 'light';

    export const initialTestState: TestState = {
        mode: currentMode
    };

    export const changeTestModeReducer = (state = initialTesttate, action: ChangeTestModeAction) => {
        switch (action.type) {
            case CHANGE_TEST_MODE:
                localStorage.setItem('test-mode', action.payload);
                return {
                    ...state,
                    mode: action.payload,
                };
            default:
                return state;
        }
    };
``` 

step 3: reducer combine
파일 src/store/rootReducer.tsx
``` typescript
    export const rootReducer = combineReducers({
        test: changeTestModeReducer,
    });
``` 

step 4: store 생성 시 rootReducer 및 persistor 등록
- persistor는 새로고침 시 state들을 cashing 해주는 미들웨어다.
파일 src/store/configureStore.ts
``` typescript
    const history = createBrowserHistory();
    const composeEnhancer: typeof compose = (window as any)
        .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    export const configureStore = () => {
        const store = createStore(
            persistReducer,
            composeEnhancer(
                applyMiddleware(
                    routerMiddleware(history),
                ),
            ),
        );
        const persistor = persistStore(store);

        return { store, persistor };
    };
``` 

step 5: store 적용
파일 src/component/StoreWrapper.tsx
``` typescript
    const { store, persistor } = configureStore();
    const StoreWrapper: React.FunctionComponent = (props) => {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    {props.children}
                </PersistGate>
            </Provider>
        );
    };
``` 


### [ axios intercept ]
step 1: axios 생성 및 기본 설정
파일 src/servcie/restApi.ts
``` typescript
    export const restApi = axios.create({
        baseURL: '',
        headers: { 'Content-Type': 'application/json' },
    });
```

step 2: request interceptor 설정
jwt header 설정
파일 src/servcie/restApi.ts
``` typescript
    restApi.interceptors.request.use(
        makeAuthHeader, // <-- header 설정
        error => { return Promise.reject(error); }
    );
```

step 3: response interceptor 설정
jwt 토큰 만료 시 처리를 위해
파일 src/servcie/restApi.ts
``` typescript
    restApi.interceptors.response.use(
        onRefreshToken,  // <-- 원하는 설정
        error => { return Promise.reject(error); }
    );
```

### [ mui 5 사용법 ]
step 1 : theme 설정
파일 src/styles/configTheme.ts
``` typescript
export function themeCreator(theme: string): Theme {
    return themeMap[theme];
}
const themeMap: { [key: string]: Theme } = {
    'light': createTheme({
        palette: { }
    }),
    'dark': createTheme({
        palette: { }
    })
};
```

step 2 : theme 적용
파일 src/components/ProviderWrapper.tsx
``` typescript
    const ProviderWrapper: React.FunctionComponent = (props) => {
        const { theme } = useSelector((state: RootState) => state.public);
        const selected = themeCreator(theme.mode);
        return (
            <ThemeProvider theme={selected}> // 테마 적용
                <StyledEngineProvider injectFirst>
                    <CssBaseline />
                    {props.children}
                </StyledEngineProvider>
            </ThemeProvider>
        );
    };
```

step 3 : makeStyle 설정
파일 src/pages/Sample.tsx
``` typescript
    const useStyles = makeStyles((theme: Theme) => ({
        headerLeftContainer: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: '#ffffff',
        },
        headerRightContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center',
        }
    }));
```

step 4 : makeStyle css override 설정
파일 src/components/ProviderWrapper.tsx
``` typescript
    const ProviderWrapper: React.FunctionComponent = (props) => {
        const { theme } = useSelector((state: RootState) => state.public);
        const selected = themeCreator(theme.mode);
        return (
            <ThemeProvider theme={selected}>
                <StyledEngineProvider injectFirst> // makeStyle css override 설정
                    <CssBaseline />
                    {props.children}
                </StyledEngineProvider>
            </ThemeProvider>
        );
    };
```

### [ samplepage ]
step 1 : sample
파일 src/pages/Sample.tsx
``` typescript
    export const SamplePage: React.FunctionComponent = () => {
        return (
            // mui를 사용하며 layout을 잡으면 된다.
            <Box sx={{ display: 'flex', minHeight: '100vh', width: '100wh', backgroundColor: 'blue', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
                    <Header />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', backgroundColor: 'yellow' }}>
                    <Box sx={{ display: 'flex', width: 250, backgroundColor: 'green' }}>tab</Box>
                    <Box>contents</Box>
                </Box>
            </Box>
        );
    };
```