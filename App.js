import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './pages/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './pages/SignUpScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import { ToastProvider } from 'react-native-toast-notifications';
import CreateClassScreen from './pages/parent/CreateClassScreen';
import ParentScreen from './pages/parent/ParentScreen';
import ClassDetailParentScreen from './pages/parent/ClassDetailParentScreen';
import TutorScreen from './pages/tutor/TutorScreen';
import ClassDetailTutorScreen from './pages/tutor/ClassDetailTutorScreen';
import TutorInfoScreen from './pages/tutor/TutorInfoScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Sign up' component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Forgot password' component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Parent screen' component={ParentScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Tutor screen' component={TutorScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Create class' component={CreateClassScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Class detail parent' component={ClassDetailParentScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Class detail tutor' component={ClassDetailTutorScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Tutor info' component={TutorInfoScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
