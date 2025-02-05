import {computed, ref} from "vue";

export const useAvatars = () => {
  const avatars: string[] = [
    "little-face-56.png",
    "spinned-face-56.png",
    "square-face-56.png",
  ];

  const avatarsRef = ref(avatars);
  const getAvatar = (id: number) => avatars[id];

  return { avatars: avatarsRef, getAvatar }
}
