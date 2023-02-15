# Metadata elements

## Index

- [Metadata elements](#metadata-elements)
  - [Index](#index)
  - [SEO (Search Engine Optimization)](#seo-search-engine-optimization)
    - [Navigational search](#navigational-search)
    - [Informational search](#informational-search)
    - [Transactional search](#transactional-search)
  - [Meta Tag](#meta-tag)
    - [Syntax](#syntax)
    - [Attribute `name`](#attribute-name)
    - [Attribute `http-equiv` (HTTP equivalent of the meta tag)](#attribute-http-equiv-http-equivalent-of-the-meta-tag)
    - [Attribute `property` (Open Graph protocol)](#attribute-property-open-graph-protocol)
    - [Attribute `content` (Used for every meta tag, except `charset`)](#attribute-content-used-for-every-meta-tag-except-charset)
    - [Atribute `charset` (Character set of the meta tag)](#atribute-charset-character-set-of-the-meta-tag)
  - [Tips when using meta tags](#tips-when-using-meta-tags)
    - [Keep it short and concise](#keep-it-short-and-concise)
    - [Use the right keywords](#use-the-right-keywords)
    - [Avoid usage of refresh for redirection](#avoid-usage-of-refresh-for-redirection)
    - [Do not abuse meta tags](#do-not-abuse-meta-tags)
    - [On Google, they don't exist](#on-google-they-dont-exist)

## SEO (Search Engine Optimization)

Optimizing a website for search engines, so that it appears in the first results.

### Navigational search

- User knows the website he wants to visit, but does not know the exact URL.
- Search by use of keywords.

### Informational search

- User does not know the website he wants to visit.
- He is looking for information, without a clear intention.
- Your ranking will be important in this case.

### Transactional search

- User wants to make a transaction, like buying a product.
- Really useful for e-commerce websites.

## Meta Tag

### Syntax

~~~html
<meta name="..." content="...">
<meta http-equiv="..." content="..." >
<meta property="..." content="..." >
<meta charset="..." >
~~~

- [Docs for Google meta tags](https://support.google.com/webmasters/answer/79812?hl=en)

### Attribute `name`

When used in the meta tag, it is meant to be used by search engines.

- `author`: Author of the document.

    ~~~html
    <meta name="author" content="John Doe">
    ~~~

- `copyright`: Copyright of the document.

    ~~~html
    <meta name="copyright" content="John Doe">
    ~~~

- `description` or `DC.Description`: Description of the document.

    ~~~html
    <meta name="description" content="This is a description of the document">
    ~~~

- `keywords` or `DC.Subject`: Keywords of the document.

    ~~~html
    <meta name="keywords" content="keyword1, keyword2, keyword3">
    ~~~

- `robots`: Index info for search robots.

    ~~~html
    <meta name="robots" content="index, follow">
    ~~~

  - `All`: Index and follow the links in the page.
  - `Index`: Index the page.
  - `Follow`: Follow the links in the page.
  - `NoIndex`: Do not index the page.
  - `NoFollow`: Do not follow the links in the page.
  - `None`: Do not index and do not follow the links in the page.
  - `NoArchive`: Do not archive the page. (Google only)

- `GoogleBot`: Indicate to Google you don't want your page to be indexed.

    ~~~html
    <meta name="GoogleBot" content="NoIndex">
    ~~~

- `rating`: Age restriction of the document.

    ~~~html
    <meta name="rating" content="General">
    ~~~

  - `General`: General audience.
  - `Mature`: Mature audience.
  - `14 years`: 14 years audience.
  - `Restricted`: Restricted audience.
  - `Safe for kids`: Safe for kids.

- `DC.Creator`: Creator of the document.

    ~~~html
    <meta name="DC.Creator" content="John Doe">
    ~~~

- `DC.Creator.Address`: Address of the creator of the document.

    ~~~html
    <meta name="DC.Creator.Address" content="John Doe">
    ~~~

- `DC.Publisher`: Organization responsible for the document.

    ~~~html
    <meta name="DC.Publisher" content="John Doe">
    ~~~

- `DC.Custodian`: Responsible for the document.

    ~~~html
    <meta name="DC.Custodian" content="John Doe">
    ~~~

- `DC.Date.Created`: Date of creation of the document.

    ~~~html
    <meta name="DC.Date.Created" content="John Doe">
    ~~~

- `DC.Date.Modified`: Date of modification of the document.

    ~~~html
    <meta name="DC.Date.Modified" content="John Doe">
    ~~~

- `DC.Identifier`: URL of the document.

    ~~~html
    <meta name="DC.Identifier" content="John Doe">
    ~~~

- `DC.Format`: Format of the document.

    ~~~html
    <meta name="DC.Format" content="John Doe">
    ~~~

  - `Text/HTML`: HTML document.
  - `Image/GIF`: GIF image.
  - `Image/JPEG`: JPEG image.
  - `Video/QuickTime`: Quick time video.

### Attribute `http-equiv` (HTTP equivalent of the meta tag)

When used in the meta tag, it is meant to be used by browsers.

- `cache-control`: Cache control of the document.

    ~~~html
    <meta http-equiv="cache-control" content="no-cache">
    ~~~

  - `public`: Can be used by all users of the browser.
  - `private`: Can be used only by one user of the browser.
  - `no-cache`: Do not cache the document.
  - `no-store`: Do not store the document, but a temporary cache is made.

    > **Note:** This is a new way to do it. To make sure it works, use `Pragma` too.

- `pragma no-cache`: Do not cache the document.

    ~~~html
    <meta http-equiv="pragma" content="no-cache">
    ~~~

    > **Note:** This is an old way to do it. To make sure it works, use `Cache-Control` too.

- `content-language`: Indicates all languages used in the document.

    ~~~html
    <meta http-equiv="content-language" content="fr, pt-BR, en-US, it">
    ~~~

- `expires`: Date of expiration of the document. Must specify date and time.

    ~~~html
    <meta http-equiv="expires" content="wed, 21 oct 2015 07:28:00 gmt">
    ~~~

    > **Note:** A value of `-1` means the document will never expire and `0` means it will expire immediately, so take care when using this.

- `refresh`: Refresh the document after a certain amount of time.

    ~~~html
    <meta http-equiv="refresh" content="50; url=http://www.google.com">
    <!-- or -->
    <meta http-equiv="refresh" content="50">
    ~~~

    > **Note:** The first value is the time in seconds, and the second is the URL to redirect to.

- `imageToolbar`: On internet explorer, this will disable the options bar that appears when you mouse over an image.

    ~~~html
    <meta http-equiv="imageToolbar" content="no">
    ~~~

- `content-script-type`: Used to define the type of script language of the document.

    ~~~html
    <meta http-equiv="content-script-type" content="text/javascript">
    ~~~

- `content-style-type`: Used to define the type of style language of the document.

    ~~~html
    <meta http-equiv="content-style-type" content="text/css">
    ~~~

### Attribute `property` (Open Graph protocol)

  When used in the meta tag, it is meant to be used by social networks. It enables any website to become a rich object in a social graph, and it is used by Facebook, Google+, Twitter, LinkedIn, and many others. So when someone links your website in a social network, it will show a little preview object for it, withe the open graph tags you specified.

- `og:title`: Title of the document.

    ~~~html
    <meta property="og:title" content="Title of the document">
    ~~~

- `og:image`: Image of the document.

    ~~~html
    <meta property="og:image" content="http://www.example.com/image.jpg">
    ~~~

- `og:url`: URL of the document.

    ~~~html
    <meta property="og:url" content="http://www.example.com">
    ~~~

- `og:type`: Type of the document.

    ~~~html
    <meta property="og:type" content="website">
    ~~~

  - `website`: Website.
  - `article`: Article.
  - `blog`: Blog.
  - `book`: Book.
  - `business.business`: Business.
  - `fitness.course`: Fitness course.
  - `game`: Game.
  - `music`: Music.
  - `music.song`: Song.
  - `music.album`: Album.
  - `music.playlist`: Playlist.
  - `music.radio_station`: Radio station.
  - `music.other`: Other music.
  - `place`: Place.
  - `product`: Product.
  - `product.group`: Product group.
  - `product.item`: Product item.
  - `profile`: Profile.
  - `restaurant.restaurant`: Restaurant.
  - `bar.bar`: Bar.
  - `cafe.cafe`: Cafe.
  - `hotel.hotel`: Hotel.
  - `cause`: Cause.
  - `sport`: Sport.
  - `sports_league`: Sports league.
  - `sports_team`: Sports team.
  - `video`: Video.
  - `video.movie`: Movie.
  - `video.episode`: Episode.
  - `video.tv_show`: TV show.
  - `video.other`: Other video.

- `og:description`: Description of the document.

    ~~~html
    <meta property="og:description" content="Short description of the document to draw attention">
    ~~~

### Attribute `content` (Used for every meta tag, except `charset`)

It is used to define the content of the meta tag, like the name of the author, the description of the document, and so on, like shown in the examples above.

### Atribute `charset` (Character set of the meta tag)

It is used to define the character set of the document. It is used only once, and it must be the first meta tag in the document. It allows the browser to know what character set the document is using, so it can display correctly any special characters. `UTF-8`, or UNICODE, is the most used character set, because it supports all characters sets.

~~~html
<meta charset="utf-8">
~~~

## Tips when using meta tags

### Keep it short and concise

Too long descriptions and excessive keywords will make the search engines ignore your meta tags. So keep it short and concise. Your website can even be penalized for `metatag spamming`, when keywords are repeated too many times.

### Use the right keywords

Only the most relevant keywords should be used.

### Avoid usage of refresh for redirection

It tends to confuse the databases of indexing engines, and the user too, especially accessibility users.

### Do not abuse meta tags

Their abuse can be noticed by the search engines, and it can even make your website be penalized.

### On Google, they don't exist

It indexes the content of the page, not the meta tags, because of the `metatag spamming` problem.
