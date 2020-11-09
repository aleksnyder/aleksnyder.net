---
title:  "Conditionally Load Stylesheets in IE11"
description: A neat trick to load stylesheets only for IE11.
excerpt: A neat trick to load stylesheets only for Internet Explorer 11.
tags:
  - TIL
  - CSS
  - Quick Tip
date: 2020-07-26
publishdate: 2020-07-26
---

Ever had a client ask for a new, modern site but require compatibility with Internet Explorer (IE) 11?  Seems counterintuitive but believe me they're out there.  Usually these sorts of people are constrained by their company or organization to support a browser [even Microsoft recommends against using](https://techcommunity.microsoft.com/t5/windows-it-pro-blog/the-perils-of-using-internet-explorer-as-your-default-browser/ba-p/331732).

How would you handle applying a fix to the inevitable visual bug in IE?  In the past, there was a really simple way to only load certain files or content in IE.  For whatever reason Microsoft decided to remove this helpful condition.  Look how easy it used to be:

{{< prism html >}}
  &lt;!--[if IE]&gt;
    &lt;link href=&quot;/path/to/ie.css&quot; rel=&quot;stylesheet&quot; /&gt;
	  &lt;p&gt;Only people using IE see this message.&lt;/p&gt;
  &lt;![endif]--&gt;
{{< /prism >}}

Internet Explorer 11 doesn't support the conditional tag any longer. Luckily, there's a handy CSS media query to target Internet Explorer 11:

{{< prism css >}}
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      // IE-specific styles here
  }
{{< /prism >}}

What if you wanted your main stylesheet clean of any IE related code?  You can't use the conditonal comment since Microsoft removed it.  User agents can be spoofed.  What do you use?  Recently I was looking at the MDN for clarification on the preload attribute for the [link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) tag.  I noticed an attribute I've only used for loading print stylesheets. Enter the `<link>` tag's `media` attribute.  The `media` attribute will load any file referenced in the `href` attribute of the `<link>` tag which matches the specified media query.  If we wanted to load a specific stylesheet for devices with a screen size below 600px, we would add the following snippet inside the `<head>` tag of the page:

{{< prism bash >}}
  &lt;link href=&quot;mobile.css&quot; rel=&quot;stylesheet&quot; media=&quot;screen and (max-width: 600px)&quot;&gt;
{{< /prism >}}

Now, we can use this discovery to load a stylesheet only for IE 11:

{{< prism bash >}}
  &lt;link href=&quot;/path/to/ie.css&quot; rel=&quot;stylesheet&quot; media=&quot;all and (-ms-high-contrast: none), (-ms-high-contrast: active)&quot;&gt;
{{< /prism >}}

That's it!  Not exactly the same as the conditional comment block; but at least you can load a separate stylesheet for IE users.
