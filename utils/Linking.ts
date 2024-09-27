import { Platform } from "react-native";
import * as Linking from 'expo-linking';

export const openSettingsApp = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL("app-settings:");
  } 
  else if (Platform.OS === 'android') {
    Linking.openSettings();
  }
};