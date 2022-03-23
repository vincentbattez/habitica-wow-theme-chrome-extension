console.log("✅ Habitica Wow Theme Loaded")

function ImageUploader() {
  const colorClass = 'task-neutral-modal-text'
  const uploadIcon = chrome.runtime.getURL('/images/hud/upload.svg')

  return `
<div data-js="img-uploader" class="img-uploader d-flex form-group ${colorClass}">
  <!-- Form -->
  <div class="w-100">
    <label class="mb-1 d-block bold pointer" for="input-file">Image* <small>(ratio 1/1)</small></label>
    <div data-js="drop-zone" class="mr-2 flex-grow-1 img-uploader__drop-zone text-center">
      <img class="img-uploader__upload-icon mb-2" src="${uploadIcon}" alt="">
      <p class="mb-0">
        <label for="input-file" class="img-uploader__browse mb-0 pointer">Browse</label>
        or drop your image
      </p>
      <!-- Image from input file -->
      <input
        id="input-file"
        data-js="input-file"
        class="img-uploader__input-file"
        type="file"
      />
      <p class="img-uploader__or mb-0">Or</p>
  
      <!-- Image from URL -->
      <div class="w-100 text-left">
        <div class="d-flex align-items-end">
          <div class="w-100">
            <label class="mb-1 d-block bold pointer" for="input-url">Image URL</label>
            <input
              id="input-file"
              data-js="input-url"
              class="img-uploader__input-url w-100 mr-2"
              type="url"
              placeholder="https://via.placeholder.com/64x64"
            >
          </div>
          <button data-js="url-submit" type="button"class="img-uploader__update-btn btn btn-secondary">
            Update
          </button>
        </div>
        <p data-js="url-error" class="text-error mb-0 mt-1"></p>
      </div>
    </div>
  </div>

  <!-- 📸 Preview -->
  <div class="d-flex flex-column">
    <label class="mb-1 d-block bold">Preview:</label>
    <div class="img-uploader__preview-zone">
      <canvas data-js="canvas" class="preview-canvas" width="64" height="64"></canvas>
      <img data-js="preview-img" class="preview-img" src="https://via.placeholder.com/64x64" alt="" />
    </div>
  </div>
</div>
  
<div class="d-flex ${colorClass}">
  <!-- Quality Selector -->
  <div class="form-group w-100 mr-2">
    <label class="mb-1 d-block bold" for="quality-select">Qualité*</label>
    <select value="" data-js="quality-select" class="d-block w-100" id="quality-select">
      <option value="poor">Pauvre</option>
      <option value="uncommun">Peu commun</option>
      <option value="rare">Rare</option>
      <option value="epic">Épique</option>
      <option value="legendary">Légendaire</option>
    </select>
  </div>

  <!-- Copy -->
  <button data-js="copy-img-submit" type="button"class="img-uploader__copy-btn btn btn-secondary">
    Copier l'image
  </button>
</div>
`
}

/**
 * @returns {Element}
 */
const dropZone = () => document.querySelector('[data-js="drop-zone"]')

function _drawImage(imageSrc, imageSize) {
  const $canvas = document.querySelector('[data-js="canvas"]')
  const $preview = document.querySelector('[data-js="preview-img"]')
  const context = $canvas.getContext('2d');
  const img = new Image(imageSize, imageSize);

  img.src = imageSrc
  img.onload = () => {
    context.drawImage(img, 0, 0, imageSize, imageSize);
    $preview.src = $canvas.toDataURL()
  };
}

/**
 * @param {string} url
 * @returns {Promise<string> | Promise<boolean>}
 *
 * @private
 */
async function _fetchBlobFromUrl(url) {
  let res
  try {
    res = await fetch(url)
  } catch (e) {
    return false
  }

  const blob = await res.blob()

  return URL.createObjectURL(blob)
}


function initPreviewImage() {
  const notes = document.querySelector(".input-notes").value
  const regex = /\!(\[__hwt-img__\])\((.*)\)/
  const match = notes.match(regex)

  if (!match) {
    return
  }

  _drawImage(match[2] ,64)
}

function onCopyImage() {
  const $preview = document.querySelector('[data-js="preview-img"]')
  const markdownImage = `![__hwt-img__](${$preview.src})`

  navigator.clipboard.writeText(markdownImage).catch(err => {
    console.error('❌ Copy Image: Could not copy text: ', err);
  });
}

function onQualityChange(inputEvent) {
  const borderSize = 64;
  const imageSrc = chrome.runtime.getURL(`/images/img-generator/border-${inputEvent.target.value}.png`)

  _drawImage(imageSrc, borderSize)
}

function onFileChange(inputEvent) {
  const imageSize = 64;
  const blob = URL.createObjectURL(inputEvent.target.files[0])

  _drawImage(blob, imageSize)
}

function onDrop(dropEvent) {
  dropEvent.preventDefault()
  const $inputFile = document.querySelector('[data-js="input-file"]')
  const files = dropEvent.dataTransfer.files

  if (files.length) {
    $inputFile.files = files
    $inputFile.dispatchEvent(new Event('input'))
  }

  onDragOut()
}

function onDragIn(dropEvent) {
  dropEvent.preventDefault()
  console.log("Drag In")
  dropZone().classList.add("drop-zone--in");
}

function onDragOut(dropEvent) {
  console.log("Drag Out")
  dropZone().classList.remove("drop-zone--in");
}

async function onPushUrl() {
  const $urlField = document.querySelector('[data-js="input-url"]')
  const $errorMessage = document.querySelector('[data-js="url-error"]')
  const blob = await _fetchBlobFromUrl($urlField.value)
  $errorMessage.innerHTML = ""

  if (!blob) {
    $errorMessage.innerHTML = "Une erreur s'est produite"
    return
  }

  _drawImage(blob, 64)
}



function insertImageForm() {
  console.log("🤡 insertImageForm()")
  // Insert image uploader section
  document.querySelector(".task-modal-header .form-group").insertAdjacentHTML('afterend', ImageUploader());

  const $inputFile = document.querySelector('[data-js="input-file"]')
  const $qualitySelect = document.querySelector('[data-js="quality-select"]')
  const $copyImageSubmit = document.querySelector('[data-js="copy-img-submit"]')
  const $urlSubmit = document.querySelector('[data-js="url-submit"]')
  const $dropZone = dropZone()

  initPreviewImage()
  $inputFile.addEventListener('input', onFileChange)
  $qualitySelect.addEventListener('input', onQualityChange)
  $copyImageSubmit.addEventListener('click', onCopyImage)
  $urlSubmit.addEventListener('click', onPushUrl)
  // Drag & Drop Listeners
  $dropZone.addEventListener('dragover', onDragIn)
  $dropZone.addEventListener('dragleave', onDragOut)
  $dropZone.addEventListener('dragend', onDragOut)
  $dropZone.addEventListener('drop', onDrop)
}


window.addEventListener("load", () => {
  console.log("⭐️ Window loaded()")
  document.querySelectorAll('.task-content').forEach(
    node => node.addEventListener('click', insertImageForm)
  )
});


