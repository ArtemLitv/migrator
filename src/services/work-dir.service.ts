import filePath from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = filePath.dirname(__filename);

const pathToTest = '../../src/test-project';
const WORK_DIR = join(__dirname, pathToTest);
const CONFIG_DIR = join(WORK_DIR, 'migrator-config');
const IGNORE_DIR = join(CONFIG_DIR, '.migratorignore');

export { WORK_DIR, CONFIG_DIR, IGNORE_DIR };
