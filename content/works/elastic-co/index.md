---
title: Elastic.co
description: Senior Full-stack Developer heavily involved in the creation of new features, experiences, and initiatives for Elastic's marketing website and its associated sites.
contribution: As part of Elastic's web team, I planned, built, maintained, and delivered new features and experiences to the main marketing website.  Additionally, I revamped development processes, introduced industry standard tools, and rebuilt its server architecture. 
projectBrief: Founded in 2012, Elastic (formerly Elasticsearch) provides solutions to customers to bring structure to their data, catch security anomalies in their stack, log issues, and so much more.  Elastic.co details what Elastic offer its customers and provides a portal to docs and Elastic Cloud. 
date: "2026-01-05T19:47:09+02:00"
jobDate: 2025
techs: [React, Next.js, Node.js, AWS, Elasticsearch]
roles: [UX Designer, Developer, Architect]
thumbnail:
  jpg: /works/elastic-co/elastic-co.jpg
  webp: /works/elastic-co/elastic-co.webp
projectUrl: https://www.elastic.co
images:
  jpg: /works/elastic-co/elastic-co.jpg
  webp: /works/elastic-co/elastic-co.webp
---

Most of my work on Elastic.co involved building new features and experiences for the marketing website.  A lot of my work
was on the back-end of the site; not the front-end.  I helped from time to time with new components and bug fixes, but I was
mostly responsible for the architecture and parts of the site rarely seen by users.  If the training team had an issue
with their courses not displaying data as expected, I would have to go and look at Docebo to see why.  If we needed a
new data source to be provided to the front-end, I would have to build a new API and integrate it into the site.  If
alerts were spiking, I would have to look at the logs to see why.  If deployments were failing, I would go found out why
and fix it.  Glamorous, but necessary, stuff like that.

Sometimes, I would be involved in proposing new workflows, developer tools, or initiatives.  For example, I proposed
using TypeScript in our projects.  I also proposed  all developers to use a linter, create a
pull request for every change, and defined our deployment processes.

Other times, I would be attached to more exciting projects like building pricing calculators or completing rethinking our
server architecture.

{{< devices desktop="endpoint-security-calculator.jpg" mobile="endpoint-security-calculator-mobile.jpg" alt="Screenshot of Elastic's Endpoint Security Calculator" >}}
### Pricing Calculators
Before I signed onto the calculator project, the project was stagnant for almost two years.  Once I joined the team, we
decided on a central data source, finalized the design, and started building the calculator.

Previously, there were multiple APIs used to calculate pricing.  We decided to build a single API that would return all
pricing information for the calculators.  In addition to the consolidated APIs, we also had to ingest new pricing data and
serve that data in real-time.  Being Elastic, we decided to use Elasticsearch as our data store.  We created a Node
application to pull the new pricing data, transform it using the data from the billing API, and ingest it into Elasticsearch.
Then, we would serve the data to the calculator using a proxy API in Next.js.

For the design, we used custom React components for each element of the design.  From sliders to buttons, we created unique
components not used elsewhere on the site.  However, these components would be used as inspiration for future designs.  Each
page would request the data from the proxy API and update the totals based on the user's selections.  We could toggle
different pricing tiers based on cloud provider and region; and update the totals accordingly.  All while meeting accessibility
standards and ensuring the calculator was responsive.

### Server Architecture
For years our server architecture was created and maintained by a vendor in AWS.  In Summer 2024, we decided to own the server
infrastructure ourselves.  For the remainder of the year, everything went well.  We deployed code at least once a week, and
we had no issues. Then in early 2025, we suffered a major outage.  The CodePipeline was not designed to be rolled back.  AWS required
CodePipelines to use version 2 to enable rollbacks. When the previous vendor ran into issues, they would find the issue in the code and
deploy again.  Ideally, an issue with the code would be found in a lower environment during the code build step.  We shouldn't be able
to finish a deployment when there's an error in the code.

After we resolved the issue, we started the RCA process.  If you're curious, the root cause was related to a Next.js upgrade using way
too much memory.  The RCA process revealed many problems with our server architecture.  We needed to:

* Create better alerts, such as memory running low, disk space running low, or the number of connections is too high
* Move to a Blue/Green architecture with canaries
* Cleanup old architecture
* Use updated EC2 instance types
* Generalize the CodePipelines and switch out environment specific variables as parameters
* Update PagerDuty alerts and schedules
* Add Synthetics to check site responsiveness
* Document Runbooks for on-call engineers and attach them to the PagerDuty and Synthetic alerts
* Transform AWS and Fastly configuration to be built with Terraform

It was a long process, but we were able to address each item and deploy successfully again.  It just took a few months.