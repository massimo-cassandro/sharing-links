import sharing_links from '../sharing-links.js';

(() => {
  'use strict';
  sharing_links({
    sharing: ['twt', 'fb', 'linkedin', 'wa'],
    size: 'std',
    title: 'Share on [[NAME]]',
    share_icon: true
  });
})();
