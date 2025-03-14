import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { GoalsContext } from "@/context/GoalsContext";
import AddGoal from "@/components/AddGoal";
import { StatusBar } from "expo-status-bar";

export default function GoalList() {
  const { goals } = useContext(GoalsContext);
  const router = useRouter();
  const goalMAX = 3;

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <Text style={styles.title}>Goal Tracker</Text>
      <View style={{ flex: 1 }}>
        {goals.map((goal) => (
          <View style={styles.goalContainer} key={goal.id}>
            <TouchableOpacity
              style={styles.goalTitleContainer}
              onPress={() => router.push(`./goals/${goal.id}`)}
            >
              <Text style={styles.goalText}>{goal.title}</Text>
            </TouchableOpacity>
            <View style={styles.goalTimeContainer}>
              <Text>Target Time: {goal.targetTime}</Text>
              <Text>Current Time: {goal.currentTime}</Text>
            </View>
          </View>
        ))} 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  goalContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  goalTitleContainer: {
  },
  goalTimeContainer: {
    flexDirection: "column",
    alignItems: 'center',
  },
  title: {
    fontFamily: "Quantico_400Regular",
    fontSize: 48,
    color: "#3399ff",
  },
  goalText: {
    fontFamily: "Quantico_400Regular",
    fontSize: 20,
    color: "#3B1C32",
  },
  goalTime: {
    fontSize: 20,
    color: "#3B1C32",
  },
  feedbackText: {
    fontSize: 14,
    color: "#3B1C32",
    paddingHorizontal: 10,
    textAlign: "right",
    alignSelf: "stretch",
  },
});
