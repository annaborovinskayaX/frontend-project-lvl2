import _ from 'lodash';
import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

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
