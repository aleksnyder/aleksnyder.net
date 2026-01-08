---
title: Apprenticeship.gov
description: Apprenticeship.gov is the Department of Labor's one-stop place for all things apprenticeship and built using Drupal, React, and Node.js microservices.
contribution: During the development of apprenticeship.gov, I was involved in many of the architecture discussions deciding how to build out a new feature, section, or initiative.  Once a direction was chosen, I would develop the back-end, front-end, and facilitate the launch of the feature, section, or initiative following the requirement(s) given by the team.
projectBrief: The U.S. Office of Apprenticeship, part of the Department of Labor (DOL), was established by the National Apprenticeship Act of 1937.  
  The Department of Labor wanted a modernized website with a greater focus on apprenticeships.  Enter Apprenticeship.gov.  Apprenticeship.gov is the Department
  of Labor's one-stop place for all things apprenticeship.
date: "2026-01-04T19:47:09+02:00"
jobDate: 2022
techs: [Drupal, React, Node.js, Azure]
roles: [UX Designer, Developer, Architect]
thumbnail:
  jpg: /works/apprenticeship-gov/apprenticeship.jpg
  webp: /works/apprenticeship-gov/apprenticeship.webp
projectUrl: https://www.apprenticeship.gov
images:
  jpg: /works/apprenticeship-gov/apprenticeship.jpg
  webp: /works/apprenticeship-gov/apprenticeship.webp
---

Apprenticeship.gov is an incredibly complex application pulling in data from nearly every state's apprenticeship agency plus
some external vendors, such as LinkedIn, into a single searchable database.  During development, the current trend was to use Microservices for everything.  In our
case, it wasn't just chasing trends.  Our planned architecture needed dozens of small applications communicating with each other but
could be swapped out with another language or framework if needed.  We also needed to be able to easily scale up and down as needed.  Without
going too much into the details, we decided to use Node.js for the microservices since our developers were already familiar with it.  We also
wanted to use React for the front-end since it was the most popular framework at the time.

Additionally, we opted to use Azure for hosting our microservices since the Department of Labor already had a good relationship with them.  Plus,
Microsoft recently launched some useful machine learning tools, such as Azure Cognitive Services, we could use to tag and categorize our ingested apprenticeships.  After the
We also decided to use Azure Search to provide a searchable index for React to query our apprenticeships.  Microsoft even
sent a few of their consultants to help us set up these new Azure features.

Drupal was chosen as the CMS since it was already being used by the Department of Labor for other websites.  All content
not served by React was served by Drupal.  We needed a way to embed these React applications into Drupal pages while sharing
the header, footer, shared components, and other shared content.  We ended up building the applications and mounting them
into Drupal using a custom entity which sent the minified files into a twig template.  From there, a content editor could
embed that entity wherever they wanted.  Nearly every initiative on Apprenticeship.gov required a new integration with
Drupal.  We used webforms and a custom webform handler to submit proclamations and events to Salesforce.  A custom views
style plugin to display static pages from an API.  We combined the user management from Drupal with login.gov.  For most
who interacted with the site, the React pages were the most important, but those pages wouldn't be possible without the Drupal
integrations.

{{< sidebyside left="app_gov_resource_hub.jpg" right="app_gov_resources.jpg" alt="List of Apprenticeship.gov resources" >}}
### Resource Hub
Finding and filtering through resources, such as videos and success stories, had been identified as a concern by users of the site.  Resources were hard to find and there was confusion when multiple versions of the same file were scattered throughout the site.  We recommended a central place for these resource types and to provide an easier way to manage these resources.  We created new customizable entities for each resource type.  These resource types could now have tags, categories, searchable text for specific keywords, and other metadata laid out in an accessible, user-friendly form. Instead of the 100% manual process used previously.  Additionally, we added automation for the more visual aspects of the design like automatically retrieving the first page of an uploaded PDF for the resource thumbnail.

{{< sidebyside left="app_gov_events.jpg" right="app_gov_single_event.jpg" alt="List of Apprenticeship.gov events" >}}
### Events Hub
An Events Hub had been on the wishlist for the client for a long while.  At the time, the agency was putting a greater emphasis on outreach through these events.  Our goal was to have a simple, easy to navigate front-end while connecting our back-end to Salesforce.  It was determined early in the project that events management would be handled in Salesforce.  At the time, we didn’t have a good way to pull information from Salesforce; so we had to create one.  I built and configured a connector using Salesforce APIs and then mapped custom Salesforce entities to our content types.  Automating the process further, I set up a cron to sync Salesforce with our back-end every few hours.

{{< sidebyside left="app_gov_bulletins.jpg" right="app_gov_circulars.jpg" alt="List of Events previously held by the Office of Apprenticeship" >}}
### Policy Document Migration
A smaller, but important, initiative was to have an easy way to view policy documents released throughout the history of the office.  These documents go back to the 1950s with some of the earliest ones being scanned versions of the original documents.  Ideally, we could automate some of the process instead of manually reading through these documents and manually entering the data into the newly created content types.  Luckily, some data has already been digitized on dol.gov; but the client wanted more information not available on dol.gov and wanted this information to be “in-house”.

I created a migration script to pull the existing data from dol.gov and then another migration script to look through all the documents going back to the 1950s to pull missing data like dates, IDs, and summaries.  Out of almost 400 documents, my script was able successfully pull data from 82% of the documents.  With the data in hand, we built out a simple table for users to search, filter, and view bulletins and circulars from the 1950s to today.