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
import TutorProfileViewScreen from './pages/parent/TutorProfileViewScreen';
import TutorAssignedClassScreen from './pages/tutor/TutorAssignedClassScreen';
import TutorOwnClassScreen from './pages/tutor/TutorOwnClassScreen';
import ParentInfoScreen from './pages/parent/ParentInfoScreen';
import ParentProfileViewScreen from './pages/tutor/ParentProfileViewScreen';
import AccountProfileScreen from './pages/AccountProfileScreen';
import ChangePasswordScreen from './pages/ChangePasswordScreen';

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
            <Stack.Screen name='Parent info' component={ParentInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Tutor profile view' component={TutorProfileViewScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Parent profile view' component={ParentProfileViewScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Tutor assigned class' component={TutorAssignedClassScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Tutor own class' component={TutorOwnClassScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Account profile' component={AccountProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Change password' component={ChangePasswordScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
