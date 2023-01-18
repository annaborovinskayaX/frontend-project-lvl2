import yaml from 'js-yaml';

const parseFile = (obj, format) => {
  switch (format) {
    case '.yaml':
    case '.yml':
      return yaml.load(obj);
    case '.json':
      return JSON.parse(obj);
    default:
      throw Error('Error');
  }
};

export default parseFile;
