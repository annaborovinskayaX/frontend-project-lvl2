import _ from 'lodash';

const diff = (file1, file2) => {
  const iter = (node1, node2) => {
    const keys = _.sortBy(_.union(_.keys(node1), _.keys(node2)));
    const result = keys.map((key) => {
      if (!_.has(node1, key)) {
        return {
          name: key,
          action: 'added',
          value: node2[key],
        };
      }
      if (!_.has(node2, key)) {
        return {
          name: key,
          action: 'removed',
          value: node1[key],
        };
      }
      if (_.isObject(node1[key]) && _.isObject(node2[key])) {
        return {
          name: key,
          action: 'nested',
          children: iter(node1[key], node2[key]),
        };
      }
      if (!_.isEqual(node1[key], node2[key])) {
        return {
          name: key,
          action: 'updated',
          value1: node1[key],
          value2: node2[key],
        };
      }
      return {
        name: key,
        action: 'save',
        value: node1[key],
      };
    });
    return result;
  };
  return { name: 'tree', action: 'root', children: iter(file1, file2) };
};
export default diff;
