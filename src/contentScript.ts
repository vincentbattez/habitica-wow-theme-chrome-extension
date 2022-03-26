import '../styles/adapt.scss';
import '../styles/styles.scss';

import { Audio } from "@components/audio/audio";
import { AudioEnum } from "@components/audio/audio.enum";
import { audioSelector } from "@components/audio/audio.selector";
import { imageGenerator } from "@components/imageGenerator/imageGenerator";

import { TaskSelector } from "@shared/selectors/taskSelector";


console.log("✅ Habitica Wow Theme Loaded")

window.addEventListener("load", () => {
  console.log("⭐️ Window loaded()")
  // Open Task
  TaskSelector.taskCollection().forEach($taskItem => (
    $taskItem.addEventListener('click', imageGenerator.inject)
  ))
  TaskSelector.createTaskMenu().addEventListener('click', () => {
    TaskSelector.createTaskCollection().forEach($createTask => (
      $createTask.addEventListener('click', imageGenerator.inject)
    ))
  })
  // Quick add Task
  TaskSelector.quickAddCollection().forEach($quickAdd => (
    $quickAdd.addEventListener('keypress', async (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === "Enter") {
        await Audio.set(AudioEnum.Create_Task)
      }
    })
  ))

  // Audio
  audioSelector.audio().insertAdjacentHTML('afterbegin', `<source type="audio/ogg" src="">`);
  Audio.replaceSoundsObserver()
});
