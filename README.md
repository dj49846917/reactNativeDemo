# typescript + react-native开发仿喜马拉雅app

# 环境搭建
## 下载jdk
  * 下载地址: https://www.oracle.com/java/technologies/javase-downloads.html
  * ![jdk的安装与配置](/images/reactNative/images/jdk安装及配置.jpg)    
  {% note primary %}   
    注意：推荐下载jdk1.8及以上的版本，下载之后配置环境变量   
  {% endnote %}

## 下载android studo
  * 下载地址: https://developer.android.google.cn/studio/    
  {% note primary %}   
    android studo推荐使用3.5以上的版本，然后下载android sdk，选择8.1以上的版本    
  {% endnote %}    
  * ![android studio和android sdk下载安装](/images/reactNative/images/androidstudio环境搭建.jpg)
  * ![安卓环境变量](/images/reactNative/images/android环境变量.jpg)
  
## 创建react-native项目(typescript)
  * 输入命令：npx react-native init MyApp --template react-native-template-typescript

***

# 项目开发经验
## 多环境配置
  * 详细文档请看: https://github.com/luggit/react-native-config

  * 下载安装包:   当前版本("react-native-config": "^1.3.1")
    ```
      yarn add react-native-config
    ```
  
  * 连接库: (react-native 0.60版本后可以不执行这个命令)
    ```
      npx react-native link react-native-config
    ```

  * ios端需要连接库:
    ```
      在当前项目下进入ios目录, 执行:
      pod install
    ```

  * android端链接库:
    1. 在当前项目下的android/settings.gradle添加：
    ```
      include ':react-native-config'

      project(':react-native-config').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-config/android') 
    ```

    2. 将插件添加到android/app/build.gradle中：
      ```
        apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
      ```

  * 基本使用
    1. 在项目根路径下新建.env.development和.env.production文件,写点内容(文件名一定要.env开头，否则没有效果)
      ```
        API_URL=https://myapi.com
        GOOGLE_MAPS_API_KEY=abcdefgh
      ```
    
    2. 在package.json中，添加命令:
      ```
        "dev": "SET ENVFILE=.env.development && react-native run-android",
        "prod": "SET ENVFILE=.env.production && react-native run-android"
      ```

    3. 在js项目中使用该配置：
      ```
        import Config from "react-native-config";

        console.log(Config.API_URL); // 'https://myapi.com'
      ```

    4. 在android工程中使用多环境:
      ```
        # 进入到andorid目录，执行: 
        ENVFILE=.env.development ./gradlew assembleRelease
      ```

    5. 在ios工程中使用多环境: 
      ```
        The basic idea in iOS is to have one scheme per environment file, so you can easily alternate between them.

        Start by creating a new scheme:

        In the Xcode menu, go to Product > Scheme > Edit Scheme
        Click Duplicate Scheme on the bottom
        Give it a proper name on the top left. For instance: "Myapp (staging)"
        Then edit the newly created scheme to make it use a different env file. From the same "manage scheme" window:

        Expand the "Build" settings on left
        Click "Pre-actions", and under the plus sign select "New Run Script Action"
        Where it says "Type a script or drag a script file", type:

        cp ${PROJECT_DIR}/../.env.staging .env  # replace .env.staging for your file
      ```

## 配置绝对路径
  * 为了防止引入时不断的../，使用babel-plugin-module-resolver

  * 下载安装包: 
    ```
      yarn add babel-plugin-module-resolver
    ```

  * 在babel.config.js中改造并添加: 
    ```
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src'],
            alias: {
              '@/utils': './src/utils',
              '@/pages': './src/pages',
              '@/components': './src/components',
              '@/models': './src/models',
              '@/assets': './src/assets'
            }
          }
        ]
      ]
    ```

  * 在tsconfig.json中修改配置：
    ```
      "baseUrl": "./src",                         
      "paths": {
        "@/assets/*": ["assets/*"],
        "@/components/*": ["components/*"],
        "@/models/*": ["models/*"],
        "@/pages/*": ["pages/*"],
        "@/utils/*": ["utils/*"],
      },
    ```
    
  * 使用方式和vue完全一样，以根路径为@
    ```
      import App from '@/src/pages/Home/Main'
    ```

