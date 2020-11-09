---
title: Jekyll CV
description: A Jekyll theme for those looking for a clean, minimalistic theme for their online CV/Resume on all devices.  Additionally, Jekyll CV follows Google's material design standards for its bold colors and modern design.  Possibly its greatest feature is how the content is generated.  Update the section-specific data file and the theme will generate the necessary markup during the build process.  No need to update HTML or Markdown inside the theme.
date: "2019-05-02T19:47:09+02:00"
jobDate: 2019
techs: [Jekyll, Ruby, YAML, SCSS]
roles: [UX Designer, Developer]
thumbnail:
  jpg: img/jekyll-cv.jpg
  webp: img/jekyll-cv.webp
projectUrl: https://github.com/aleksnyder/jekyll-cv
images:
  jpg: img/jekyll-cv.jpg
  webp: img/jekyll-cv.webp
---

**Tools:**
Jekyll, Ruby, YAML, SCSS

**Roles:**
UX Designer, Developer

**Project URL:**
[https://github.com/aleksnyder/jekyll-cv](https://github.com/aleksnyder/jekyll-cv)

A Jekyll theme for those looking for a clean, minimalistic theme for their online CV/Resume on all devices.  Additionally, Jekyll CV follows Google's material design standards for its bold colors and modern design.  Possibly its greatest feature is how the content is generated.  Update the section-specific data file and the theme will generate the necessary markup during the build process.  No need to update HTML or Markdown inside the theme.

{{< screenshot src="jekyll-cv-desktop.jpg" alt="Jekyll CV theme in a browser" >}}

## Data Driven

Each section of the Jekyll CV theme can be easily updated using data files.  These data files are located in the `_data` folder and they are named after their respective section.  For instance, if you wanted to add another degree to your Education history you would add a new line to `_data/education.yml`.  Below is a snippet from the `_data/education.yml` file.

{{< prism yaml >}}
schools:
  - name: University of Maryland
    location: College Park, MD
    years: 2010-2014
    degrees:
      - B.S. Computer Science
  - Minor in History
{{< /prism >}}
