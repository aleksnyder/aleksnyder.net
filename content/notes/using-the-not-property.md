---
title:  "Using the :not() property"
description: Why you should already be using the :not() CSS psuedoclass when writing CSS.
excerpt: When building a site, a designer or developer usually runs into a situation where a element needs certain styling but other elements do not.  This could be anything from bottom padding to borders.  Usually the designer or developer would write CSS for the one element and then additional CSS for the other elements.  Which is fine; but over time this adds many lines of CSS to your code base and increases page load time.  Surely there's a better way right?
categories: blog
tags:
- css
- sass
taxonomy:
    tag: [css, sass]
date: 2017-06-25
publishdate: 2017-06-25
---

When building a site, a designer or developer usually runs into a situation where an element needs certain styling but other elements do not.  This could be anything from bottom padding to borders.  Usually the designer or developer would write CSS for the one element and then additional CSS for the other elements.  Which is fine; but over time this adds many lines of CSS to your code base and increases page load time.  Surely there's a better way right?  There is and you should be using the `:not()` CSS psudo class wherever possible.

## Introducing :not()

The `:not()` psuedoclass is incredibly useful and easy to use.  It's used similarly to jQuery's [.not()](http://api.jquery.com/not/) function.  Basically, any CSS element that does not match what's inside the psuedoclass' parenthesis will be styled.

{{< prism css >}}
.posts > .post:not(:last-child) {
  border-bottom: 1px solid #ccc;
}
{{< /prism >}}

In the example above, I'm adding a border to the bottom of each `.post` element except the last child of the parent `.posts` element.  You're not limited to other psuedoclass either.  You could use HTML elements like `p` or other classes such as `.selected` as conditions too.

Without the `:not()` psuedoclass more lines of code would be needed.  Also, a small fraction of rendering time would be needed to overwrite already existing styles with removing the bottom border.

{{< prism css >}}
.posts > .post {
  border-bottom: 1px solid #ccc;
}

.posts > .post:last-child {
  border-bottom: none;
}
{{< /prism >}}

For more information on the `:not()` psuedoclass,  see [MDN's page](https://developer.mozilla.org/en-US/docs/Web/CSS/:not) on the subject.

## More Use Cases of :not()

In this section, I've included more use cases for the `:not()` psuedoclass.  I'll be updating this section periodically to include more examples.

### Hide inactive elements

Say you're trying to hide all other elements except the active element.  Obviously, one could write multiple CSS rules to target active and inactive elements or you could write some CSS hiding any blocks not containing the `.active` class.

{{< prism css >}}
.block:not(.active) {
  display: none;
  visibility: hidden;
}
{{< /prism >}}

I find this snippet of code useful for carousels and slideshows.
