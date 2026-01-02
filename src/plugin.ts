import type { Plugin } from 'prettier';
import { parsers as babelParsers } from 'prettier/plugins/babel';
import { printers } from 'prettier/plugins/estree';
import { parsers as typescriptParsers } from 'prettier/plugins/typescript';
import { isGroup } from './isGroup.ts';

const { estree } = printers;

export const plugin: Plugin = {
  options: {
    parenthesesInExpressionsWithMixedOperators: {
      type: 'boolean',
      description: '',
      category: '',
    },
    parenthesesAroundConditionalInTernaryExpression: {
      type: 'boolean',
      description: '',
      category: '',
    },
  },
  parsers: {
    ...babelParsers,
    ...typescriptParsers,
  },
  printers: {
    ...printers,
    estree: {
      ...estree,
      print(path, options, subprint, args) {
        const doc = estree.print(path, options, subprint, args);
        const { node, parent } = path;
        if (
          ((options['parenthesesInExpressionsWithMixedOperators'] &&
            node.type === 'BinaryExpression' &&
            parent.type === 'BinaryExpression' &&
            (node.operator === '*' || node.operator === '/')) ||
            (options['parenthesesAroundConditionalInTernaryExpression'] &&
              node.type === 'LogicalExpression' &&
              parent?.type === 'ConditionalExpression')) &&
          isGroup(doc) &&
          Array.isArray(doc.contents)
        ) {
          doc.contents = ['(', ...doc.contents, ')'];
        }
        return doc;
      },
    },
  },
};

export default plugin;
