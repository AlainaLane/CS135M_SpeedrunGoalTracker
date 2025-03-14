import { Stack } from "expo-router";
import GoalsProvider from "@/context/GoalsContext"
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Quantico_400Regular, useFonts } from "@expo-google-fonts/quantico";

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
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Speedrun Goal Tracker", headerShown: true }}
          />
          <Stack.Screen
            name="goals/[id]"
            options={{ title: "Speedrun Goal Tracker", headerShown: true }}
          />
        </Stack>
      </GoalsProvider>
    );
}