## 导航器react-navigation（5.x）
  1. 安装核心包：
    ```
      yarn add @react-navigation/native
    ```

  2. 安装相应的依赖包：
    ```
      yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
    ```

  3. 在根路径的index.js中引入react-native-gesture-handler，否则生产环境会报错

  4. 在你应用的根路径Home/index.tsx中，使用NavigationContainer进行包裹：
    ```
      import 'react-native-gesture-handler';
      import {AppRegistry} from 'react-native';
      import App from '@/src/pages/Home';
      import {name as appName} from './app.json';
      import { NavigationContainer } from '@react-navigation/native';

      AppRegistry.registerComponent(appName, () => <NavigationContainer><App /></NavigationContainer>);
    ```

### 堆栈式导航器
  1. 安装核心包：
    ```
      yarn add @react-navigation/stack
    ```

  2. 创建堆栈式导航器   
      * createStackNavigator标签包含两个子组件Screen和Navigator
      ```
        import React, { Component } from 'react'
        import { NavigationContainer } from '@react-navigation/native'
        import { createStackNavigator } from '@react-navigation/stack'
        import Home from '@/pages/Home'
        import Detail from '@/pages/Home/Detail'

        type RootStackList = { // 定义类型别名
          Home: undefined,
          Detail: undefined
        }

        let Stack = createStackNavigator<RootStackList>()

        export default class Navigator extends Component {
          render() {
            return (
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    options={{
                      headerTitleAlign: 'center',
                      headerTitle: '首页'
                    }}
                    name="Home"
                    component={Home}
                  />
                  <Stack.Screen 
                    name="Detail" 
                    component={Detail}
                    options={{
                      headerTitleAlign: 'center',
                      headerTitle: '详情页首页'
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            )
          }
        }

        # 最后在根路径引入即可
      ```

      * Stack.Navigator可以接收screenOptions属性，用于配置所有的导航器的样式

  3. 页面传参：
       * home页面跳转到detail页面
         ```
           # home页面传递：
             this.props.navigation.navigate('Detail', {id: '123'})

           # detail页面接收
             <Text> {this.props.route.params.id} </Text>
         ``` 

       * 详细代码请看
           * router/index.tsx里： 
              ```
                import React, { Component } from 'react'
                import { NavigationContainer } from '@react-navigation/native'
                import { createStackNavigator, StackNavigationProp, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack'
                import Home from '@/pages/Home'
                import Detail from '@/pages/Home/Detail'

                export type RootStackList = { // 定义类型别名，用于约束navigator组件，在添加组件时，这里必须声明类型
                  Home: undefined,
                  Detail: {
                    id: string
                  }
                }

                // 该类型申明约束每一个页面组件的props
                export type RootStackNavigation = StackNavigationProp<RootStackList>

                let Stack = createStackNavigator<RootStackList>()

                export default class Navigator extends Component {
                  render() {
                    return (
                      <NavigationContainer>
                        <Stack.Navigator
                          headerMode='screen'
                          screenOptions={{
                            headerTitleAlign: 'center', // 标题内容居中
                            // 下面两句是统一ios和安卓的页面切换效果
                            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                            // 开启安卓的切换手势
                            gestureEnabled: true,
                            gestureDirection: 'horizontal'
                          }}
                        >
                          <Stack.Screen
                            options={{
                              headerTitle: '首页'
                            }}
                            name="Home"
                            component={Home}
                          />
                          <Stack.Screen 
                            name="Detail" 
                            component={Detail}
                            options={{
                              headerTitle: '详情页'
                            }}
                          />
                        </Stack.Navigator>
                      </NavigationContainer>
                    )
                  }
                }
              ```

            * Home.tsx里：
              ```
                import React, { Component } from 'react'
                import { Text, View, Button } from 'react-native'
                import { RootStackNavigation } from '@/router/index'

                interface homeProps {
                  navigation: RootStackNavigation
                }

                export default class Home extends Component<homeProps> {
                  render() {
                    return (
                      <View>
                        <Text> textInComponent </Text>
                        <Button title='跳转到详情页面' onPress={()=>{
                          this.props.navigation.navigate('Detail', {id: '123'})
                        }} />
                      </View>
                    )
                  }
                }
              ```

            * Detail.tsx里：
              ```
                import React, { Component } from 'react'
                import { Text, View } from 'react-native'
                import { RootStackList } from '@/router/index'
                import { RouteProp } from '@react-navigation/native'

                interface Iprops{
                  route: RouteProp<RootStackList, 'Detail'>
                }

                export default class Detail extends Component<Iprops> {
                  render() {
                    console.log(this.props)
                    return (
                      <View>
                        <Text> {this.props.route.params.id} </Text>
                      </View>
                    )
                  }
                }

              ```

  4. 注意：   
       * 设置标题位置为居中还是居左：Stack.Navigator组件的screenOptions属性
         ```
           <Stack.Navigator
             screenOptions={{
               headerTitleAlign: 'center', // 标题内容居中
             }}
           ></Stack.Navigator>
         ```

       * 设置页面切换的动画效果（统一ios）：Stack.Navigator组件的headerStyleInterpolator和cardStyleInterpolator属性
         ```
           <Stack.Navigator
             screenOptions={{
               // 设置页面切换的风格
               headerStyleInterpolator: HeaderStyleInterpolators.forUIKit, // 头部统一
               cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS // 页面主体内容统一
             }}
           >
         ```

       * 隐藏导航栏：Stack.Navigator组件的headerMode属性
         ```
           <Stack.Navigator
             headerMode='node'
           >
         ```

       * 开启安卓的切换手势(默认是关闭的)：Stack.Navigator组件的screenOptions属性
          ```
            <Stack.Navigator
              screenOptions={{
                // 开启安卓的切换手势
                gestureEnabled: true,
                gestureDirection: 'horizontal'
              }}
            >
          ```

  5. 详细文档请看: https://reactnavigation.org/docs/stack-navigator

