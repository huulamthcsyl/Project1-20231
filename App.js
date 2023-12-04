import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './pages/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './pages/SignUpScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import { ToastProvider } from 'react-native-toast-notifications';
import ParentClassScreen from './pages/ParentClassScreen';
import TutorClassScreen from './pages/TutorClassScreen';
import CreateClassScreen from './pages/CreateClassScreen';
import ParentProfileScreen from './pages/ParentProfileScreen';
import ParentScreen from './pages/ParentScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Sign up' component={SignUpScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Forgot password' component={ForgotPasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Parent screen' component={ParentScreen} options={{ headerShown: false }} />
          {/* <Stack.Screen name='Tutor class' component={TutorClassPage} options={{ headerShown: false }}/> */}
          <Stack.Screen name='Create class' component={CreateClassScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
