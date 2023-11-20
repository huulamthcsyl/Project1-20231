import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './pages/LoginPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name='Sign up' component={SignUpPage} options={{ headerShown: false }}/>
        <Stack.Screen name='Forgot password' component={ForgotPasswordPage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
