import type { Doc } from 'prettier';
import type { builders } from 'prettier/doc.js';

export function isGroup(doc: Doc): doc is builders.Group {
  return typeof doc === 'object' && 'type' in doc && doc.type === 'group';
}
