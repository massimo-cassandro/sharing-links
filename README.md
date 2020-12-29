# sharing-links

**A quick and customizable sharing links builder** 
(Massimo Cassandro, 2020)

Demo: <https://massimo-cassandro.github.io/sharing-links/test>

**sharing-links** is an ultra-light and easily customizable tool to add sharing links to a web page.

The sum of css and js sizes is about 6.5 - 7 kb, and **less than 3 kb** if gzipped.

## Installation

You can add *sharing-links* to your project using npm:

```shell
npm i --save @massimo-cassandro/sharing-links
```

As a dependency package, my [m-utilities](https://github.com/massimo-cassandro/m-utilities) will be installed too.

## Setup

First, you need to add the required [Open Graph](https://ogp.me/) tags to your page, you can use an online tool to configure them, such as <https://metatags.io/>.


Then, to activate *sharing-links* you have to:

* add an `.sharing-links` element in the position you would like the sharing buttons to be displayed:

```html
<div class="sharing-links"></div>
```

* import the js module defining, at least, the buttons you need to activate:

```js
import sharing_links from '/path/to/sharing-links.js';

(() => {
  'use strict';
  sharing_links({
    sharing: ['fb', 'twt', 'linkedin', 'wa'],
  });
})();
```

* import the `_sharing-links.scss` file in your sass file, customizing some parameter if needed (alternatively, you can use the compiled css file located in the test directory):

```scss
$sharing-links-justify-content: flex-end;
@import 'path/to/sharing-links';
```

You can have multiple sets of sharing buttons on the same page (all with the same configuration) by simply adding multiple `.sharing-links` elements.

Check out <https://massimo-cassandro.github.io/sharing-links/test> and the files within the test directory for a live example.


### JS setup

*sharing-links* must be imported as a module and therefore explicitly invoked, setting the list of desired sharing buttons via the `sharing` parameter (empty array by default).

The insertion order determines the display order. For example, if you only need Twitter and Facebook, and you want Twitter to be the first, you have to write:

```js
sharing_links({
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
<div class="sharing-links"></div> 


<!-- force to use the 'small' size -->
<div class="sharing-links" data-size="small"></div> 
```

You can also add a classic *share icon* before all otner icons setting the `share_icon` parameter to true (default).

Summing up:

* if you doesn't define any size parameter the default one (std) will be used
* if you define a `size` parameter while invoking the function, it will be used in all istances of `.sharing-links` elements
* if there is a `data-size` attribute (and its value exists in the CSS) the concerned element (and only that) will be sized accordingly.
* add a share icon setting the `share_icon` parameter to true (default)

In addition, you can add custom sizes to your css, see the next section for details.


**A complete example:**

```js
import sharing_links from 'path/to/sharing-links.js';

(() => {
  'use strict';
  sharing_links({
    sharing: ['twt', 'fb', 'linkedin', 'WA', 'skype', 'teams'],
    title: 'Share on [[NAME]]',
    preview: true,
    size: 'std',
    share_icon: true
  });
})();
```

* `preview` (where supported, MS teams only) allows you to specify if url preview must be displayed (default true)

### SCSS setup

As a basic setup, you'll only need to import the `_sharing-links.scss` file:

```scss
@import 'path/to/sharing-links';
```

But to customize your buttons, you have to change the values of some scss variables:

**$sharing-links-items**

This parameter allows to change color and icons of sharing buttons:

```scss
$sharing-links-items: (
  fb: (
    bg: #39579a,
    fg: #fff,
    icon: $sharing-links-facebook
  ),
  twt: (
    bg: #1da1f2,
    fg: #fff,
    icon: $sharing-links-twitter
  ),
  lnkd: (
    bg: #006699,
    fg: #fff,
    icon: $sharing-links-linkedin
  ),
  wa: (
    bg: #25d466,
    fg: #fff,
    icon: $sharing-links-whatsapp
  )
);

$share_icon_fill: #666;

```

You can change the background (`bg`) and foreground (`fg`) color of each button or set a different svg icon, and also completely remove unused items to reduce the size of your css.

If the js `share_icon` parameter is enabled, you can set the share icon color using the` $share_icon_fill` variable. Set it to "false" if you don't need the share icon, to generate a smaller CSS.

This variable has no effect if the js `share_icon` parameter is set to `false`.

**$sharing-links-sizes**

This variable allows you to change the dimension of predefined sizes:

```scss
$sharing-links-sizes: (
  std: 42px,
  small: 28px
);
```

You can also remove the `small` size (the `std` one is required) or add new ones.

In the [test page](https://massimo-cassandro.github.io/sharing-links/test) you can find two more sizes besides the default ones:

```scss
$sharing-links-sizes: (
  std: 42px,
  small: 28px,
  big: 54px,
  xl: 4rem
);
```

**$sharing-links-justify-content**

*sharing-links* uses flexbox to display the buttons. They are centered by default, but you can change this setting thru the `$sharing-links-justify-content` variable:

```scss
$sharing-links-justify-content: center;
```


## Tools and references

* <https://ogp.me/>
* <https://metatags.io/>
* <https://github.com/bradvin/social-share-urls>
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
* LinkedIn has updated its API, here you can see more details: <https://stackoverflow.com/questions/33426752/linkedin-share-post-url/61583095#61583095>
