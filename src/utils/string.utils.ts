import {taskSelector} from "../shared/selectors/task.selector";

export const blobToBase64 = (blob: string): string => {
  const regex = /(data:image\/(png|jpeg|jpg);base64,)(.*)/
  const match = blob.match(regex)

  if (!match) {
    return ''
  }

  return match[3]
}

export const _fetchBlobFromUrl = async (url: string): Promise<string> => {
  let urlResponse
  try {
    urlResponse = await fetch(url)
  } catch (e) {
    return ''
  }

  const blob = await urlResponse.blob()

  return URL.createObjectURL(blob)
}

export const getImageUrlFromNote = (): string => {
  const note = taskSelector.inputNote().value
  const regex = /!(\[__hwt-img__])\((.*)\)/

  return note.match(regex)?.[2] || ''
}
