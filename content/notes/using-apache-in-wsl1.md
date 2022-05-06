---
title:  "Using Apache in WSL1"
description: Setup Apache to use with Bash on Windows 10 local development environments.
excerpt: This is part 2 in an ongoing series detailing how to setup Windows Subsystem for Linux, or WSL, for Local Development.  In this section, we'll install, configure, and use apache.
tags:
  - local development
  - apache
  - wsl
socialShareImage: https://www.aleksnyder.net/img/social-images/using-apache-in-ws1.png
date: 2017-03-07
publishdate: 2017-03-07
---

This is part 2 in an ongoing series detailing how to setup Windows Subsystem for Linux, or WSL, for Local Development.  In this section, we'll install, configure, and use `apache`.  Apache is a free open source software which runs more than 50% of the world's servers.

For background on WSL and information detailing how to use `Git` in Windows 10, see [Part 1](https://www.aleksnyder.net/blog/windows-10-local-development-git/).

{{< h2 >}}Installing Apache{{< /h2 >}}

Use the `apt` package management tools to update your local package index.  Next, install Apache.

{{< prism bash single >}}
sudo apt-get update && sudo apt-get install apache2
{{< /prism >}}

Check the IP address of your local WSL installation.  It should be `127.0.0.1` or [Localhost](http://localhost).

{{< h2 >}}Enabling Apache Mods{{< /h2 >}}

Sometimes popular Apache mods like `rewrite` or `headers` are needed for CMS's like WordPress. Luckily, you can install them within WSL.

{{< prism bash single >}}
sudo a2enmod rewrite
{{< /prism >}}

The above command downloads and enables the `rewrite` Apache mod to your WSL environment.

Now with `apache` installed and any necessary mods enabled, you can serve web pages in Windows 10.  Next, we'll setup a simple `.conf` file and point the document root to one of your mounted drives.

{{< h2 >}}Setup a Simple Conf{{< /h2 >}}

What if you want to setup another hostname for your local project besides `localhost`?  Could this project be located in another directory?  The answer to both questions is yes!

Apache configuration files allows for easy adminstration of your sites on the server.  Additionally, it provides customizable options like `ServerName` and `DocumentRoot`.

Now, add the `.conf` file to `/etc/apache2/sites-available`.  I like to name my `.conf` files after the hostname of the site.  For instance, my local Drupal site would be `drupal.dev.conf`.

{{< prism bash >}}
cd /etc/apache2/sites-available
touch site.dev.conf
{{< /prism >}}

Next, edit the `.conf` file you created and add the desired configuration options.  Below is an example you can use site URL is `site.dev` and the folder is located inside your `Users` directory.

{{< prism bash >}}
<VirtualHost *:80></VirtualHost>
  # The ServerName directive sets the request scheme, hostname and port that
  # the server uses to identify itself. This is used when creating
  # redirection URLs. In the context of virtual hosts, the ServerName
  # specifies what hostname must appear in the request's Host: header to
  # match this virtual host. For the default virtual host (this file) this
  # value is not decisive as it is used as a last resort host regardless.
  # However, you must set it for any further virtual host explicitly.
  ServerName site.dev

  ServerAdmin webmaster@localhost
  DocumentRoot /mnt/c/Users/username/localdev/site

  <Directory /mnt/c/Users/username/localdev/site-folder>
      Options Indexes FollowSymLinks MultiViews
      Require all granted
  </Directory>

  # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
  # error, crit, alert, emerg.
  # It is also possible to configure the loglevel for particular
  # modules, e.g.
  #LogLevel info ssl:warn

  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined

  # For most configuration files from conf-available/, which are
  # enabled or disabled at a global level, it is possible to
  # include a line for only one particular virtual host. For example the
  # following line enables the CGI configuration for this host only
  # after it has been globally disabled with "a2disconf".
  #Include conf-available/serve-cgi-bin.conf
</VirtualHost>
{{< /prism >}}

The above `.conf` file allows you to edit files directly on your Windows machine without having to edit them on the server or use FTP!  This makes development much easier.  Save the `.conf` file using `CTRL + x` and type `y` at the prompt.

Once the `.conf` file is saved, type the following command into WSL:

{{< prism bash single >}}
sudo a2ensite site.dev.conf
{{< /prism >}}

This automatically enables your `site.dev.conf` file in the `/etc/apache2/sites-enabled` directory.  Without this step you won't see anything when you go to `site.dev` in your browser.  Finally, restart apache.

{{< prism bash single >}}
sudo service apache2 restart
{{< /prism >}}

Don't forget to update your computer's hosts file.

{{< prism bash single >}}
127.0.0.1           site.dev
{{< /prism >}}

You should now be able to see your site at [http://site.dev](http://site.dev).  If you're having issues with the site displaying properly, check the `.conf` file.  Maybe the directory or another configuration has an incorrect setting.

{{< h2 >}}Conclusion{{< /h2 >}}

That's it for setting up Apache on your Windows 10 computer.  In the next Windows 10 Local Development post, we'll install Ruby and some Ruby gems!
