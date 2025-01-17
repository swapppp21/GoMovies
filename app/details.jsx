import { View, Text, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {
  const { movie } = useLocalSearchParams();
  const movieData = JSON.parse(movie);

  return (
    <ScrollView className="flex-1 bg-black p-4">
      <Image source={{ uri: movieData.image?.original }} className="h-[500] w-full rounded" />
      <Text className="text-white text-2xl font-bold mt-4">{movieData.name}</Text>
      <Text className="text-gray-400 mt-2">{movieData.genres?.join(", ")}</Text>
      <Text className="text-white mt-4">{movieData.summary.replace(/<[^>]+>/g, '')}</Text>
    </ScrollView>
  );
}
