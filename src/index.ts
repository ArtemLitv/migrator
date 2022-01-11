import { promises } from 'fs';
import { join } from 'path';
import { matcher } from '../node_modules/matcher/index';
import { WORK_DIR } from './services/work-dir.service';

const main = async () => {
	// const fileText = (await promises.readFile(testFilePath)).toString(); // return file text
	const fileNames = await promises.readdir(WORK_DIR); // return file names in directory
	const components = matcher(fileNames, ['*.html']); // applay mask
	fileNames.forEach(async (fileName) => {
		const isDir = (await promises.lstat(join(WORK_DIR, fileName))).isDirectory(); // check what it's a dir or file
		console.log(`${fileName} is ${isDir ? 'dir' : 'file'}`);
	});
};

main().catch((error) => console.log(error));
