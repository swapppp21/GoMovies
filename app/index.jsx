import { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";


export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const router = useRouter();
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    axios.get("https://api.tvmaze.com/search/shows?q=all")
      .then(response => {
        setMovies(response.data);
        setFeaturedMovies(response.data.slice(0, 5)); 
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current && featuredMovies.length > 0) {
        currentIndex.current = (currentIndex.current + 1) % featuredMovies.length;
        flatListRef.current.scrollToIndex({ index: currentIndex.current, animated: true });
      }
    }, 4000); 

    return () => clearInterval(interval);
  }, [featuredMovies]);

  return (
    <View className="flex-1 bg-black px-4">
      
      {/* Featured Movie Slider */}
      {featuredMovies.length > 0 && (
        <FlatList
          ref={flatListRef}
          data={featuredMovies}
          keyExtractor={(item) => item.show.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <FeaturedMovie movie={item.show} onPress={() => router.push({ pathname: "/details", params: { movie: JSON.stringify(item.show) } })} />
          )}
        />
      )}

      {/* Movies Grid */}
      <Text className="text-white text-xl font-bold mt-6 mb-4">All Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.show.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <MovieCard movie={item.show} onPress={() => router.push({ pathname: "/details", params: { movie: JSON.stringify(item.show) } })} />
        )}
      />
      <View className="  w-full pt-2 bg-black flex-row justify-around border-t border-gray-800">
      <TouchableOpacity onPress={() => router.push("/")} className="items-center">
        <Image source={require("../assets/images/home.png")} className="w-10 h-10" />
        <Text className="text-white text-xs mt-1">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/search")} className="items-center">
        <Image source={require("../assets/images/search.png")} className="w-10 h-10" />
        <Text className="text-white text-xs mt-1">Search</Text>
      </TouchableOpacity>
    </View>
      
    </View>
    
  );
}

const FeaturedMovie = ({ movie, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ width:600, height:550, backgroundColor: "#222", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
    <Image source={{ uri: movie.image?.original || "https://via.placeholder.com/400x300" }} style={{ width: "370", height: "100%", opacity: 0.8 }} />
    <View style={{ position: "absolute", bottom: 290, left: 10, padding: 10, backgroundColor: "rgba(0, 0, 0, 0.6)", borderRadius: 5 }}>
      <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>{movie.name}</Text>
      <Text style={{ color: "gray", fontSize: 14, width: 200 }}>{movie.summary.replace(/<[^>]+>/g, '').slice(0, 100)}...</Text>
    </View>
  </TouchableOpacity>
);

const MovieCard = ({ movie, onPress }) => (
  <TouchableOpacity onPress={onPress} className="w-[48%] bg-gray-900 rounded-lg overflow-hidden mb-4">
    <Image source={{ uri: movie.image?.medium || "https://via.placeholder.com/150x200" }} className="w-full h-[200]" />
    <Text className="text-white text-center p-2">{movie.name}</Text>
  </TouchableOpacity>
);

