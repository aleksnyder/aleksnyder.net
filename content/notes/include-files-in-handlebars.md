---
title:  "Include partial templates in Handlebars"
description: Create a custom Handlebars helper to retrieve markup from a partial in KSS Node.
excerpt: Create a custom Handlebars helper to retrieve markup from a partial in KSS Node.
toc: true
tags:
  - JavaScript
  - Handlebars
socialShareImage: https://www.aleksnyder.net/img/social-images/include-files-in-handlebars.png
date: 2022-05-02
publishdate: 2022-05-02
---

Recently at work, we wanted a platform-agnostic way to document our stylesheets.  Whatever we chose had to work with Drupal and React while sharing the same documentation format.  We settled on [kss-node](https://github.com/kss-node/kss-node) because it was easy to read, easy to maintain, and is platform-agnostic.  KSS Node also allows us to choose our templating engine.  We could either choose Twig (which Drupal uses) or Handlesbars (which is more JavaScript friendly).  Nearly all our developers worked with JavaScript; so we chose Handlerbars.

As time went on we started adding html and the comments were becoming longer. Plus, the comments were unable to contain some
documentation we wanted to include such as instructions and guidance with code blocks. We started looking for solutions around the community but none seemed to match our requirements.

Luckily for us KSS Node is very customizable.  The theme, or builder, can be changed to include additional information from the
SASS comments or to render output from helpers.  We decided to use these helpers to retrieve additional documentation or markup from a partial.  These partials could be organized to match our url structure, retrieve markup to display component documentation, and run our existing custom helpers without cluttering our SASS comments too much.

{{< h2 >}}Creating the "includes" Helper{{< /h2 >}}

Now that we had a path forward, we started gathering requirements for this new "includes" helper.

1. Can be used in the SASS comment
2. Extract html markup from a `.hbs` file with a relative path from the main `index.hbs` file
3. Still allow plain text from the description

### Register the Helper
First, we needed to let KSS Node to look for the new helper.  Every builder has a `kss-config.json` file.  This file handles important configuration for your kss-node style guide such as additional stylesheets, title of the site, the location of the homepage file, and the names of custom helper.  Below is the contents of the `kss-config.json` file from the [Michelangelo](https://github.com/JordyPouw/michelangelo) theme.

{{< prism javascript >}}
{
  "title"        : "Michelangelo Styleguide",
  "mask"         : "*.scss",
  "placeholder"  : "[modifier]",

  "//": "relative to this file.",
  "builder"      : "kss_styleguide/custom-template/",
  "source"       : "src/",
  "destination"  : "kss_styleguide/styleguide/",

  "//": "relative to source.",
  "homepage"     : "../kss_styleguide/kss-homepage.md",

  "//": "relative to the generated style guide.",
  "css": [],
  "js" : []
}
{{< /prism >}}

In order to register the custom helper(s), add the "custom" key to the configuration object.

{{< prism javascript >}}
  "custom": [
    "includes"
  ]
{{< /prism >}}

In our case, the custom helper(s) will have custom logic in individual files.  We want these files to be in their own folder for organization reasons.  Underneath the "custom" key, add a new key for "extend".

{{< prism javascript >}}
  "extend": "kss_styleguide/extend",
{{< /prism >}}

This value will designate a folder (relative to the root of the project) for KSS Node to look up these helper files.

The final result including these changes (without the comments) would be:

{{< prism javascript >}}
{
  "title"        : "Michelangelo Styleguide",
  "mask"         : "*.scss",
  "placeholder"  : "[modifier]",
  "builder"      : "kss_styleguide/custom-template/",
  "source"       : "src/",
  "destination"  : "kss_styleguide/styleguide/",
  "homepage"     : "kss_styleguide/kss-homepage.md",
  "custom": [
    "includes"
  ],
  "extend": "kss_styleguide/extend",
  "css": [],
  "js" : []
}
{{< /prism >}}

The styleguide may have to be re-compiled to see changes.

### Create the helper

In the folder designated for extending the styleguide, create a file named `includes.js`.  The filename doesn't have to be the same as the helper's name; but it helps with organization.

{{< prism javascript >}}
const fs = require("fs");
const jsdom = require("jsdom");

module.exports = function (Handlebars) {
  "use strict";

  Handlebars.registerHelper("includes", function(filename) {
    if (typeof filename !== 'undefined') {
      return;
    }

    const cwd = process.cwd();
    const url = `${cwd}/kss_styleguide/${filename}`;
    const includedFiles = fs.readFileSync(url, "utf8");
    const { JSDOM } = jsdom;
    const dom = new JSDOM(includedFiles);
    const domContent = dom.window.document.body.innerHTML;
    const domTemplate = Handlebars.compile(domContent);
    
    return new Handlebars.SafeString(domTemplate({}));
  });
};
{{< /prism >}}

Let's unpack the code block above.

{{< prism javascript >}}
  const fs = require("fs");
  const jsdom = require("jsdom");

  module.exports = function (Handlebars) {
    "use strict";

    Handlebars.registerHelper("includes", function(filename) {
      // Helper code goes here...
    });
  };
{{< /prism >}}

We're requiring the `fs` (filesystem) to find the file based on the passed filename parameter and the `jsdom` node module to access the DOM (Document Object Model) within the file.

Next, we pass Handlebars in the export function.  This function will send the code inside this function to KSS Node the next time the styleguide is compiled.

Inside the export function we register the helper in Handlebars with the name "includes" and pass one parameter for the `filename`.  The next step will explain the code inside the Handlebar's `registerHelper` function.

{{< prism javascript >}}
  const cwd = process.cwd();
  const url = `${cwd}/kss_styleguide/${filename}`;
  const includedFiles = fs.readFileSync(url, "utf8");
{{< /prism >}}

Our build system runs from the root of the project; so we need to retrieve the current working directory using `process.cwd()` to begin building the path to the file we want to retrieve.  Then, we finish building the url with base path of our styleguide (`kss_styleguide` in this example) and the filename passed in the parameter.

Using the `fs` node module's `readFileSync` function, we create a file stream to use with `jsdom`.

{{< prism javascript >}}
  const { JSDOM } = jsdom;
  const dom = new JSDOM(includedFiles);
{{< /prism >}}

Not much here other than initializing JSDOM and passing the `includedFiles` file stream to the JSDOM object.

{{< prism javascript >}}
  const domContent = dom.window.document.body.innerHTML;
  const domTemplate = Handlebars.compile(domContent);
  
  return new Handlebars.SafeString(domTemplate({}));
{{< /prism >}}

Finally, we use JSDOM to pull the HTML from the file.  Handlebars is very picky with markup and how it should be rendered.  We need to tell Handlebars the string of markup is safe; so we use Handlebar's `SafeString` function to tell Handlebars and KSS Node the content is safe to render.  Even with the `SafeString` function we need to compile the markup string first with Handlebar's `compile` function.

### Using the Helper
Now that we've created the helper, we can use it in our main template.  When calling helpers, the name of the helper goes first and then the parameters.

{{< prism javascript >}}
  {{ includes path/to/partial.hbs }}
{{< /prism >}}

In this case, our helper name is `includes` and we pass the filename parameter as `path/to/partial.hbs`.  Not an actual path or filename but it's an easy example.

How do we check if the filename has the extension we're expecting?  I'm glad you asked...

{{< h2 >}}Bonus: Create a Conditional Expression Helper{{< /h2 >}}

We wanted to include these partial files in the description of the style sheet's code blocks.  However, not every one will have a partial file.  How do we check in our styleguide template if the description is a partial or a block of text?

Handlebars doesn't provide a good way out of the box; but, as we know now, Handlebars and KSS Node are very customizable.

{{< prism javascript >}}
module.exports = function (Handlebars) {
  "use strict";

  Handlebars.registerHelper("contains", function(needle, haystack, options) {
    needle = Handlebars.escapeExpression(needle);
    haystack = Handlebars.escapeExpression(haystack);
    return (haystack.indexOf(needle) > -1) ? options.fn(this) : options.inverse(this);
  });
};
{{< /prism >}}

Above, we created another helper named `contains`.  The idea being if a string "contains" a substring then the condition returns true.  The helper's parameters has `needle` as the substring search, `haystack` as the string to search inside, and `options` to allow us to access the code inside the condition block. 

{{< prism javascript >}}
  needle = Handlebars.escapeExpression(needle);
  haystack = Handlebars.escapeExpression(haystack);
{{< /prism >}}

We need to escape the parameters before checking if the string contains the substring.

{{< prism javascript >}}
  return (haystack.indexOf(needle) > -1) ? options.fn(this) : options.inverse(this);
{{< /prism >}}

Finally, we return a boolean if the string contains the substring or not.  If it returns `true` then the code within the contains block will run.  Otherwise, the inverse code in the `else` block will execute.

Below is an example of how our styleguide checks if the description from our Sass comment contains a `.hbs` partial.  If `.hbs` is present then we use our `includes` helper we created earlier to retrieve the contents of the file.  All other descriptions will just display as it appears in the style sheet comment.

{{< prism javascript >}}
  {{#if description}}
    <div class="kss-description">
      {{#contains ".hbs" description}}
        {{ includes description }}
      {{else}}
        {{{description}}}
      {{/contains}}
    </div>
  {{/if}}
{{< /prism >}}

If you haven't seen triple curly brackets in Handlebars before, it tells Handlebars to escape the text as much as possible.  In other words, it's safe.

Below is an example of a style sheet code block containing a `.hbs` partial file.

{{< prism scss >}}
// Accordion
//
// partials/components/accordion.hbs
{{< /prism >}}

Don't forget to add `contains` to the `extend` section of your `kss_config.json` file.  Including this new helper into the `kss_config.json` file from before would look like:

{{< prism javascript >}}
{
  "title"        : "Michelangelo Styleguide",
  "mask"         : "*.scss",
  "placeholder"  : "[modifier]",
  "builder"      : "kss_styleguide/custom-template/",
  "source"       : "src/",
  "destination"  : "kss_styleguide/styleguide/",
  "homepage"     : "kss_styleguide/kss-homepage.md",
  "custom": [
    "contains",
    "includes"
  ],
  "extend": "kss_styleguide/extend",
  "css": [],
  "js" : []
}
{{< /prism >}}

For more information about KSS Node schema, you can read their [documentation page](https://github.com/kss-node/kss/blob/spec/SPEC.md).

If you're interested in reading more about KSS Node, I highly recommend [this tutorial at CSS Tricks](https://css-tricks.com/build-style-guide-straight-sass/).