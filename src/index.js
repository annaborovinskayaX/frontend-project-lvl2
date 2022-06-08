import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const genDiff = (filepath1, filepath2) => {
  const readFile = (filepath) => (filepath.startsWith('/home') ? fs.readFileSync(filepath) : fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));

  const file1 = JSON.parse(readFile(filepath1), 'utf-8');
  const file2 = JSON.parse(readFile(filepath2), 'utf-8');

  const file1toArray = Object.keys(file1);
  const file2toArray = Object.keys(file2);
  const uniqKeys = _.sortBy(_.union(file1toArray, file2toArray));

  const obj = uniqKeys.reduce((subobj, key) => {
    /* eslint no-param-reassign: "error" */
    if (!_.has(file1, key)) {
      subobj[`+ ${key}`] = file2[key];
    }
    if (!_.has(file2, key)) {
      subobj[`- ${key}`] = file1[key];
    }
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] !== file2[key]) {
        subobj[`- ${key}`] = file1[key];
        subobj[`+ ${key}`] = file2[key];
      }
      if (file1[key] === file2[key]) {
        subobj[`  ${key}`] = file1[key];
      }
    }
    return subobj;
  }, {});

  const diff = `${_.keys(obj).reduce((acc, str) => {
    const newAcc = `${acc}  ${str}: ${obj[str]}\n`;
    return newAcc;
  }, '{\n')}}`;

  return diff;
};

export default genDiff;
