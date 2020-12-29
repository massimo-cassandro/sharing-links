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
      },
      skype   : {
        url: 'https://web.skype.com/share?url=[[URL]]&text=[[TITLE]]',
        class: 'skype',
        name: 'Skype'
      },
      teams   : {
        url: 'https://teams.microsoft.com/share?href=[[URL]]&preview=[[PREVIEW]]&msgText=[[TITLE]]',
        class: 'teams',
        name: 'Teams'
      }
    },
    default_options = {
      sharing: [],
      size: 'std',
      title: 'Condividi con [[NAME]]',
      share_icon: true,
      preview: true
    }
  ;

  options = Object.assign({}, default_options, options);

  document.querySelectorAll('.sharing-links').forEach(sharing_container => {
    let size = (sharing_container.dataset.size? sharing_container.dataset.size : options.size).toLowerCase();

    if(size !== 'std') {
      sharing_container.classList.add(`sharing-links-${size}`);
    }


    if( options.share_icon ) {
      sharing_container.insertAdjacentHTML('beforeend',
        '<span class="sharing-links-icon" aria-hidden="true"></span>'
      );
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

        case 'skype':
          sharing_data = sharing_items.skype;
          break;

        case 'teams':
          sharing_data = sharing_items.teams;
          break;
      }

      let url = sharing_data.url
          .replace('[[URL]]', encodeURIComponent(location.href))
          .replace('[[TITLE]]', encodeURIComponent(document.title)),

        title = options.title.replace('[[NAME]]', sharing_data.name);

      sharing_container.insertAdjacentHTML('beforeend',
        `<a href="${url}" class="sharing-links-${sharing_data.class}"
          title="${title}" role="button" tabindex="0">
          <span>${title}</span>
        </a>`
      );

      sharing_container.querySelectorAll('a').forEach(lnk => {
        lnk.addEventListener('click', function(e) {
          e.preventDefault();
          let w =450,
            h=500,
            t = window.top.outerHeight / 2 + window.top.screenY - ( h / 2),
            l = window.top.outerWidth / 2 + window.top.screenX - ( w / 2);
          window.open(this.href, 'sharing-links',
            `width=${w},height=${h},top=${t},left=${l}` +
            ',menubar=no,location=yes,resizable=yes,scrollbars=yes,status=no'
          );
        }, false);
      });

    });

  });
}
