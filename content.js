import('/js/html2canvas.min.js').then(_ => {});

function ImageUploader() {
  return `
<div data-js="img-uploader" class="form-group img-uploader">
  <div class="d-flex">
    <label class="mb-1">Image*</label>
  </div>
  <div class="d-flex">
    <div>
      <select data-js="quality-select">
        <option value="poor">Pauvre</option>
        <option value="uncommun">Peu commun</option>
        <option value="rare">Rare</option>
        <option value="epic">Épique</option>
        <option value="legendary">Légendaire</option>
      </select>
      <input
        data-js="input-file"
        class="img-uploader__input-file"
        type="file"
        required="required"
      >
    </div>
    <canvas data-js="preview-canvas"></canvas>
    <!--    <div data-js="preview-final-image" class="img-uploader__image-preview">-->
    <!--      <img data-js="border-image" class="img-uploader__border-image" src="images/img-generator/border-epic.png" alt="">-->
    <!--      <img data-js="user-image-preview" class="img-uploader__user-image-preview" src="" alt="">-->
    <!--    </div>-->
  </div>
</div>
`
}

function onQualityChange(inputEvent) {
  const $border = document.querySelector('[data-js="border-image"]')
  const $canvas = document.querySelector('[data-js="preview-canvas"]')
  var context = $canvas.getContext('2d');
  var imageObj1 = new Image();
  imageObj1.src = chrome.runtime.getURL(`/images/img-generator/border-${inputEvent.target.value}.png`)
  imageObj1.onload = function() {
    context.drawImage(imageObj1, 0, 0);
  };

  document.body.appendChild(imageObj1)
}

function onFileChange(inputEvent) {
  console.log("🤡 onFileChange()")
  const blob = URL.createObjectURL(inputEvent.target.files[0])
  const $preview = document.querySelector('[data-js="user-image-preview"]')
  const $canvas = document.querySelector('[data-js="preview-canvas"]')

  var context = $canvas.getContext('2d');
  var imageObj1 = new Image();
  imageObj1.src = blob
  imageObj1.onload = function() {
    context.drawImage(imageObj1, 0, 0);
  };

  $preview.src = blob
  // html2canvas(document.querySelector('[data-js="preview-final-image"]')).then(canvas => {
  //   console.log(canvas)
  //   document.body.appendChild(canvas)
  // });
}

function insertImageForm() {
  // Insert image uploader section
  document.querySelector(".task-modal-header .form-group").insertAdjacentHTML('afterend', ImageUploader());

  const $inputFile = document.querySelector('[data-js="input-file"]')
  const $qualitySelect = document.querySelector('[data-js="quality-select"]')

  $inputFile.addEventListener('input', onFileChange)
  $qualitySelect.addEventListener('input', onQualityChange)
}

document.querySelectorAll('.task-content').forEach(
  node => node.addEventListener('click', insertImageForm)
)
