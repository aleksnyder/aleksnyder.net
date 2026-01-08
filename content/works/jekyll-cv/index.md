---
title: Jekyll CV
description: A Jekyll theme for those looking for a clean, minimalistic theme for their online CV/Resume on all devices.
contribution: As the creator and maintainer of this theme, I studied Material Design principles in order to closely match the theme to what Google intended.  Additionally, I modernize the code, add new features, and provide bug fixes when found.
projectBrief: My goal was to create an open-source theme for job seekers looking for a clean CV site.  At the same time, the theme needed to be well built and easy to update for those developers not looking to spend too much time maintaining content.
date: "2019-05-02T19:47:09+02:00"
jobDate: 2019
techs: [Jekyll, Ruby, YAML, SCSS]
roles: [UX Designer, Developer]
thumbnail:
  jpg: /works/jekyll-cv/jekyll-cv.jpg
  webp: /works/jekyll-cv/jekyll-cv.webp
projectUrl: https://github.com/aleksnyder/jekyll-cv
images:
  jpg: /works/jekyll-cv/jekyll-cv-desktop.jpg
  webp: /works/jekyll-cv/jekyll-cv-desktop.webp
---

A Jekyll theme for those looking for a clean, minimalistic theme for their online CV/Resume on all devices.  Additionally, Jekyll CV follows Google's material design standards for its bold colors and modern design.  Possibly its greatest feature is how the content is generated.  Update the section-specific data file and the theme will generate the necessary markup during the build process.  No need to update HTML or Markdown inside the theme.

### Data Driven

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