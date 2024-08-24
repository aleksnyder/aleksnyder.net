---
title:  "Moving from Grav to Hugo"
description: Exploring why I moved from Grav to Hugo with the site redesign and how I utilized Hugo.
excerpt: Exploring why I moved from Grav to Hugo with the site redesign and how I utilized Hugo.
toc: true
tags:
  - Go
  - Hugo
socialShareImage: https://www.aleksnyder.net/img/social-images/moving-from-grav-to-hugo.png
date: 2022-07-17
publishdate: 2022-07-17
---

Recently I re-launched my portfolio to have a greater focus on content, performance, and automation.  One of the benefits of having a portfolio is being able to experiment and try solutions too risky for client sites.  My goal for this redesign was to explore new web technologies while ensuring an optimal reading experience on all devices.  Most of this redesign effort was spent migrating from Grav to Hugo.

{{< h2 >}}Why Move from Grav?{{< /h2 >}}

[Grav](https://learn.getgrav.org/17) is sometimes described as a "static site generator".  At least it was when I was originally looking for CMS options.  That description is what drew me to use it after Jekyll.  After using Grav for a couple of years, it seems more like a dynamic CMS which serves HTML using PHP (which is how their website describes itself).

Which brings me to my first reason for moving away from Grav: Grav is not a static site generator.  Personally, I prefer content to be served as HTML instead of by the server.  At least for simple sites or small sites.  Performance is a very important part of the user's experience and I'd like to squeeze every last millisecond of performance from whichever tool builds the site.

Secondly, Grav is built with PHP.  Nothing against PHP.  It's a great language with a lot of undeserved vitriol by people who are repeat complaints about the language before version 5.3 (those people shoudld try PHP 8.1).  PHP has improved significantly since then and continues to add features/improvements with each new version.  My reason for not wanting to use PHP this time around was because I've used PHP at work for nearly every site since 2013.  I just wanted to use something different.

Lastly, Grav has a confusing folder structure with too many levels.  Sometimes my twig templates would be 6 or 7 levels from the root of the project. Partly my fault based on how I organize folders but there's at least 4 levels before hitting the theme's templates directory. That's a lot of expanded folders in the Explorer pane of my code editor.  Before Grav I used Jekyll and I liked how all the important folders were at the first level of the project root.  I missed that folder structure and it's one of the reason why I moved to Hugo.

{{< h2 >}}Why Hugo?{{< /h2 >}}

Hugo is a static site generator built on Go.  Hugo is very fast and works great for small sites.

Similar to Jekyll, Hugo has a simpler folder structure than Grav where the important folders are on the first level of the project root.  Plus, the folders Hugo uses to compile are self explanatory.  Content goes into `/content`, templates go into `/layouts`, and images/files go into `/static`.  Pretty simple.  These top-level folders generate static HTML into the `/public` directory and quickly.

Part of the reason Hugo is so fast is because it's built with Go.  Content compilation normally takes less than a second.  After the content is compiled, there's no further burden on the server.  All content is now ready for users to read.  As an added benefit, Hugo being built with Go gives me an additional chance to use and learn the language.

One of the ways I can use Hugo to learn Go is shortcodes.  Grav required a custom plugin to add functionality when creating or editing markdown.  Hugo uses shortcodes which can look for certain keywords and replace those keywords (and the text within them) as rendered HTML.  Shortcodes are much more straightforward to me than creating plugins.

Take a look at all [the steps](https://learn.getgrav.org/17/plugins/plugin-tutorial) necessary to create a plugin in Grav.  Hugo just need a template (or HTML file) in the `/layouts/shortcodes` like the code below.  Interesting enough, the code block below is a shortcode too.

{{< prism html >}}
  {{ $anchorized := anchorize .Inner }}

  <a name="{{ $anchorized }}" tabindex="-1"></a>
  <h2 id="{{ $anchorized }}">{{ .Inner }}<a class="named-anchor" href="#{{ $anchorized }}">#</a></h2>
{{< /prism >}}

In order to use this shortcode, I created a HTML file at `/layouts/shortcodes/h2.html`, added the code above, and then call the shortcode in my markdown files like so:

{{< prism html >}}
  {{< h2 >}}Why Hugo?{{< /h2 >}}
{{< /prism >}}

This shortcode adds an anchor link to the end the heading.

{{< h2 >}}Enhancing the Content Creation Experience{{< /h2 >}}

In the previous section, I detailed the "h2" shortcode used for adding anchor links to the end of those heading.  I try to avoid HTML in markdown files wherever I can.  How do I allow HTML or other components, not included in Markdown or Hugo, to be used without adding HTML to the file?  Shortcodes obviously.

### Add Prism to Code Blocks
For code blocks it's nice to have syntax highlighting based on which language the code inside the block is using.  This site uses [Prism](https://prismjs.com) for its syntax highlighting.  The `prism` shortcode highlights parts of the code block based on the language parameter passed in the shortcode declaration. The code block below uses the "prism" shortcode with JavaScript syntax highlighting.

{{< prism javascript >}}
  "custom": [
    "includes"
  ]
{{< /prism >}}

Plus, I added a nice, accessible "Copy to Clipboard" button for anyone who wanted to use the code elsewhere.

### Device Screenshots
If I wanted to display an image or screenshot of a site or app in a specific device, I can use the "custom" screenshot shortcode.
{{< prism html >}}
  {{ screenshot src="apprenticeship.jpg" alt="Apprenticeship.gov homepage in a browser" }}
{{< /prism >}}

The shortcode above outputs the following code:
{{< prism html >}}
  <section class="project__screenshot container-breakout">
    <div class="browser-mockup preview-screen__content__mockup">
        <div class="browser-mockup__header">
            <div class="browser-mockup__header__button"></div>
            <div class="browser-mockup__header__button"></div>
            <div class="browser-mockup__header__button"></div>
        </div>
        <div class="device__content__image">
            <img sizes="(min-width: 35em) 1200px, 100vw" srcset="
                /works/apprenticeship-gov/apprenticeship_hu96e8d0042883d014fda3038c546620cd_197802_800x0_resize_q75_box.jpg 800w,
                /works/apprenticeship-gov/apprenticeship_hu96e8d0042883d014fda3038c546620cd_197802_1200x0_resize_q75_box.jpg 1200w,
                /works/apprenticeship-gov/apprenticeship_hu96e8d0042883d014fda3038c546620cd_197802_1920x0_resize_q75_box.jpg 1920w" src="/works/apprenticeship-gov/apprenticeship_hu96e8d0042883d014fda3038c546620cd_197802_1200x0_resize_q75_box.jpg" loading="lazy" alt="Apprenticeship.gov homepage in a browser">
        </div>
    </div>
  </section>
{{< /prism >}}

{{< h2 >}}Automating Parts of the Site{{< /h2 >}}
Redesigning a site is a good time to look at what tedious or repetitive tasks can be automated.

### Generate Open Graph Images
Recently sites [like Github](https://github.blog/2021-06-22-framework-building-open-graph-images/) have been adding a title onto an image template for the images shared on social media.  In case people reading my posts wanting to share, I created my own share image template. 

{{< image src="img/keep-a-bragdoc.png" alt="Social share image example" caption="Social Share Image generated for the 'Keep a Bragdoc' blog post.">}}

A Playwright script looks at the blog post, pulls the title, places the new title on a svg template, and then saves the social share image as a PNG file.

### Deploy to Server After Merge
In the past, my portfolio deployments were a manual process.  I would push code to some version control system, check the code, merge it, log into the server, navigate to the server destination of the web root, pull the main branch down to the server, compile the code, and finally refresh the site.  This time around I wanted to push the code and forget it.

In order to accomplish this process, I configured a pipeline in this site's version control system to check the code for inconsistencies, compile the static site, deploy the code to the server using a shell script and SSH, and then notify me via email the result of the deployment.  Any error thrown during the deployment would stop the deployment and sent me an email with the reason for the failure.

{{< h2 >}}Future Plans{{< /h2 >}}
A lot of work went into this redesign but there's always something new to try.  Here's what I'm looking at next:
* Generate screenshots from a script
* ~~Use CSS clamp() for font sizes~~
* Use CSS variables over SASS variables
* Write some case studies on previous projects
* Add some micro-animations
* Add share links using the Social Share API
