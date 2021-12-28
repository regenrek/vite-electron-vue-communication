import { it, test, expect } from 'vitest';
import * as links from './social-links';


it('Social links basic test /', () => {
  for (const [, link] of Object.entries(links)) {
    test(link, () => expect(link.endsWith('/')).toBeFalsy());
  }
});
