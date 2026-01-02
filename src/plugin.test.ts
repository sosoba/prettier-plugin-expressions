import { equal } from 'node:assert/strict';
import test from 'node:test';
import { format } from 'prettier';
import plugin from './plugin.ts';

// https://github.com/prettier/prettier/issues/187
// https://github.com/prettier/prettier/issues/3805
// https://eslint.org/docs/latest/rules/no-mixed-operators
Object.entries({
  'a&&b?1:a||b': '(a && b) ? 1 : (a || b)',
  '10 * 2 + 5 + 20 / 4 * 2 + 9': '(10 * 2) + 5 + ((20 / 4) * 2) + 9',
  '1*2': '1 * 2',
  '1*2-3': '(1 * 2) - 3',
  '((1*2))-3': '(1 * 2) - 3',
  '0+1/2*3/4*5/6-7': '0 + (((((1 / 2) * 3) / 4) * 5) / 6) - 7',
  'console.log(1*2*3)': 'console.log(1 * 2 * 3)',
  'const value = one * two / three': 'const value = (one * two) / three',
  '1 + 2 * 3 % 6 + 1': '1 + ((2 * 3) % 6) + 1',
  'test ? a + b : a * b': 'test ? a + b : a * b',
  '8/2*4': '(8 / 2) * 4',
  'a && b || c || d': '(a && b) || c || d',
}).forEach(([src, expected]) =>
  test(src, async () => {
    const formatted = await format(src, {
      parser: 'babel',
      plugins: [plugin],
      parenthesesInExpressionsWithMixedOperators: true,
      parenthesesAroundConditionalInTernaryExpression: true,
    });
    equal(formatted, `${expected};\n`);
  }),
);
