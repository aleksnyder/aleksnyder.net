---
title:  "Setting up Xdebug in Docker"
description: In this article, we'll explore how to integrate Xdebug into Docker and leverage it within PHPStorm.
excerpt: In this article, we'll explore how to integrate Xdebug into Docker and leverage it within PHPStorm.
tags:
  - xdebug
  - docker
socialShareImage: https://www.aleksnyder.net/img/social-images/setting-up-xdebug-in-docker.png
publishdate: 2019-10-15
date: 2019-10-15
---

When searching how to integrate Xdebug into my Docker workflow, I hit a blocker on how to reach it outside the Docker container.  The container itself knew Xdebug was there, but tools like PHPStorm couldn't reach the extension.

Even after following the instructions on PHPStorm's [zero configuration debugging](https://www.jetbrains.com/help/phpstorm/zero-configuration-debugging.html) help page, I couldn't reach Xdebug.  Something was missing.  The answer was frustratingly simple...my `php.ini` was missing a few lines.

{{< h2 >}}PHP.ini Confguration{{< /h2 >}}

Inside the container's `php.ini`, these lines made all the difference:

{{< prism bash >}}
zend_extension=xdebug.so  # Might need to check extension path
xdebug.remote_enable=1
xdebug.remote_host=172.17.0.1  # container IP address
xdebug.remote_port=9001
{{< /prism >}}

### Extra PHP.ini configuration

Instead of debugging or profiling all PHP calls, you can be more selective by using a cookie, Xdebug bookmarklet or extension, and a few more lines of configuration in the container's `php.ini` file.

{{< prism bash >}}
xdebug.remote_handler=dbgp  # Enables use of cookie
xdebug.remote_mode=req
xdebug.remote_autostart=0
xdebug.remote_connect_back=0
xdebug.idekey = PHPSTORM  # Name of the cookie
xdebug.remote_log=/tmp/xdebug.log  # Useful logs for troubleshooting
{{< /prism >}}

{{< h2 >}}Tips & Tricks{{< /h2 >}}

* Go to [https://www.jetbrains.com/phpstorm/marklets/](https://www.jetbrains.com/phpstorm/marklets/) or use Xdebug Helper extension.
* If using Apache in your container, sometimes restarting Apache is required for changes to take effect.
* Unsure of your configuration?  Paste your container's `phpinfo()` output into [https://xdebug.org/wizard](https://xdebug.org/wizard).
* Tools like [Docksal](https://docs.docksal.io/) have a configuration file where [enabling xdebug](https://docs.docksal.io/tools/xdebug/) is as simple as changing 0 to 1.
