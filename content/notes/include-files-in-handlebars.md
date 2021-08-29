---
title:  "Include partial templates in Handlebars"
description: A neat trick to load stylesheets only for IE11.
excerpt: A neat trick to load stylesheets only for Internet Explorer 11.
draft: true
tags:
  - JavaScript
  - Handlebars
date: 2021-08-17
publishdate: 2021-08-17
---

Introduce Handlebars and kss-node

Explain the problem of organizing partials

Detail how to include html from files

{{< h2 >}}Steps to alter field values{{< /h2 >}}

{{< prism javascript >}}
const fs = require("fs");
const jsdom = require("jsdom");

module.exports = function (Handlebars) {
  "use strict";

  Handlebars.registerHelper("includes", function(filename) {
    const cwd = process.cwd();
    const url = `${cwd}/styleguide/${filename}`;
    const includedFiles = fs.readFileSync(url, "utf8");
    const { JSDOM } = jsdom;
    const dom = new JSDOM(includedFiles);
    const domContent = dom.window.document.body.innerHTML;
    const domTemplate = Handlebars.compile(domContent);
    
    return new Handlebars.SafeString(domTemplate({}));
  });
};
{{< /prism >}}

Explain the above code snippet