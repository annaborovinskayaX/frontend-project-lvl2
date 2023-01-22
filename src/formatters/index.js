import stylish from './stylish.js';
import plain from './plain.js';

const getDataInFormat = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);

    case 'plain':
      return plain(tree);

    case 'json':
      return JSON.stringify(tree, null, ' ');

    default:
      throw new Error('Error');
  }
};

export default getDataInFormat;
