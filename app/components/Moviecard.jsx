import { View, Text, Image, TouchableOpacity } from "react-native";

export default function MovieCard({ movie, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} className="m-2 p-2 bg-gray-900 rounded">
      <Image source={{ uri: movie.image?.medium }} className="h-40 w-full rounded" />
      <Text className="text-white text-lg mt-2">{movie.name}</Text>
    </TouchableOpacity>
  );
}