### 标签导航器
  1. 安装核心包：
    ```
      yarn add @react-navigation/bottom-tabs
    ```

  2. 创建底部导航器
    * createBottomTabNavigator标签包含两个子组件Screen和Navigator
      ```
        import React, { Component } from 'react'
        import { NavigationContainer } from '@react-navigation/native'
        import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
        import Home from '@/pages/Home'
        import Account from '@/pages/Account'
        import Found from '@/pages/Found'
        import Listen from '@/pages/Listen'

        export type BottomTabParamList = {
          Home: undefined,
          Found: undefined,
          Listen: undefined,
          Account: undefined
        }

        const Tab = createBottomTabNavigator<BottomTabParamList>()


        export default class BottomTabs extends Component {
          render() {
            return (
              <NavigationContainer>
                <Tab.Navigator tabBarOptions={{
                  activeTintColor: '#c71622'
                }}>
                  <Tab.Screen name='Home' component={Home} options={{ tabBarLabel: '首页' }}></Tab.Screen>
                  <Tab.Screen name='Listen' component={Listen} options={{ tabBarLabel: '我听' }}></Tab.Screen>
                  <Tab.Screen name='Found' component={Found} options={{ tabBarLabel: '发现' }}></Tab.Screen>
                  <Tab.Screen name='Account' component={Account} options={{ tabBarLabel: '用户' }}></Tab.Screen>
                </Tab.Navigator>
              </NavigationContainer>
            )
          }
        }

        # 最后在根路径引入即可
      ```

  3. 堆栈导航器嵌套底部导航栏
    * 在router/index.tsx里：
      ```
        import React, { Component } from 'react'
        import { NavigationContainer } from '@react-navigation/native'
        import { createStackNavigator, StackNavigationProp, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack'
        import Detail from '@/pages/Home/Detail'
        import BottomTabs from '@/router/BottomTabs'

        export type RootStackList = { // 定义类型别名，用于约束navigator组件，在添加组件时，这里必须声明类型
          Tab: {
            screen?: string
          },
          Detail: {
            id: string
          }
        }

        // 该类型申明约束每一个页面组件的props
        export type RootStackNavigation = StackNavigationProp<RootStackList>

        let Stack = createStackNavigator<RootStackList>()

        export default class Navigator extends Component {
          render() {
            return (
              <NavigationContainer>
                <Stack.Navigator
                  headerMode='screen'
                  screenOptions={{
                    headerTitleAlign: 'center', // 标题内容居中
                    // 下面两句是统一ios和安卓的页面切换效果
                    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    // 开启安卓的切换手势
                    gestureEnabled: true,
                    gestureDirection: 'horizontal'
                  }}
                >
                  <Stack.Screen
                    name="Tab"
                    component={BottomTabs}
                  />
                  <Stack.Screen 
                    name="Detail" 
                    component={Detail}
                    options={{
                      headerTitle: '详情'
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            )
          }
        }
      ```

    * 在router/BottomTabs.tsx里：
      ```
        import React, { Component } from 'react'
        import { NavigationContainer } from '@react-navigation/native'
        import { createStackNavigator, StackNavigationProp, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack'
        import Detail from '@/pages/Home/Detail'
        import BottomTabs from '@/router/BottomTabs'

        export type RootStackList = { // 定义类型别名，用于约束navigator组件，在添加组件时，这里必须声明类型
          Tab: {
            screen?: string
          },
          Detail: {
            id: string
          }
        }

        // 该类型申明约束每一个页面组件的props
        export type RootStackNavigation = StackNavigationProp<RootStackList>

        let Stack = createStackNavigator<RootStackList>()

        export default class Navigator extends Component {
          render() {
            return (
              <NavigationContainer>
                <Stack.Navigator
                  headerMode='screen'
                  screenOptions={{
                    headerTitleAlign: 'center', // 标题内容居中
                    // 下面两句是统一ios和安卓的页面切换效果
                    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    // 开启安卓的切换手势
                    gestureEnabled: true,
                    gestureDirection: 'horizontal'
                  }}
                >
                  <Stack.Screen
                    name="Tab"
                    component={BottomTabs}
                  />
                  <Stack.Screen 
                    name="Detail" 
                    component={Detail}
                    options={{
                      headerTitle: '详情'
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            )
          }
        }
      ```

    * 在根路径的index.js中，引入Navigator即可

