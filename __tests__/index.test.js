import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import process from 'node:process';
import genDiff from '../src/index.js';

const filename1 = fileURLToPath(import.meta.url);
const dirname1 = dirname(filename1);

const getFixturePath = (filename) => path.join(dirname1, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

const expectStylish = readFile(getFixturePath('stylish.expect.txt')).slice(0, -1);
const expectPlain = readFile(getFixturePath('plain.expect.txt')).slice(0, -1);
const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const ymlFile1 = getFixturePath('file1.yml');
const ymlFile2 = getFixturePath('file2.yml');

test.each([
  [jsonFile1, jsonFile2, expectStylish],
  [ymlFile1, ymlFile2, expectStilish],
])('gendiff slylish', (file1, file2, expected) => {
  expect(genDiff(file1, file2, 'stylish')).toBe(expected);
});

test.each([
  [jsonFile1, jsonFile2, expectPlain],
  [ymlFile1, ymlFile2, expectPlain],
])('gendiff plain', (file1, file2, expected) => {
  expect(genDiff(file1, file2, 'plain')).toBe(expected);
});
