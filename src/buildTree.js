import _ from 'lodash';

const buildTree = (data1, data2) => {
  const unionKeys = _.union(Object.keys(data1), Object.keys(data2));
  const result = _.sortBy(unionKeys);

  return result
    .map((node) => {
      if (!_.has(data1, node)) {
        return { name: node, type: 'added', value: data2[node] };
      }
      if (!_.has(data2, node)) {
        return { name: node, type: 'removed', value: data1[node] };
      }
      if (_.isObject(data1[node]) && _.isObject(data2[node])) {
        return { name: node, type: 'nested', children: buildTree(data1[node], data2[node]) };
      }
      if (!_.isEqual(data1[node], data2[node])) {
        return {
          name: node, type: 'changed', previusValue: data1[node], currentValue: data2[node],
        };
      }
      return { name: node, type: 'unchanged', value: data1[node] };
    });
};

export default buildTree;
