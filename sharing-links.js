// sharing urls from https://gist.github.com/apisandipas/74d396c7853b93f5f861091a2135d527
// https://github.com/bradvin/social-share-urls

const sharing_container_class = 'sharing-links',
  sharing_items = {
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
    preview: true,
    url: null,
    remove_url_parameters: []
  };

export function create_sharing_links (container, options = {}) {

  options = Object.assign({}, default_options, options);

  if(!container.classList.contains(sharing_container_class)) {
    container.classList.add(sharing_container_class);
  }

  let size = (container.dataset.size? container.dataset.size : options.size).toLowerCase();

  if(size !== 'std') {
    container.classList.add(`sharing-links-${size}`);
  }


  if( options.share_icon ) {
    container.insertAdjacentHTML('beforeend',
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

    let shared_url = location.href;
    if(options.url !== null) {
      shared_url = options.url;
    }
    if(container.dataset.url !== undefined) {
      shared_url = container.dataset.url;
    }

    if(options.remove_url_parameters.length) {
      let url_obj = new URL(shared_url);

      options.remove_url_parameters.forEach(p => {
        url_obj.searchParams.delete(p);
      });

      shared_url = url_obj.toString();
    }

    let url = sharing_data.url
        .replace('[[URL]]', encodeURIComponent(shared_url))
        .replace('[[TITLE]]', encodeURIComponent(document.title))
        .replace('[[PREVIEW]]', options.preview? 'true' : 'false'),

      title = options.title.replace('[[NAME]]', sharing_data.name);

    container.insertAdjacentHTML('beforeend',
      `<a href="${url}" class="sharing-links-${sharing_data.class}"
        title="${title}" role="button" tabindex="0">
        <span>${title}</span>
      </a>`
    );

    container.querySelectorAll('a').forEach(lnk => {
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
}

export default function (options = {}) {

  document.querySelectorAll(`.${sharing_container_class}`).forEach(sharing_container => {
    create_sharing_links(sharing_container, options);
  });
}
