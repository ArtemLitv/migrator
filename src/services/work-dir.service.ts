import filePath from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = filePath.dirname(__filename);

const pathToSrc = '../../src/';
const pathToTest = join(pathToSrc, 'test-project');
const pathToLogger = join(pathToSrc, 'logger-messages/logger-messages.txt');
const WORK_DIR = join(__dirname, pathToTest);
const CONFIG_DIR = join(WORK_DIR, 'migrator-config');
const IGNORE_DIR = join(CONFIG_DIR, '.migratorignore');
const LOG_DIR = join(__dirname, pathToLogger);

export { WORK_DIR, CONFIG_DIR, IGNORE_DIR, LOG_DIR };
