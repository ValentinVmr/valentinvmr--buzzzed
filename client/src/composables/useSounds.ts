import {computed, onMounted, ref} from "vue";

interface Sound {
  name: string;
  file: string;
}

export const useSounds = () => {
  const sounds: Sound[] = [
    {
      name: "Whooooooo !",
      file: "whoooo.ogg",
    },
    {
      name: "Fart noise",
      file: "fart.ogg",
    }
  ];

  const soundsRef = ref(sounds);
  const soundList = computed(() => sounds.map(sound => sound.name));
  const getSound = (id: number) => sounds[id];

  return { sounds: soundsRef, soundList, getSound }
}
