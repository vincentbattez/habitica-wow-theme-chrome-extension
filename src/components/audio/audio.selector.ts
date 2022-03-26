import { AudioEnum } from "./audio.enum";

export const audioSelector = {
  audio: (): HTMLAudioElement => (
    document.querySelector('#sound')
  ),
  sourceCollection: (): NodeListOf<HTMLSourceElement> => (
    document.querySelectorAll("#sound source")
  ),
  link: (audioName: AudioEnum): string => (
    chrome.runtime.getURL(`/audio/${audioName}.ogg`)
  ),
}
