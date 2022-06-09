import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import process from 'node:process';

const readFile = (filepath) => filepath.startsWith('/home') ? fs.readFileSync(filepath, 'utf-8') : fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const parseFile = (filepath) => {
	const format = path.extname(filepath);
	let parser;

	if (format === '.json' || format === '') {
		parser = JSON.parse;
	} else if (format === '.yml' || format === '.yaml') {
		parser = yaml.load;
	}

	const data = readFile(filepath);
	if (parser === yaml.load) {
		return yaml.load(data);
	}
	return JSON.parse(data);
};

export default parseFile;

