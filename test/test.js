import m_sharing from '../m-sharing.js';

(() => {
  'use strict';
  m_sharing({
    sharing: ['fb', 'twt', 'linkedin', 'wa'],
    size: 'std',
    title_prefix: 'Share on'
  });
})();
