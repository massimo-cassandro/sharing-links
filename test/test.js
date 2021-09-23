import sharing_links, {create_sharing_links} from '../sharing-links.js';

(() => {
  'use strict';
  sharing_links({
    sharing: ['twt', 'fb', 'linkedin', 'wa', 'skype', 'teams'],
    size: 'std',
    title: 'Share on [[NAME]]',
    share_icon: true
  });

  document.querySelector('.on-demand').addEventListener('click', () => {
    create_sharing_links(
      document.querySelector('.on-demand-container'),
      {
        sharing: ['twt', 'fb', 'linkedin', 'wa', 'skype', 'teams'],
        size: 'std',
        title: 'Share on [[NAME]]',
        share_icon: true
      }
    );
  }, false);

})();
