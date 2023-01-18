import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 2);

const stringify = (item, strDepth, runStylish) => {
  if (!_.isObject(item)) {
    return item;
  }
  const result = Object.entries(item)
    .map(([key, value]) => runStylish({ action: 'save', value, name: key }, strDepth)).join('\n');
  return `{\n${result}\n${indent(strDepth - 1)}  }`;
};

const stylish = (node, depth = 0) => {
  const { name } = node;
  const depthNew = depth + 1;
  switch (node.action) {
    case 'root':
      return `{\n${node.children.map((child) => stylish(child, depthNew)).join('\n')}\n}`;

    case 'nested': {
      const strings = node.children.map((child) => stylish(child, depthNew)).join('\n');
      return `${indent(depth)}  ${name}: {\n${strings}\n${indent(depth)}  }`;
    }

    case 'updated': {
      const strOld = `${indent(depth)}- ${name}: ${stringify(node.value1, depthNew, stylish)}`;
      const strNew = `${indent(depth)}+ ${name}: ${stringify(node.value2, depthNew, stylish)}`;
      return `${strOld}\n${strNew}`;
    }

    case 'added':
      return `${indent(depth)}+ ${name}: ${stringify(node.value, depthNew, stylish)}`;

    case 'removed':
      return `${indent(depth)}- ${name}: ${stringify(node.value, depthNew, stylish)}`;

    case 'save':
      return `${indent(depth)}  ${name}: ${stringify(node.value, depthNew, stylish)}`;

    default:
      throw Error('Error');
  }
};

export default stylish;
