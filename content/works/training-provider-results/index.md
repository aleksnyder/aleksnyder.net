---
title: Training Provider Results
description: Senior Full-stack developer and team lead responsible for aggregating training data using Elasticsearch and Drupal. Then, building the APIs needed for the AngularJS front-end.
contribution: As a contractor for the U.S. Department of Labor, I was tasked with leading the effort to aggregate training data, serve that data, and provide an easy to use, modern way to search the national training data.  As the Senior Full-stack developer and team lead, we set up an Elasticsearch index, an ingestion pipeline from a CSV source into Drupal, and then created a location-aware API for Angular to search.
projectBrief: TrainingProviderResults.gov helps further the U.S. Department of Labor’s mission of providing high-quality job training and enhanced employment opportunities to the American workforce.  Department of Labor needed a way to search and display these opportunities for prospective applicants looking for new ways to train or retrain.
date: "2026-01-03T19:47:09+02:00"
jobDate: 2022
techs: [Drupal, AngularJS, PHP, Elasticsearch]
roles: [Team Lead, Developer, Architect]
thumbnail:
  jpg: /works/training-provider-results/training-provider-results-gov.jpg
  webp: /works/training-provider-results/training-provider-results-gov.webp
projectUrl: https://www.trainingproviderresults.gov
images:
  jpg: /works/training-provider-results/training-provider-results-gov.jpg
  webp: /works/training-provider-results/training-provider-results-gov.webp
---

Before I signed onto the Training Provider Results project, the project was temporarily abandoned.  I was asked to do what was necessary
to push the project across the finish line.  We needed to create an ingestion pipeline for the training data from the customer,
decide where to store the data, integrate the data in such a way where the Angular front-end could search it, and fit these
changes into a new platform initiative being developed by the U.S. Department of Labor.

Early iterations of this project decided to use Drupal as the CMS, Elasticsearch as the search engine, and Angular as the
front-end.  For the sake of time, we agreed to build on those decisions.  There were a few missing pieces we needed
to figure out first.

Every month we received a new batch of training data from the customer as a CSV file.  We needed to automate the transformation
of this data into a format that could be ingested into Elasticsearch.  We also needed to import this data into Drupal in
case the customer ever wanted to make changes to the training data before the next batch of data was released.  During the
development of the ingestion pipeline, we realized the data was missing the zip code for each training opportunity.  The data had
an address, city and state; but we needed the zip code, latitude, and longitude.  We were able to find the latitude and longitude
from the address using Google Maps but we still needed an inexpensive way to find the zip code.  While researching solutions, we found
a database of zip codes and their corresponding latitude and longitude.  We used this database to build an API for the front-end
and ingestion pipeline to query.  The data may not be real-time, but the client was happy with the results.  With these details in hand,
I built an interface in Drupal for the client to upload the CSV file and then the ingestion pipeline would import the new data
into Elasticsearch.  We already had the API in place, so now the front-end had everything it needed to search the training data.

For the most part, the front-end was already completed.  We just needed to plug in the new API and update the results page to display
the new data.  Also, we needed to connect the front-end to Drupal to update the content throughout the site.  There were concerns
about performance, but the client said they were happy with the results.
