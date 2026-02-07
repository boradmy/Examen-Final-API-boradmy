// src/data/entrenadores.js
export const entrenadores = [
  {
    id: 1,
    name: "Ash Ketchum",
    age: 10,
    city: "Pueblo Paleta",
    specialty: "Eléctrico / Lucha",
    picture: "https://upload.wikimedia.org/wikipedia/en/1/17/Ash_Ketchum.png",
    pokemons: [1, 4, 7] // IDs que referencian a Bulbasaur, Charmander, Squirtle
  },
  {
    id: 2,
    name: "Misty",
    age: 12,
    city: "Ciudad Celeste",
    specialty: "Agua",
    picture: "https://upload.wikimedia.org/wikipedia/en/0/09/Misty_Pokemon.png",
    pokemons: [7] // Squirtle
  },
  {
    id: 3,
    name: "Brock",
    age: 15,
    city: "Ciudad Plateada",
    specialty: "Roca",
    picture: "https://upload.wikimedia.org/wikipedia/en/4/4b/Brock_Pokemon.png",
    pokemons: [] // puedes agregar IDs de Onix/Geodude si los incluyes en pokemons.js
  }
];