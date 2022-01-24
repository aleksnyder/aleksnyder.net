---
title:  "Run Commands at Startup in WSL"
description: Run commands or services when WSL boots or starts up regardless of version.
excerpt: Run commands or services when WSL boots or starts up regardless of version.
tags:
  - Quick Tip
  - WSL
date: 2022-01-24
publishdate: 2022-01-24
---

A quick tip for those WSL users trying to have a service such as NGINX, Apache, or Docker run at startup: add the following codeblock to `~/.bash_profile` or `~/.zprofile` file if using oh-my-zsh.

{{< prism bash >}}
  if service nginx status 2>&1 | grep -q "is not running"; then
    wsl.exe -d "${WSL_DISTRO_NAME}" -u root -e /usr/sbin/service nginx start >/dev/null 2>&1
  fi
{{< /prism >}}

In a nutshell, the code above is checking if the service is running; and if the service status returns with "nginx is not running", then execute the command to start the service.  This method could be done with other services or even specific commands.  Although the condition looking for "is not running" will need adjustment.
