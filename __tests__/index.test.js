import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import fs from 'fs';
import process from 'node:process';

const filename1 = fileURLToPath(import.meta.url);
const dirname1 = dirname(filename1);

const getFixturePath = (filename) => path.join(dirname1, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

const expected = readFile(getFixturePath('expected.txt'));

console.log(expected);
console.log(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')));
console.log(genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml')));
console.log(typeof(expected));
console.log(typeof(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))));
console.log(typeof(genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'))));

test('gendiff json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expected);
});

test('gendiff yml', () => {
  expect(genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'))).toEqual(expected);
});

