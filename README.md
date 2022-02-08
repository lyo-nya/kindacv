## My CV template
The time has come to look for the job, so I designed this CV template for myself. It is based on [Jekyll](https://jekyllrb.com/) and uses [Bootstrap 5](https://getbootstrap.com/) to prettify pages. Check out the [result](https://lyo-nya.github.io/kindacv/)!

## Features
**Supports multiple languages.** Currently two are used: English and Russian, with the latter set as default. One can easily configure this template for any other combination of languages though.

**Has two layouts: «fancy» and printable**, with the prior set as default. I find the «fancy» layout attractive and more powerful since it allows to increase readers' attention span and control their read-through flow while being quite unobtrusive. However, it does not fit all the needs. People have different tastes, so random HR might dislike this, and in this case, I need a fallback version, that is completely distraction-free. I call it printable since it was optimized to be printed right from the browser window in the first place.

As **Responsive** as I can get. I tested it with a wide range of display sizes. If I haven't messed anything up, it should look pretty good on both ancient iPhone SE gen 1 and ultra-wide 4k monitor.

## Usage
You can start using my CV as a template in just 4 steps:
1. Fork this repository
2. Put your data into `.yaml` files in `_data/`
3. Change `_config.yaml`, according to your needs
4. Enable GitHub pages in your repository and you are done

You can also serve this website locally, by commenting out
```ruby
gem "github-pages", group: :jekyll_plugins
```
And uncommenting
```ruby
# gem "jekyll", "~> 4.2.1"
# gem "webrick"
```
Notice, that in this case, you will need to install gems locally with `bundle install`, after that just run `jekyll serve` and voilá!

## Configuration
As I mentioned, most configurations are done within `_data/` and `_config.yaml`. Let's start with the latter one.

It is the default configuration file for Jekyll. Variables `domain`, `url` and `baseurl` are set according to GitHub pages [manual](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll), and `title` is just a string you want to be displayed on the tab. Notice also the `ga-id`, which stands for [Google Analytics](https://analytics.google.com/analytics/web/#/) id and is used to gather information about visitors.

### Languages listing
The important part of the `_config.yaml` file is the `defaults` entry. Basically, it lists all paths in the root directory, that will be accessible on the resulting website. Those are relative paths, so given that projects root directly into `url + base_url`, `ru/print.md` will eventually become `lyo-nya.github.io/kindacv/ru/print.html`. 

I prefer to keep all the markdown files empty, with just two lines at the beginning, indicating, that they are templates. Notice also, that I never introduce paths to `index.html` files, since this file is assumed by default if no name is given.

To make those empty files the actual HTML pages, I pass them two arguments: `layout` and `lang`. While the first one points to the particular layout within `_layouts/` directory to use, the latter one defines, which data source should be pulled (more on that in [Data](#data-files) section). Alternatively, we could begin each `print.md` file with 
```
---
layout: print
lang: <lang>
---
```
to achieve the same result, but I think my approach, which is more «centralized» is also more robust.

#### Add/Remove language
Basically, to add a language, one needs to:
1. Add items to the defaults list. Suppose, I decided to add French, then the following code should be inserted into `_config.yaml`:
```yaml
-
  scope:
    path: "fr"
  values:
    layout: "fancy"
    lang: "fr"
-
  scope: 
    path: "fr/print.md"
  values:
    layout: "print"
    lang: "fr"
```
2. Also, for pages to compile, markdown files should exist. They can be created with 
```sh
mkdir fr
echo "---\n---" > fr/index.md
echo "---\n---" > fr/print.md
```
To remove a language, one can simply do the reverse of step 1.

Observe, that even though `lyo-nya.github.io/kindacv/fr/print.html` is accessible now, the only information it shows is the contacts list. This is the expected behavior since we never provided any data in French.

### Data files
Now it's time to proceed to the main source, one probably will modify &mdash; data files. As expected, they are located in `_data/` directory. Here is a tree representation of this folder:
```
├── empty
│  ├── education.yaml
│  ├── jobs.yaml
│  ├── publications.yaml
│  └── title.yaml
├── en
│  ├── education.yaml
│  ├── jobs.yaml
│  ├── publications.yaml
│  └── title.yaml
├── ru
│  ├── education.yaml
│  ├── jobs.yaml
│  ├── publications.yaml
│  └── title.yaml
└── contacts.yaml
```
Notice, that data is organized in a way, that is similar to markdowns: one folder for each language, both containing identically named files. The folder called `empty` is structured similarly to language ones since it's a template.

If you happen to open a demo website, you might very well notice, that those files correspond to 4 sections of the CV template. That is true, except for `title.yaml`, it also contains language-specific `section_names` dictionary. In this dictionary, keys correspond to section ids, which are also used to name files in `_includes/` directory. Values, on the other hand, are just labels, that will be shown on web pages.

One could easily recognize that `contacts.yml`, is a sort of universal data entry, that is language-invariant. For now, it only includes email, telegram, and GitHub, but this list can be extended.
> Note: Adding another contact item would require editing `_includes/whoami.html`, which is discussed in [Customizing layouts](#customizing-layouts) section.

#### Add/Remove data
Let's get back to adding the French version for CV. As I mentioned above, when we edited `_config.yaml`, we pass new entries to the `defaults` list, each containing `lang` variable, that points to the data source.

Eventually, Jekyll reads all the content of the `_data/` into `site.data` dictionary, the keys of which are basenames of files/directories, so if we were to access the education data in Russian, we would use `site.data.ru.education` (read more about it in [Jekyll manual](https://jekyllrb.com/docs/datafiles/)).

So for French CV to work as expected, `site.data.fr` should exist and contain `education`, `jobs`, `publications`, and `title` entries. For that, the corresponding folder and files within it should be created. Long story short, it can be done with the following command.
```
cp -r _data/empty _data/fr
```

After that, `cd` into `fr` folder and add all the info about yourself.

It's even easier to remove some data, just delete files/folders/lines you don't need anymore. Alternatively, if one needs to disable the language without deleting data files, it can be done with `_config.yaml`, this will make Jekyll ignore the respective data path on the compilation stage.

## Layouts
There are two layouts, associated with files within `_layouts/` folder. These `.html` files are entry points for page generation procedure and serve as templates. They are written with [Liquid](https://shopify.github.io/liquid/) templating language, that Jekyll uses.

### «Fancy» layout
This layout extensively utilizes `_includes/` folder, which is the default path for the `include` directive in Jekyll. Let's take a look at it:
```
├── elements
│  ├── accordion_item.html
│  ├── body.html
│  ├── card.html
│  └── carousel.html
├── education.html
├── jobs.html
├── publications.html
└── whoami.html
```
Files within the `elements` folder act like functions &mdash; they are templates, that expect some input on include. If we take a closer look at `_layouts/fancy.html`, we will easily find out, that the only thing it does, apart from importing styles and scripts, is
```
{% include elements/body.html %}
```
When this `elements/body.html` function is executed, it sets container, parses the list of sections from `_data/<language>/title.yaml` iterates over them, and runs
```
{% include elements/accordion_item.html id=id header=header %}
```
on each iteration.

As one may guess, `accordion_item` is just another name for the collapsible section.
Since sections structure might differ, `accordion_item.html` just sets header and includes a file from `_includes/` with given `id`, without any parameters:
```
{% include {{include.id}}.html %}
```

This is the reason, why keys of `section_names` from `_data/<language>/title.yaml` and file names in `_includes/` should be the same. When accessing data elements, each section also assumes, that the corresponding file has the same basename.

All section files, except for `whoami.html` perform the same actions. First, they pull required data and pass it to `elments/carousel.html`. Carousel (horizontal slideshow), then, iterates through data items and feeds each into of them `elements/card.html`. The reason, why `whoami.html` does not invoke carousel is that it has only one item, which is the title page, so it directly calls `elements/card.html`.
### Print layout
Contrary to a well-organized «fancy» layout, the print layout is just a plain `.html` file, that is fairly hard to modify yet. On the other hand, everything one has to know about it to be able to customize is template location: `_layouts/print.html`


### Customizing layouts
There are 2 customization options available:
1. Edit `.html` files in `_layouts/` or `_includes/`. For example, you can increase the titles' font size for sections in the «fancy» layout by changing `fs-2` to `fs-1` in button class definition in `_includes/accordion_item.html`.
2. Edit `.scss` files in `_sass/` folder. I don't recommend editing files `/assets/css/`, since their only purpose in life is to import from `_sass/`. Note that any modification to bootstrap variables should be made in `bootstrap-vars.scss`, otherwise, they will be overwritten by default values.
#### Render new data 
Suppose, I decided to extend the list of my contacts and add my account on twitch. First, I will add
```yaml
twitch-id: lyo-nya # Not real account
```
For it to render, I now need to edit `_includes/whoami.html` by adding something like
```html
<a
  href="https://twitch.tv/{{ site.data.contacts.twitch-id }}"
  class="btn"
> My twitch accont </a> 
```

Things become much more complicated if I decided to add a new section to my CV or remove an existing one.
In this case, I would have to edit `assets/js/full-height-collapsibles.js`, which resizes accordion items, assuming there are 4 of them. Apart from that, these items are initially sized in `_sass/base.scss`, which should also be modified. Finally, I cannot guarantee, that all the page contents will remain responsive.


## TODO
  - [ ] Decompose `print.html`, so that it is easily modifiable
  - [ ] Navigate between accordion items with up/down arrow keys

