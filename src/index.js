import path from 'path';
import * as fs from 'fs';
import diff from './diff.js';
import formatter from './formatters/index.js';
import parseFile from './parsers.js';

const getData = (filepath) => {
  const format = path.extname(filepath);
  const obj = fs.readFileSync(filepath, 'utf-8');
  return parseFile(obj, format);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const callDiff = diff(data1, data2);
  return formatter(callDiff, format);
};

export default genDiff;
