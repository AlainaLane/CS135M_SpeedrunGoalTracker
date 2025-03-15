import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GoalsContext } from "@/context/GoalsContext";

export default function GoalDetails() {
  const { id } = useLocalSearchParams();
  const { goals, deleteGoal, updateGoal } = useContext(GoalsContext);
  const router = useRouter();

  // * Replace the next line with code that finds the goal selected
  const goal = goals.find((goal) => goal.id === id) || {};

  const [title, setTitle] = useState(goal.title || "");
  const [description, setDescription] = useState(goal.description || "");
  const [targetTime, setTargetTime] = useState(goal.targetTime || "");
  const [currentTime, setCurrentTime] = useState(goal.currentTime || "");

  const handleDelete = () => {
    if (goal.id) {
      deleteGoal(goal.id);
      router.push("/");
    }
  };

  return (
    <View style={{ padding: 20, justifyContent: "center" }}>
      {goal.id ? (
        <View>
          <Text style={styles.title}>Add or Edit a Goal</Text>

          <Text style={styles.goalText}>Goal Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Goal Title"
            style={styles.goalBoxText}
            multiline={true}
            numberOfLines={2}
          />

          <Text style={styles.goalText}>Description</Text> 
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            style={[styles.goalBoxText, { height: 120 }]}
            multiline={true}
            numberOfLines={2}
          />

          <Text style={styles.goalText}>Target Time</Text>
          <TextInput
            value={targetTime}
            onChangeText={setTargetTime}
            placeholder="Target Time"
            style={styles.goalBoxText}
            multiline={true}
            numberOfLines={2}
          />

          <Text style={styles.goalText}>Current Time</Text>
          <TextInput
            value={currentTime}
            onChangeText={setCurrentTime}
            placeholder="Current Time"
            style={styles.goalBoxText}
            multiline={true}
            numberOfLines={2}
          />

          <View style={{ marginBottom: 15 }}>
            <Button
              title="Save Changes"
              color="#009933"
              onPress={() => {
                updateGoal(id, { title, description, targetTime, currentTime });
                router.push("/");
              }}
            />
          </View>

          <View style={{ marginBottom: 15 }}>
            <Button
              title="Delete Goal"
              color="#800000"
              onPress={handleDelete}
            />
          </View>
        </View>
      ) : (
        <Text>Habit not found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Quantico_400Regular",
    fontSize: 36,
    color: "#33ccff",
  },
  goalText: {
    fontFamily: "Quantico_400Regular",
    fontSize: 16,

  },
  goalBoxText: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: "#aaa",
    color: "#3B1C32",
    fontSize: 16,
    textAlignVertical: "top",
  },
});
