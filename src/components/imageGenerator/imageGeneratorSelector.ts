export const ImageGeneratorSelector = {
  canvas: (): HTMLCanvasElement => (
    document.querySelector('[data-js="canvas"]')
  ),
  previewImg: (): HTMLImageElement => (
    document.querySelector('[data-js="preview-img"]')
  ),
  dropZone: (): Element => (
    document.querySelector('[data-js="drop-zone"]')
  ),
  inputFile: (): HTMLInputElement => (
    document.querySelector('[data-js="input-file"]')
  ),
  selectQuality: (): HTMLSelectElement => (
    document.querySelector('[data-js="select-quality"]')
  ),
  inputUrl: (): HTMLInputElement => (
    document.querySelector('[data-js="input-url"]')
  ),
  inputUrlError: (): Element => (
    document.querySelector('[data-js="input-url-error"]')
  ),
  buttonCopy: (): HTMLButtonElement => (
    document.querySelector('[data-js="copy-img-submit"]')
  ),
  buttonUrlSubmit: (): HTMLButtonElement => (
    document.querySelector('[data-js="url-submit"]')
  ),
}
