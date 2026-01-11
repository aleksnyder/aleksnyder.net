---
title: Search.elastic.co
description: Senior Full-stack developer heavily involved in delivering a React‑based rebuild of Elastic's search experience, including the introduction of new Elasticsearch features and AI-assisted results.
contribution: As part of Elastic's web team, I was tasked with updating the search experience.  My initial task was to conduct research on existing content sources, determine which new Elastic features to showcase, configure a crawler, and build a modern front-end to encapsulate those improvements.
projectBrief: Elastic was founded and built on its search products.  The existing site search hasn't been updated since 2018.  Having a first-class search experience for the main site search using Elasticsearch's latest features was important for the company's future plans.
date: "2026-01-05T19:47:09+02:00"
jobDate: 2025
techs: [Elasticsearch, React, Node.js, AWS, Next.js]
roles: [UX Designer, Developer, Architect]
thumbnail:
  jpg: /works/search-elastic-co/search-elastic-co.jpg
  webp: /works/search-elastic-co/search-elastic-co.webp
projectUrl: https://search.elastic.co
images:
  jpg: /works/search-elastic-co/search-elastic-co.jpg
  webp: /works/search-elastic-co/search-elastic-co.webp
---

Elastic was founded in 2012 by the creators of Elasticsearch and Apache Lucene.  Since Elastic was founded as a search company,
their main site search should show what Elasticsearch can do.  Previously, the site search on elastic.co was using
SwiftType for serving results and an unsupported internal UI library for the front-end.  Elastic purchased SwiftType in 2018
and there haven't been many updates to the product or the indices supporting the site search since that acquisition.  Content
was still ingested into SwiftType regularly but as a product there haven't been many updates.  As a result, there was a
lot of irrelevant, stale data inside those indices.  If someone was searching for a particular Elastic feature, there was
a good chance they would see a deprecated feature instead of a feature or product which was recently released.  Part
of the problem was the content being ingested.  The Docs site sends everything ever published on the site as a "current" page.
Even if the product or page hasn't been updated in years, the sitemap treated the page as if it was updated today.  We
needed to find a solution to this content problem.

Not only did we need to fix the content problem and rethink how we ingest that content, we also needed to rethink the
front-end of the site search.  We needed to showcase the latest features of Elasticsearch and make it easier for users
to find what they're looking for.

### Fixing the content problem
Early on in the project, I conducted research on existing content sources.  We decided to only crawl and ingest docs pages
containing "/current" in the URL.  This meant that we could focus on the most recent content and try to avoid the stale content
problem. Previous versions of that content would be ignored because all supported docs are published with the `/current` URL
part.  Unfortunately, Docs considers old documentation to be "current" and we needed to find a way to weigh those pages differently.
We asked the docs team to add custom meta tags to their pages to help us categorize pages, standardize the data being added to
certain fields in the index, and help us filter out the stale content.  From there, we just crawled the pages looking for
DOM elements, substrings, and keywords.  Other sites we ingested, like the marketing site (elastic.co) or search labs, were pretty
straightforward when picking out relevant data.  We also needed to rethink the way we ingest content into Elasticsearch.

### Rebuilding the crawler
At first, we tried moving to the Elastic Web Crawler, but there were a few missing features we needed.  At the time, there were
limited field mapping capabilities.  Now, mapping capabilities are significantly better but they weren't around version 8.10.
Another limitation was we needed to set a value based on the content crawled.  For instance, we wanted to set the value
of `Documentation` for the `website_area` field when crawling a page in `/guide`.  Elastic web crawler allows us to pull
a value in the DOM but not if the value is missing on the page we're crawling.  We ended up writing our own crawler to ingest
the content we needed.  We still used Elasticsearch for the data, but the crawler would be a Node.js application packaged as a
AWS Lambda function.  The application would be given a sitemap URL for each Elastic website and would crawl the pages
in the sitemap.  We used a separate Elasticsearch index for a `last_ingested` field; and then check the `lastmod` value of the
page in the sitemap against the `last_ingested` value to determine if the page needed to be crawled.  Each field had a
specific function for conditionally setting values for that field depending the site being crawled.  For debugging purposes,
we created utilities to see the exact data structure being ingested into Elasticsearch and logged responses to CloudWatch.

Initially, we provisioned the Lambda function using SAM templates and Docker.  Eventually, we moved this configuration to
Terraform and deployed it using GitHub Actions.

Over time, we enhanced our Elasticsearch index to take advantage of new
features.  From the beginning, we took advantage of ELSER, ESRE, and other machine learning models provided by Elastic Cloud; but
we also experimented with newer field types like `semantic_text`.  We also rebuilt the Node application in TypeScript to match how
the front-end was built.

### Rethinking the front-end
From the beginning, we knew we wanted to use Next.js, React, and TypeScript.  The team was already familiar with Next.js and
React, so we decided to use those technologies.  Plus, we needed to localize all the content and `next-intl` has worked for us
in the past.  Another reason we chose Next.js was because we were experimenting with Vercel as a hosting provider.

Now, how would we interact with Elasticsearch?  In the past, we used Elastic's [Search UI](https://www.npmjs.com/package/@elastic/search-ui) library
to build the search experience.  We ended up rebuilding the search experience with another library built by another
Elastician, called [Searchkit](https://www.searchkit.co/).  Searchkit made it easier to build a modern front-end for the search experience
and it also provided a lot of the functionality we needed.  We wanted to show the speed in which Elasticsearch could return results
and we wanted to show the AI-assisted results.  Searchkit provided an easy way to "search as you go."  In other words, as the user
typed, the search results would update in real-time.  Depending on the user's input, we would provide contextual filters to help
the user narrow down their search and rich snippets for key terms in the results.

We knew we wanted to use vector search for the search experience, but we also wanted keyword search.  Luckily, Elasticsearch
provides a way to combine both vector and keyword search.  We modified Searchkit's `InstantSearchAdapter` component to use a
Hybrid Search strategy, which would combine the results from both vector and keyword searches.  We also added a custom
`SearchBox` component to allow users to search by keyword.  For users using a language other than English, we would forward
their requests to a BM25 query.  At the time, ELSER did not support languages other than English.

After the query has been made to Elasticsearch, we would use the `highlight` feature to show the key terms in the results.
We also weighted the results based on the relevance of the query to the page.  Results with "Documentation" in the `website_area`
field would be weighed higher than other website areas.  We also wanted results updated within the last year to be weighed higher.

If we were to build the search experience again, we would probably use something other than Next.js.  It seems like overkill
for what we were trying to do.  Maybe we would use React or HTMX or an updated Search UI library from Elastic; but that decision
is in someone else's hands.