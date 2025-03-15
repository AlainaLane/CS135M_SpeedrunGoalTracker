import { Stack } from "expo-router";
import GoalsProvider from "@/context/GoalsContext"
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Quantico_400Regular, useFonts } from "@expo-google-fonts/quantico";
import { DarkTheme, DefaultTheme, ThemeProvider, } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/colors"


export default function RootLayout() {
  const [loaded, error] = useFonts({
    Quantico_400Regular
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
      return null;
    }
    return (
      <GoalsProvider>
        <Tabs 
          screenOptions={{
            tabBarStyle: { backgroundColor: "#33ccff" },
            tabBarActiveTintColor: "#111111",
            tabBarInactiveTintColor: "#bbbbbb",
            headerShown: false,
            // headerTitleAlign: "center",
          }}
        >
          <Tabs.Screen
            name="index"
            options={{ title: "Home", }}
          />
          <Tabs.Screen
            name="habits/[id]"
            options={{ title: "Contact", }}
          />
        </Tabs>
      </GoalsProvider>
    );
}
