import { Audio } from "@components/audio/audio";
import { AudioEnum } from "@components/audio/audio.enum";

import { UploaderService } from "@services/uploader.service";

import { TaskSelector } from "@shared/selectors/taskSelector";
import { fetchBlobFromUrl, getImageUrlFromNote } from "@shared/utils/string.utils";

import { ImageGeneratorSizeEnum } from "./imageGenerator.enum";
import { ImageGeneratorForm } from "./ImageGeneratorForm";
import { ImageGeneratorSelector } from "./imageGeneratorSelector";

export const imageGenerator = {
  inject: async () => {
    await Audio.set(AudioEnum.Quest_Open)

    // Insert image uploader section
    TaskSelector.formTitle()?.insertAdjacentHTML('afterend', ImageGeneratorForm());

    const $inputFile = ImageGeneratorSelector.inputFile()
    const $selectQuality = ImageGeneratorSelector.selectQuality()
    const $dropZone = ImageGeneratorSelector.dropZone()
    const $buttonCopy = ImageGeneratorSelector.buttonCopy()
    const $buttonUrlSubmit = ImageGeneratorSelector.buttonUrlSubmit()
    const $buttonTask = TaskSelector.buttonTask()
    const $buttonCancelTask = TaskSelector.buttonCancelTask()
    const $buttonDeleteTask = TaskSelector.buttonDeleteTask()

    // Image Generator
    $inputFile.addEventListener('input', _onFileChange)
    $selectQuality.addEventListener('input', _onQualityChange)
    $buttonCopy.addEventListener('click', _onCopyImage)
    $buttonUrlSubmit.addEventListener('click', _onUpdateImageFormUrl)
    // Drag & Drop
    $dropZone.addEventListener('dragover', _onDragIn)
    $dropZone.addEventListener('dragleave', _onDragOut)
    $dropZone.addEventListener('dragend', _onDragOut)
    $dropZone.addEventListener('drop', _onDrop)
    // Delete task
    $buttonDeleteTask?.addEventListener('click', async () => {
      await Audio.set(AudioEnum.Quest_Delete)
    })
    // Create task
    $buttonTask.addEventListener('click',  () => {
      Audio.set(AudioEnum.Create_Task)
    })
    // Close modal
    $buttonCancelTask.addEventListener('click', async () => {
      await Audio.set(AudioEnum.Quest_Close)
    })

    _initPreviewImage()
  },
}

function _initPreviewImage(): void {
  const imgUrl = getImageUrlFromNote()

  if (!imgUrl) {
    return
  }

  _drawImage(imgUrl, ImageGeneratorSizeEnum.PREVIEW)
}

// 🔘 Form
function _onQualityChange(inputEvent: InputEvent): void {
  const $select = inputEvent.target as HTMLSelectElement
  const imageSrc = chrome.runtime.getURL(`/images/img-generator/border-${$select.value}.png`)

  _drawImage(imageSrc, ImageGeneratorSizeEnum.PREVIEW)
}

function _onFileChange(inputEvent: InputEvent): void {
  const $canvas = ImageGeneratorSelector.canvas()
  const context = $canvas.getContext('2d');
  const $input = inputEvent.target as HTMLInputElement;
  const blob = URL.createObjectURL($input.files[0])

  // reset canvas
  context.clearRect(0, 0, $canvas.width, $canvas.height);

  _drawImage(blob, ImageGeneratorSizeEnum.PREVIEW)
}

async function _onUpdateImageFormUrl(): Promise<void> {
  const $urlField = ImageGeneratorSelector.inputUrl()
  const $errorMessage = ImageGeneratorSelector.inputUrlError()
  const blob = await fetchBlobFromUrl($urlField.value)
  $errorMessage.innerHTML = ""

  if (!blob) {
    $errorMessage.innerHTML = "Une erreur s'est produite"
    await Audio.set(AudioEnum.Error_Cors)
    return
  }

  _drawImage(blob, 64)
}

// 👇 Drag & Drop
const DRAG_ZONE_IN_CLASS = 'drop-zone--in'

function _onDrop(dragEvent: DragEvent): void {
  dragEvent.preventDefault()
  const $inputFile = ImageGeneratorSelector.inputFile()
  const files = dragEvent.dataTransfer.files

  if (files.length) {
    $inputFile.files = files
    $inputFile.dispatchEvent(new Event('input'))
  }

  _onDragOut()
}



function _onDragIn(dragEvent: DragEvent): void {
  dragEvent.preventDefault()
  ImageGeneratorSelector.dropZone().classList.add(DRAG_ZONE_IN_CLASS);
}

function _onDragOut(): void {
  ImageGeneratorSelector.dropZone().classList.remove(DRAG_ZONE_IN_CLASS);
}

// 🎨 Draw preview
function _drawImage(imageSrc: string, imageSize: number): void {
  const $canvas = ImageGeneratorSelector.canvas()
  const $preview = ImageGeneratorSelector.previewImg()
  const context = $canvas.getContext('2d');
  const img = new Image(imageSize, imageSize);

  img.src = imageSrc
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    context.drawImage(img, 0, 0, imageSize, imageSize);
    $preview.src = $canvas.toDataURL("image/png")
  };
}

// Copy image
async function _onCopyImage(): Promise<void> {
  const $preview = ImageGeneratorSelector.previewImg()
  const link = await UploaderService.image($preview.src)
  const markdownImage = `![__hwt-img__](${link})`

  // const $note = taskSelector.inputNote()
  // const regex = /!(\[__hwt-img__])\((.*)\)/
  // if ($note.value.match(regex)) {
  //   $note.value = $note.value.replace(/!(\[__hwt-img__])\((.*)\)/, `$1(${link})`)
  // }

  navigator.clipboard.writeText(markdownImage).catch(err => {
    console.error('❌ Copy Image: Could not copy text: ', err);
  });
}
