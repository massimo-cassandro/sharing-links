# m-sharing

**A quick and customizable sharing links builder** 
(Massimo Cassandro, 2020)

Demo: <https://massimo-cassandro.github.io/m-sharing/test>

**m-sharing** is an ultra-light and easily customizable tool to add sharing links to a web page.

The sum of css and js sizes is about 6.5 - 7 kb, and **less than 3 kb** if gzipped.

## Installation

You can add *m-sharing* to your project using npm:

```shell
npm i --save m-sharing
```

As a dependency package, my [m-utilities](https://github.com/massimo-cassandro/m-utilities) will be installed too.

## Setup

First, you need to add the required [Open Graph](https://ogp.me/) tags to your page, you can use an online tool to configure them, such as <https://metatags.io/>.


Then, to activate *m-sharing* you have to:

* add an `.m-sharing` element in the position you would like the sharing buttons to be displayed:

```html
<div class="m-sharing"></div>
```

* import the js module defining, at least, the buttons you need to activate:

```js
import m_sharing from '/path/to/m-sharing.js';

(() => {
  'use strict';
  m_sharing({
    sharing: ['fb', 'twt', 'linkedin', 'wa'],
  });
})();
```

* import the `_m-sharing.scss` file in your sass file, customizing some parameter if needed (alternatively, you can use the compiled css file located in the test directory):

```scss
$m-sharing-justify-content: flex-end;
@import 'path/to/m-sharing';
```

You can have multiple sets of sharing buttons on the same page (all with the same configuration) by simply adding multiple `.m-sharing` elements.

Check out <https://massimo-cassandro.github.io/m-sharing/test> and the files within the test directory for a live example.


### JS setup

*m-sharing* must be imported as a module and therefore explicitly invoked, setting the list of desired sharing buttons via the `sharing` parameter (empty array by default).

The insertion order determines the display order. For example, if you only need Twitter and Facebook, and you want Twitter to be the first, you have to write:

```js
m_sharing({
    sharing: ['twt', 'fb']
});
```

Actually, four sharing links are availble: Twitter, Facebook, Linkedin and Whatsapp. 

I'm planning to add more sharing links (see **Todo** paragraph at the end of readme), but pull requests would be appreciated (otherwise you can ask for them posting an issue).

You can use both full name or shortcuts for sharing items:

* `fb` or `facebook`
* `lnk` or `lnkd` or `linkedin`
* `tw` or `twt` or `twitter`
* `wa` or `whatsapp`

Sharing item strings are case insensitive.

Two other parameters can be set:

* `title`: the string used for the title attribute of the` <a> `tag. It must contain the placeholder `[[NAME]]` which will be replaced with the name of the share link. The default is "Condividi su [[NAME]]" (Italian).

* `size`: sets the size of the share buttons. You can choose between `std` (default) or` small`. The dimensions of each dimension can be set in the scss file (see below).

If you want to have multiple sets of buttons with different sizes on the same page, you can set the size of each through the `data-size` attribute:

```html
<!-- use the dimension defined in the `size` parameter -->
<div class="m-sharing"></div> 


<!-- force to use the 'small' size -->
<div class="m-sharing" data-size="small"></div> 
```

Summing up:

* if you doesn't define any size parameter the default one (std) will be used
* if you define a `size` parameter while invoking the function, it will be used in all istances of `.m-sharing` elements
* if there is a `data-size` attribute (and its value exists in the CSS) the concerned element (and only that) will be sized accordingly.

In addition, you can add custom sizes to your css, see the next section for details.


**A complete example:**

```js
import m_sharing from 'path/to/m-sharing.js';

(() => {
  'use strict';
  m_sharing({
    sharing: ['twt', 'fb', 'linkedin', 'WA'],
    title: 'Share on [[NAME]]',
    size: 'std'
  });
})();
```

### SCSS setup

As a basic setup, you'll only need to import the `_m-sharing.scss` file:

```scss
@import 'path/to/m-sharing';
```

But to customize your buttons, you have to change the values of some scss variables:

**$m-sharing-items**

This parameter allows to change color and icons of sharing buttons:

```scss
$m-sharing-items: (
  fb: (
    bg: #39579a,
    fg: #fff,
    icon: $m-sharing-facebook
  ),
  twt: (
    bg: #1da1f2,
    fg: #fff,
    icon: $m-sharing-twitter
  ),
  lnkd: (
    bg: #006699,
    fg: #fff,
    icon: $m-sharing-linkedin
  ),
  wa: (
    bg: #25d466,
    fg: #fff,
    icon: $m-sharing-whatsapp
  )
);
```

You can change the background (`bg`) and foreground (`fg`) color of each button or set a different svg icon, and also completely remove unused items to reduce the size of your css.

**$m-sharing-sizes**

This variable allows you to change the dimension of predefined sizes:

```scss
$m-sharing-sizes: (
  std: 42px,
  small: 28px
);
```

You can also remove the `small` size (the `std` one is required) or add new ones.

In the [test page](https://massimo-cassandro.github.io/m-sharing/test) you can find two more sizes besides the default ones:

```scss
$m-sharing-sizes: (
  std: 42px,
  small: 28px,
  big: 54px,
  xl: 4rem
);
```

**$m-sharing-justify-content**

*m-sharing* uses flexbox to display the buttons. They are centered by default, but you can change this setting thru the `$m-sharing-justify-content` variable:

```scss
$m-sharing-justify-content: center;
```


## Tools and references

* <https://ogp.me/>
* <https://metatags.io/>
* <https://developers.facebook.com/docs/workplace/sharing/share-dialog>
* <https://www.linkedin.com/post-inspector/inspect/>
* <https://cards-dev.twitter.com/validator>
* <https://developers.facebook.com/tools/debug/>
* <https://gist.github.com/apisandipas/74d396c7853b93f5f861091a2135d527>
* <https://codebeautify.org/share-link-generator>
* <https://www.websiteplanet.com/it/webtools/sharelink/>


## Todo
* slack
* copy link
* Telegram
* mail
