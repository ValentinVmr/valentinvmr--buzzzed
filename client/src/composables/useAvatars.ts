import {computed, ref} from "vue";

export const useAvatars = () => {
  const avatars: string[] = [
    "little-face-56.png",
    "spinned-face-56.png",
    "square-face-56.png",
    "atom-56.jpg",
    "kappa-56.png",
    "sonic-56.jpg",
    "sackboy-56.png",
    "zelda-56.jpeg",
    "steve-56.png",
  ];

  const avatarsRef = ref(avatars);
  const getAvatar = (id: number) => avatars[id];

  return { avatars: avatarsRef, getAvatar }
}
