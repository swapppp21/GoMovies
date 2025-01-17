import { useState } from "react";
import { View, TextInput, FlatList, Image, TouchableOpacity, Text, StatusBar } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  const searchMovies = (query) => {
    axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  };

  return (
    <View className="flex-1 bg-black px-4 pt-10">
      <StatusBar backgroundColor="black" barStyle="light-content" />

      {/* Search Input */}
      <TextInput
        className="bg-gray-800 text-white p-3 rounded-lg text-lg mb-4"
        placeholder="Search for movies..."
        placeholderTextColor="gray"
        onChangeText={(text) => {
          setSearchText(text);
          searchMovies(text);
        }}
      />

      <FlatList
        key={movies.length} 
        data={movies}
        keyExtractor={(item) => item.show.id.toString()}
        numColumns={2} 
        columnWrapperStyle={{ justifyContent: "space-between" }} // ✅ Spacing between columns
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-gray-900 rounded-lg mb-4 mt-2 pt-4 w-[48%] overflow-hidden"
            onPress={() => router.push({ pathname: "/details", params: { movie: JSON.stringify(item.show) } })}
          >
            <Image 
              source={{ uri: item.show.image?.medium || "https://via.placeholder.com/150x200" }} 
              className="w-full h-52"
              style={{ resizeMode: "contain" }} // ✅ Ensures the entire image fits properly
            />
            <Text className="text-white text-lg text-center p-2">{item.show.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
