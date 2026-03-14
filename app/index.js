import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { supabase } from "../utils/supabase";

export default function Index() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data, error } = await supabase.from("todos").select("*");
        console.log(error);

        if (error) {
          console.error("Error fetching todos:", error.message);
          return;
        }

        setTodos(data || []);
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    getTodos();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Todo List</Text>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
