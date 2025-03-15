import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { GoalsContext } from "@/context/GoalsContext";

export default function AddGoal() {
  const { addGoal } = useContext(GoalsContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [error, setError] = useState(false);

  // Process form submission
  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
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
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Add New Goal</Text>
      <TextInput
        placeholder="Goal Title"
        value={title}
        onChangeText={setTitle}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Goal Description"
        value={description}
        onChangeText={setDescription}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Target Time"
        value={targetTime}
        onChangeText={setTargetTime}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Current Time"
        value={currentTime}
        onChangeText={setCurrentTime}
        style={styles.inputBox}
      />
      <View style={{ marginTop: 15 }}>
        <Button title="Add Goal" onPress={handleSubmit} />
      </View>
      {error && (
        <Text style={{ color: "red", marginTop: 10 }}>
          Please fill out all fields.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 40,
    },
    inputBox: {
      borderWidth: 1,
      borderColor: "#aaa",
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      textAlignVertical: "top",
    },
  });