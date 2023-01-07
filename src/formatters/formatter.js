import stylish from './stylish.js';

const formatter = (tree, format) => {
	switch (format) {
		case 'stylish':
			return stylish(tree);

		case 'json':
			return JSON.stringify(tree, null, ' ');

		default:
			throw new Error(`Error`);
	}
};

export default formatter;
