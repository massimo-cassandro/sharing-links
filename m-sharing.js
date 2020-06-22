export default function (options) {
  'use strict';

  // sharing urls from https://gist.github.com/apisandipas/74d396c7853b93f5f861091a2135d527
  const sharing_items = {
      fb   : {
        url: 'https://www.facebook.com/sharer.php?u=[[URL]]',
        class: 'fb',
        name: 'Facebook'
      },
      lnkd : {
        url: 'https://www.linkedin.com/sharing/share-offsite/?url=[[URL]]',
        class: 'lnkd',
        name: 'Linkedin'
      },
      twt  : {
        url: 'https://twitter.com/intent/tweet?text=[[TITLE]]&url=[[URL]]',
        class: 'twt',
        name: 'Twitter'
      },
      wa   : {
        url: 'https://api.whatsapp.com/send?text=[[URL]]',
        class: 'wa',
        name: 'Whatsapp'
      }
    },
    default_options = {
      sharing: [],
      size: 'std',
      title_prefix: 'Condividi con'
    }
  ;

  options = Object.assign({}, default_options, options);

  document.querySelectorAll('.m-sharing').forEach(el => {
    let size = (el.dataset.size? el.dataset.size : options.size).toLowerCase();

    if(size !== 'std') {
      el.classList.add(`m-sharing-${size}`);
    }

    options.sharing.forEach( item => {
      let sharing_data;
      switch (item.toLowerCase()) {
        case 'fb':
        case 'facebook':
          sharing_data = sharing_items.fb;
          break;

        case 'lnk':
        case 'lnkd':
        case 'linkedin':
          sharing_data = sharing_items.lnkd;
          break;

        case 'tw':
        case 'twt':
        case 'twitter':
          sharing_data = sharing_items.twt;
          break;

        case 'wa':
        case 'whatsapp':
          sharing_data = sharing_items.wa;
          break;
      }

      let url = sharing_data.url
        .replace('[[URL]]', encodeURIComponent(location.href))
        .replace('[[TITLE]]', encodeURIComponent(document.title));

      el.insertAdjacentHTML('beforeend',
        `<a href="${url}" class="m-sharing-${sharing_data.class}"
          title="${options.title_prefix} ${sharing_data.name}" role="button" tabindex="0">
          <span>${options.title_prefix} ${sharing_data.name}</span>
        </a>`
      );

      el.querySelectorAll('a').forEach(lnk => {
        lnk.addEventListener('click', function(e) {
          e.preventDefault();
          let w =450,
            h=500,
            t = window.top.outerHeight / 2 + window.top.screenY - ( h / 2),
            l = window.top.outerWidth / 2 + window.top.screenX - ( w / 2);
          window.open(this.href, 'm-sharing',
            `width=${w},height=${h},top=${t},left=${l}` +
            ',menubar=no,location=yes,resizable=yes,scrollbars=yes,status=no'
          );
        }, false);
      });

    });

  });
}
