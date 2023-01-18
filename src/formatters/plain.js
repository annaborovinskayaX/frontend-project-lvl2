import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (node, acc = []) => {
  const accJoin = acc.join('.');
  switch (node.action) {
    case 'root':
      return node.children
        .filter((child) => child.action !== 'save')
        .map((child) => plain(child, [...acc, child.name])).join('\n');

    case 'nested':
      return node.children
        .filter((child) => child.action !== 'save')
        .map((child) => plain(child, [...acc, child.name])).join('\n');

    case 'added':
      return `Property '${accJoin}' was added with value: ${stringify(node.value)}`;

    case 'removed':
      return `Property '${accJoin}' was removed`;

    case 'updated':
      return `Property '${accJoin}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;

    default:
      throw Error('Error');
  }
};
export default plain;
