import m_sharing from '../m-sharing.js';

(() => {
  'use strict';
  m_sharing({
    sharing: ['twt', 'fb', 'linkedin', 'wa'],
    size: 'std',
    title: 'Share on [[NAME]]'
  });
})();
