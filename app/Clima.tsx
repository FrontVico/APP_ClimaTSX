import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity, ImageBackground } from "react-native";
import axios from "axios";

export default function Clima() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [bgImage, setBgImage] = useState(""); // Estado para controlar a imagem de fundo

  const API_KEY = "9c2ce7695d3bb0140bd964d5d7418641"; // Substitua pela sua chave da API OpenWeatherMap

  const fetchWeather = async () => {
    if (!city) {
      Alert.alert("Erro", "Digite o nome de uma cidade.");
      return;
    }
    try {
      const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          units: "metric",
          appid: API_KEY,
        },
      });
      setWeather(response.data);

      // Definir o fundo com base no clima
      if (response.data.weather[0].main === "Clear") {
        setBgImage("https://img.freepik.com/vetores-gratis/fundo-de-verao-quente-gradiente_23-2149444453.jpg?t=st=1733368246~exp=1733371846~hmac=025d84d86f44354327621af46af612335bc38cd0229080aae03d0ddc430f5a7d&w=826"); // Substitua pelo link de imagem de sol
      } else if (response.data.weather[0].main === "Clouds") {
        setBgImage("https://img.freepik.com/fotos-gratis/nuvens-de-tempestade_1122-2746.jpg?t=st=1733368314~exp=1733371914~hmac=c580126cedadadefc425dc67cf26f898efcc61d9e6bab92669c019ce94517007&w=360"); // Substitua pelo link de imagem de nuvem escura
      }
    } catch (error) {
      Alert.alert("Erro", "Cidade não encontrada. Tente novamente.");
      setWeather(null);
    }
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.container}>
      <Text style={styles.title}>FrontVico's Weather </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Buscar Clima</Text>
      </TouchableOpacity>

      {weather && (
        <View style={styles.weatherInfo}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
          />
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    resizeMode: "cover", // Para que a imagem cubra toda a tela
    backgroundColor: "#87CEEB",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "90%",
    backgroundColor: "#ffffffaa", // Fundo semi-transparente
    color: "#333",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4169E1", // Azul royal para o botão
    padding: 15,
    borderRadius: 25,
    width: "50%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#ffffffaa", // Fundo semi-transparente
    padding: 20,
    borderRadius: 15,
    width: "90%",
  },
  city: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 18,
    color: "#666",
    textTransform: "capitalize",
    marginTop: 10,
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
