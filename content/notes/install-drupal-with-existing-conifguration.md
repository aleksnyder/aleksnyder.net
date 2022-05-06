---
title:  "Install Drupal with Existing Configuration using Chain Commands"
description: Install Drupal with existing configuration using Drupal console and a custom chain command.
excerpt: Install Drupal with existing configuration using Drupal console and a custom chain command.
tags:
  - TIL
  - Drupal
  - Quick Tip
socialShareImage: https://www.aleksnyder.net/img/social-images/install-drupal-with-existing-configuration.png
date: 2021-08-20
publishdate: 2021-08-20
---

Sometimes a developer wants to provision a Drupal site from a shared configuration.  Each site beginning with the same settings, same enabled modules, and the same active theme.  In the past, you would use the [Config Installer](https://www.drupal.org/project/config_installer) module to stand up a new site from existing configuration.  Unfortunately this project is now deprecated.  So what now?  A developer could either create a custom profile to remove all `uuid` key values from each configuration file in the profile (usually the first line) or create a chain command to run multiple drupal console commands at once.

In this post, we'll create a new Drupal site from existing configuration without worrying Drupal throwing an error about the configuration not matching the site `uuid`.

First, turn off Drupal's setting to validate a configuration file's uuid with the site uuid.  Changing this setting would work with the custom profile method too.

{{< prism bash single >}}
drupal settings:set overrides.config.skip-validate-site-uuid true
{{< /prism >}}

If you're unfamiliar with Drupal Console, you can read more about it on [their website](https://drupalconsole.com/docs/en/chains/what-is-a-chain-command).

{{< prism yaml >}}
command:
  name: build
  description: 'Build site by installing and importing configuration'
commands:
  # Install site
  - command: site:install
    options:
      langcode: en
      db-type: mysql
      db-host: db
      db-name: default
      db-user: user
      db-pass: user
      db-port: 3306
      site-name: My Drupal site
      site-mail: admin@example.com
      account-name: admin
      account-mail: admin@example.com
      account-pass: admin
      force: true
    arguments:
      profile: standard
  # Import configurations
  - command: config:import
  # Rebuild cache
  - command: cache:rebuild
    arguments:
      cache: all
{{< /prism >}}

{{< prism bash single >}}
drupal chain --file="/var/www/config/build.yml"
{{< /prism >}}

For more information about chain commands, you can read their [documentation page](https://drupalconsole.com/docs/en/chains/what-is-a-chain-command).