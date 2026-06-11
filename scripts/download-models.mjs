import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'

const MODEL_DIR = 'public/models'
const BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'
const FILES = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
]

if (existsSync(`${MODEL_DIR}/tiny_face_detector_model-shard1`)) {
  console.log('face-api.js models already present, skipping download.')
  process.exit(0)
}

mkdirSync(MODEL_DIR, { recursive: true })
for (const file of FILES) {
  console.log(`Downloading ${file}...`)
  execSync(`curl -fsSL -o ${MODEL_DIR}/${file} ${BASE_URL}/${file}`, { stdio: 'inherit' })
}
console.log('Models downloaded successfully.')
