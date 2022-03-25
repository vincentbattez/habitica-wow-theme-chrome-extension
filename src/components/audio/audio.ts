import { audioSelector } from "./audio.selector";
import {AudioEnum} from "./audio.enum";

export const audio = {
  set: (audioName: AudioEnum): Promise<void> => {
    const $audio = audioSelector.audio()
    const $audioSourceCollection = audioSelector.sourceCollection()
    const audioSrc = chrome.runtime.getURL(`/audio/${audioName}.ogg`)

    $audioSourceCollection.forEach($audioSource => $audioSource.src = audioSrc)
    $audio.load()
    return $audio.play()
  },

  replaceSoundsObserver: (): void => {
    const $audio = audioSelector.audio()
    const observer = new MutationObserver(_replaceSound);

    observer.observe($audio, {
      attributes: true,
      childList: true,
    });
  }
}


function _replaceSound(mutationCollection: MutationRecord[]): void {
  mutationCollection.forEach(async mutation => {
    const $audioSource = mutation.type === 'childList'
      ? mutation.addedNodes[0] as HTMLSourceElement
      : mutation.target as HTMLSourceElement

    if ($audioSource.src.includes('chrome-extension://')) {
      return
    }

    // Get audio name
    const audioName = $audioSource
      .getAttribute('src')
      .split('/').pop()
      .split(".").shift() as AudioEnum

    // Change audio
    await audio.set(audioName)
  })
}
