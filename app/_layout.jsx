import { useState, useEffect, useRef } from "react";
import { View, Text, Animated, Image, StatusBar } from "react-native";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const fullText = "GoMovies";
  const textAnimations = fullText.split("").map(() => useRef(new Animated.Value(0)).current);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let index = 0;
    const speed = 20; 

    const appearAnimations = textAnimations.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: speed,
        delay: i * speed,
        useNativeDriver: true,
      })
    );

    Animated.sequence(appearAnimations).start(() => {
      setTimeout(() => {
        const disappearAnimations = [...textAnimations]
          .reverse()
          .map((anim, i) =>
            Animated.timing(anim, {
              toValue: 0,
              duration: speed,
              delay: i * speed,
              useNativeDriver: true,
            })
          );

        Animated.sequence(disappearAnimations).start(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500, 
            useNativeDriver: true,
          }).start();

          Animated.timing(scaleAnim, {
            toValue: 6, 
            duration: 1000, 
            useNativeDriver: true,
          }).start(() => {
            setIsLoading(false); 
          });
        });
      }, 100);
    });
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <StatusBar backgroundColor="black" barStyle="light-content" />

        {/* Animated Text */}
        <View className="flex-row">
          {fullText.split("").map((letter, index) => (
            <Animated.Text
              key={index}
              style={{
                fontSize: 62,
                fontWeight: "bold",
                color: "white",
                opacity: textAnimations[index],
                marginLeft: 2,
              }}
            >
              {letter}
            </Animated.Text>
          ))}
        </View>

        {/* Animated Image (Appears & Expands) */}
        <Animated.Image
          source={require("../assets/images/movie.png")}
          className="absolute w-40 h-40"
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black pb-12"> 
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
