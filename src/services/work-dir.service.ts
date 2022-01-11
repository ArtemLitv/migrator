import filePath from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = filePath.dirname(__filename);

const pathToTest = '../../src/test-project';
const WORK_DIR = join(__dirname, pathToTest);

export { WORK_DIR };
