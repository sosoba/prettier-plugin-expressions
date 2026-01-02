# @sosoba/prettier-plugin-expressions

[![npm version](https://badge.fury.io/js/@sosoba%2Fprettier-plugin-expressions.svg)](https://badge.fury.io/js/@sosoba%2Fprettier-plugin-expressions)

This is a prettier plugin which improves the readability of expressions by surrounding them with bracket even if they are not necessary for calculating machines.

| 🆘 raw Prettier style    | ✅ with this plugin        | Discusion                                        |
| ------------------------ | -------------------------- | ------------------------------------------------ |
| `1 + 2 * 3 + 4 / 2`      | `1 + (2 * 3) + (4 / 2)`    | https://github.com/prettier/prettier/issues/187  |
| `condA && condB ? 1 : 0` | `(condA && condB) ? 1 : 0` | https://github.com/prettier/prettier/issues/3805 |

## Installation

Prerequisites: [Prettier](https://prettier.io/) (`^3`).

Add plugin as develompment-only dependency:

```bash
npm install --save-dev @sosoba/prettier-plugin-expressions # or yarn, pnpm etc.
```

## Configuration

Add plugin in a manner appropriate to the configuration method chosen in the project and enable desired options. Ex.:

`.prettierrc.yaml`:

```yaml
plugins:
  - '@sosoba/prettier-plugin-expressions'
parenthesesInExpressionsWithMixedOperators: true
parenthesesAroundConditionalInTernaryExpression: true
```

`.prettierrc.json`:

```json
{
  "plugins": ["@sosoba/prettier-plugin-expressions"],
  "parenthesesInExpressionsWithMixedOperators": true,
  "parenthesesAroundConditionalInTernaryExpression": true
}
```
