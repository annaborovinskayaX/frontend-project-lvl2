import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (data) => {
  const iter = (currentValue, parent) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const lines = Object.entries(currentValue).map(([, node]) => {
      switch (node.type) {
        case 'nested':
          return iter(node.children, `${parent}${node.name}.`);
        case 'added':
          return `Property '${parent}${node.name}' was added with value: ${getValue(node.value)}`;
        case 'removed':
          return `Property '${parent}${node.name}' was removed`;
        case 'changed':
          return `Property '${parent}${node.name}' was updated. From ${getValue(node.previusValue)} to ${getValue(node.currentValue)}`;
        case 'unchanged':
          return '';
        default:
          throw new Error('Error');
      }
    });

    return _.compact([...lines]).join('\n');
  };

  return iter(data, '');
};

export default plain;
