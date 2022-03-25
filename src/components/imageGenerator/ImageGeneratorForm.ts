import { taskSelector } from "../../shared/selectors/task.selector";

export function ImageGeneratorForm() {
  const uploadIcon = chrome.runtime.getURL('/images/hud/upload.svg')
  const colorClass = Array.from(taskSelector.taskHeader().classList)
    .find(classItem => classItem.includes('-modal-bg')).replace('bg', 'text')

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
              class="img-uploader__input-url w-100 mr-2 ${colorClass}"
              type="url"
              placeholder="https://via.placeholder.com/64x64"
            >
          </div>
          <button data-js="url-submit" type="button"class="img-uploader__update-btn btn btn-secondary">
            Update
          </button>
        </div>
        <p data-js="input-url-error" class="text-error mb-0 mt-1"></p>
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
    <label class="mb-1 d-block bold" for="select-quality">Qualité*</label>
    <select value="" data-js="select-quality" class="d-block w-100" id="quality-select">
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
