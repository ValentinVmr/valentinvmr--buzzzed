import {computed, onMounted, ref} from "vue";

interface Sound {
  name: string;
  file: string;
}

export const useSounds = () => {
  const sounds: Sound[] = [
    {
      name: "Whoooo",
      file: "whoooo.ogg",
    },
    {
      name: "Coin",
      file: "duck.ogg",
    },
    {
      name: "Ding",
      file: "bellding.ogg",
    },
    {
      name: "Classique",
      file: "classic.ogg",
    },
    {
      name: "Bonk",
      file: "bonk.ogg",
    },
    {
      name: "Miaou",
      file: "meow.ogg",
    },
    {
      name: "Bruh",
      file: "bruh.ogg",
    },
    {
      name: "OIIA",
      file: "oiia.ogg",
    },
    {
      name: "Steve oof",
      file: "classic_hurt.ogg",
    },
    {
      name: "Villageois Minecraft",
      file: "minecraft-villager.ogg",
    }
  ];

  onMounted(() => {
    sounds.forEach(sound => {
      new Audio(`/sounds/${sound.file}`)
    });
  });

  const soundsRef = ref(sounds);

  const soundList = computed(() => sounds.map(sound => sound.name));
  const getSound = (id: number) => sounds[id];

  return { sounds: soundsRef, soundList, getSound }
}
