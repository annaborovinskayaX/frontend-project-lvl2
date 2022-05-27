import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';
import cwd from 'node:process';

const genDiff = (filepath1, filepath2) => {
	console.log(typeof(filepath1));
	const filepathabs1 = path.resolve(filepath1.toString());
	const filepathabs2 = path.resolve(filepath2.toString());
	console.log(filepathabs1);
	console.log(typeof(filepathabs1));

	const file1 = fs.readFileSync(filepathabs1, 'utf-8');
	const file2 = fs.readFileSync(filepathabs2, 'utf-8');
	console.log(`!!!! ${file1}`);
	console.log(typeof(file1));

	return file1;
};

export default genDiff;