## 状态管理dva
  * 核心包安装：
    ```
      yarn add dva-core-ts react-redux @types/react-redux dva-loading-ts

    ```

  * 使用步骤
    1. 创建实例
    2. 加载model对象
    3. 启动dva
    4. 导出dva对象 
    5. 在src/index.tsx中用provider包裹所有的组件
    6. 详细代码请看：
      * 在config/dva.ts中：
        ```
          import { create } from 'dva-core-ts'
          import models from '@/models/index'
          // 1. 创建实例
          const app = create()
          // 2. 加载model对象
          models.forEach(model => {
              app.model(model)
          })
          // 3. 启动dva
          app.start()
          // 4. 导出dva的数据
          export default app._store
        ```

      * 在models/index.ts中： 
        ```
          import home, { HomeState } from '@/models/home'
          import { DvaLoadingState } from 'dva-loading-ts'

          const models = [home];
          export type RootState = {
            home: HomeState,
            loading: DvaLoadingState
          }
          export default models;
        ```

      * 在models/home.ts中：
        ```
          import { Model, Effect } from 'dva-core-ts'
          import { Reducer } from 'react'

          export interface HomeState {
            num: number
          }

          interface HomeModel extends Model {
            namespace: 'home';
            state: HomeState;
            reducers: {
              add: Reducer<HomeState, any>;
              asyncAddResult: Reducer<HomeState, any>;
            }
            effects: {
              asyncAdd: Effect
            }
          }

          const initialState = {
            num: 0
          }

          type codeType = { // 定义页面传过来的对象类型
            num: number,
            initNumber: number
          }

          function delay(code: codeType) {
            return code.num + code.initNumber
          }

          const homeHodel: HomeModel = {
            namespace: 'home',
            state: initialState,
            effects: { // 异步操作
              *asyncAdd({ payload }, { call, put }) {
                const res = yield call(delay, payload)
                yield put({
                  type: 'asyncAddResult',
                  payload: res,
                })
              }
            },
            reducers: { // 同步操作
              add(state = initialState, { payload }) {
                console.log('payload', payload)
                return {
                  ...state,
                  num: state.num + payload.num
                }
              },
              asyncAddResult(state = initialState, { payload }) {
                console.log('payload', payload)
                return {
                  ...state,
                  num: payload
                }
              }
            }
          }

          export default homeHodel
        ```

      * 在src/pages/Home/index.tsx里，使用
        ```
          import React, { Component } from 'react'
          import { Text, View, Button } from 'react-native'
          import { RootStackNavigation } from '@/router/index'
          import { connect, ConnectedProps } from 'react-redux'
          import { RootState } from '@/models/index'

          function mapStateToProps(state: RootState) {
            return {
              num: state.home.num
            }
          }

          const connector = connect(mapStateToProps)

          type ModelState = ConnectedProps<typeof connector> // 定义connect的类型

          // 去继承ModalState否则在render里取store里的this.props.num会报错
          interface homeProps extends ModelState {
            navigation: RootStackNavigation
          }

          class Home extends Component<homeProps> {
            handleAdd = () => {
              const { dispatch } = this.props
              dispatch({
                type: 'home/add',
                payload: {
                  num: 1
                }
              })
            }

            handleAsyncAdd = () => {
              const { dispatch, num } = this.props
              dispatch({
                type: 'home/asyncAdd',
                payload: {
                  num: 2,
                  initNumber: num
                }
              })
            }

            render() {
              return (
                <View>
                  <Text> {this.props.num} </Text>
                  <Button title='加' onPress={() => this.handleAdd()} />
                  <Button title='异步加' onPress={() => this.handleAsyncAdd()} />
                  <Button title='跳转到详情页面' onPress={() => {
                    this.props.navigation.navigate('Detail', { id: '123' })
                  }} />
                </View>
              )
            }
          }

          export default connector(Home)
        ```

  * 在dva中使用自带的loading
    * 使用步骤：
      1. 安装依赖包：yarn add dva-loading-ts

      2. 在config/dva.ts中，引入createLoading
        ```
          import { create } from 'dva-core-ts'
          import createLoading from 'dva-loading-ts'
          import models from '@/models/index'
          // 1. 创建实例
          const app = create()
          // 2. 加载model对象
          models.forEach(model => {
              app.model(model)
          })
          app.use(createLoading())
          // 3. 启动dva
          app.start()
          // 4. 导出dva的数据
          export default app._store
        ```

      3. 在Home/index.tsx中的mapStateToProps函数中使用（effects里面要选择loading的函数）
        ```
          function mapStateToProps(state: RootState) {
            return {
              num: state.home.num,
              loading: state.loading.effects['home/asyncAdd']
            }
          }
        ```
    
