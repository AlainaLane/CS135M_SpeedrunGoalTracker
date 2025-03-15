import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GoalsContext } from "@/context/GoalsContext";

export default function GoalDetails() {
  const { deleteGoal, addGoal } = useContext(GoalsContext);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [error, setError] = useState(false);

  // Process form submission
  const handleSubmit = () => {
    if (title.trim() && description.trim() && targetTime.trim() && currentTime.trim()) {
      const newGoal = {
        id: Math.random().toString(),
        title,
        description,
        targetTime,
        currentTime,
      };
      addGoal(newGoal);
      setTitle("");
      setDescription("");
      setTargetTime("");
      setCurrentTime("");
      setError(false);
      router.push("/");
    } else {
      setError(true);
    }
  };

  return (
    <View style={{ padding: 20, justifyContent: "center" }}>
      <View>
        <Text style={styles.title}>Add a Goal</Text>

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

        {error && (
                <Text style={{ color: "red", marginTop: 10 }}>
                  Please fill out all fields.
                </Text>
              )}

        <View style={{ marginBottom: 15 }}>
          <Button
            title="Add Goal"
            color="#009933"
            onPress={handleSubmit}
          />
        </View>
      </View>
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
