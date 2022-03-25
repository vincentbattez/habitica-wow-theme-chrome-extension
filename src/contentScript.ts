import '../styles/adapt.scss';
import '../styles/styles.scss';

import { audio } from "./components/audio/audio";
import { imageGenerator } from "./components/imageGenerator/imageGenerator";

import { AudioEnum } from "./components/audio/audio.enum";
import {audioSelector} from "./components/audio/audio.selector";
import {taskSelector} from "./shared/selectors/task.selector";
import {homepageSelector} from "./shared/selectors/homepage.selector";

console.log("✅ Habitica Wow Theme Loaded")

window.addEventListener("load", () => {
  console.log("⭐️ Window loaded()")
  // Task
  taskSelector.taskCollection().forEach($taskItem => (
    $taskItem.addEventListener('click', imageGenerator.inject)
  ))
  // Quick add Task
  homepageSelector.quickAddCollection().forEach($quickAdd => (
    $quickAdd.addEventListener('keypress', () => (
      audio.set(AudioEnum.Create_Task)
    ))
  ))

  // Audio
  audioSelector.audio().insertAdjacentHTML('afterbegin', `<source type="audio/ogg" src="">`);
  audio.replaceSoundsObserver()
});