## 提示框react-native-root-toast
使用步骤：    
  1. 下载核心包:
    ```
      yarn add react-native-root-toast 或者 npm install --save react-native-root-toast
    ```

  2. 当react-native的版本>0.62时，需要在根路径src/index.tsx或者App.tsx中，加入以下代码：
    ```
      import { RootSiblingParent } from 'react-native-root-siblings';

      return (
        <RootSiblingParent>  // <- use RootSiblingParent to wrap your root component
          <App />
        </RootSiblingParent>
      );
    ```

  3. 使用:
    ```
      import Toast from 'react-native-root-toast';

      Toast.show('This is a message', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    ```

  4. 详细说明文档请看：https://github.com/magicismight/react-native-root-toast
    

# 项目实战开发
## 底部导航栏添加图标
  * 将项目中用到的图片放到assets/images文件夹下

  * 新建constant/image/icon.js,将图片引入
    ``` 
      export const ENV_ICON = {
        icon_footer_home: require('@/assets/images/icon/icon_footer_home.png'),
        icon_footer_home_red: require('@/assets/images/icon/icon_footer_home_red.png'),
        icon_footer_recommend: require('@/assets/images/icon/icon_footer_recommend.png'),
        icon_footer_recommend_red: require('@/assets/images/icon/icon_footer_recommend_red.png'),
        icon_footer_collect: require('@/assets/images/icon/icon_footer_collect.png'),
        icon_footer_collect_red: require('@/assets/images/icon/icon_footer_collect_red.png'),
        icon_footer_user: require('@/assets/images/icon/icon_footer_user.png'),
        icon_footer_user_red: require('@/assets/images/icon/icon_footer_user_red.png'),
      }
    ```

  * 在router/BottomTabs.tsx中,设置图片
    ```
      import React, { Component } from 'react'
      import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
      import { Image } from 'react-native'
      import { RootStackNavigation, RootStackList } from '@/router/index'
      import { RouteProp, TabNavigationState } from '@react-navigation/native'
      import Home from '@/pages/Home'
      import Account from '@/pages/Account'
      import Collection from '@/pages/Collection'
      import Recommend from '@/pages/Recommend'
      import { ENV_ICON } from '@/constant/image/icon'

      export type BottomTabParamList = {
        Home: undefined,
        Collection: undefined,
        Recommend: undefined,
        Account: undefined
      }

      const Tab = createBottomTabNavigator<BottomTabParamList>()

      type Route = RouteProp<RootStackList, 'Tab'> & {
        state?: TabNavigationState
      }

      interface IProps {
        navigation: RootStackNavigation,
        route: Route
      }

      // 动态获取底部导航栏的标题
      function getHeaderTitle(route: Route) {
        const routeName = route.state ? route.state.routes[route.state.index].name : route.params?.screen || 'Home';
        switch (routeName) {
          case 'Home':
            return '首页';
          case 'Recommend':
            return '推荐';
          case 'Collection':
            return '收藏';
          default:
            return '我的';
        }
      }


      export default class BottomTabs extends Component<IProps> {
        componentDidMount() {
          const { navigation, route } = this.props;
          console.log('route', route)
          navigation.setOptions({
            headerTitle: getHeaderTitle(route)
          })
        }

        componentDidUpdate() {
          const { navigation, route } = this.props;
          navigation.setOptions({
            headerTitle: getHeaderTitle(route)
          })
        }

        render() {
          return (
            <Tab.Navigator
              lazy
              tabBarOptions={{
                activeTintColor: '#c71622',
                inactiveTintColor: '#979797',
                labelStyle: { fontSize: 14, position: 'relative', top: -4 }
              }}
            >
              <Tab.Screen
                name='Home'
                component={Home}
                options={{
                  tabBarLabel: '首页',
                  tabBarIcon: ({ focused, color, size }) => (
                    <Image source={focused ? ENV_ICON.icon_footer_home_red : ENV_ICON.icon_footer_home} />
                  )
                }}
              />
              <Tab.Screen
                name='Recommend'
                component={Recommend}
                options={{
                  tabBarLabel: '推荐',
                  tabBarIcon: ({ focused, color, size }) => (
                    <Image source={focused ? ENV_ICON.icon_footer_recommend_red : ENV_ICON.icon_footer_recommend} />
                  )
                }}
              />
              <Tab.Screen
                name='Collection'
                component={Collection}
                options={{
                  tabBarLabel: '收藏',
                  tabBarIcon: ({ focused, color, size }) => (
                    <Image source={focused ? ENV_ICON.icon_footer_collect_red : ENV_ICON.icon_footer_collect} />
                  )
                }}
              />
              <Tab.Screen
                name='Account'
                component={Account}
                options={{
                  tabBarLabel: '我的',
                  tabBarIcon: ({ focused, color, size }) => (
                    <Image source={focused ? ENV_ICON.icon_footer_user_red : ENV_ICON.icon_footer_user} />
                  )
                }}
              />
            </Tab.Navigator>
          )
        }
      }
    ```

