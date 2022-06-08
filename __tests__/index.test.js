import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const filename1 = fileURLToPath(import.meta.url);
const dirname1 = dirname(filename1);

const getFixturePath = (filename) => path.join(dirname1, '..', '__fixture__', filename);

test('gendiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