## react-native适配
  * 使用Dimensions类获取宽高
  * 用实际宽度 / 设计稿的宽度 * 屏幕宽度就行适配
  * 详细代码：
    ```
      'use strict';
      import {
        Dimensions,
        PixelRatio,
        Platform,
        StatusBar,
        NativeModules
      } from 'react-native';
      import { getStatusBarHeight } from '@/utils/utils'

      // 手机屏幕的宽高
      const { height, width } = Dimensions.get('window');

      //UI设计图的宽度
      const designWidth = 750
      //UI设计图的高度
      const designHeight = 1334

      // 定义UnitConvert的类型
      type UnitConvertType = { 
        px1: number,
        dpi: Function,
        w: number,
        h: number,
        ToDeviceWidth: Function,
        ToDeviceHeight: Function,
        statusBarHeight: number | undefined
      }

      //屏幕单位转换
      export const UnitConvert:UnitConvertType = {
        px1: 1 / PixelRatio.get(),
        dpi: (w: number) => {
          return w / designWidth * width;
        },
        w: width,
        h: height,
        ToDeviceWidth: (w: number) => { return w * designWidth / width; },
        ToDeviceHeight: (h: number) => { return h * designHeight / height; },
        statusBarHeight: getStatusBarHeight(),
      }
    ```

# 使用ts开发react-native的一些总结
## 子组件要使用state，则必须定义interface或者type
  ```
    interface Props { }
    interface State { }

    class Index extends React.PureComponent<Props, State> {
      constructor(props: Props) {
        super(props);
        this.state = {
        }
      }

      render() {
        return (
          <div className="container">
              
          </div>
        )
      }
    }
  ```

## react-native中父组件获取子组件的ref，并调用方法
  * 需求：父组件点击任意空白处，清除掉子组件textInput里的值
    1. 父组件test.tsx里，使用ref函数
      ```
        export default class Test extends Component {
          child: any = {} // 获取dom

          render() {
            return (
              <TouchableOpacity style={styles.box} onPress={()=>{
                console.log(this.child.refs.input, 'this.child')
                this.child.refs.input.clear() // 调用
              }}>
                <View style={styles.item}>
                  <MyTextInput 
                    ref={(ref)=>{ // 获取dom
                      this.child = ref
                    }}
                    width={UnitConvert.w - UnitConvert.dpi(60)}
                    placeholder='请输入XXX'
                    flelds='姓名'
                  />
                </View>
              </TouchableOpacity>
            )
          }
        }
      ```

    2. 子组件MyTextInput.tsx中正常使用ref