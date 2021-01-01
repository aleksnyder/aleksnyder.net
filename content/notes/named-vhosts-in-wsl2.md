---
title:  "Named vHosts in WSL2"
description: Figure out the best approach to use named virtual hosts for either Apache or Nginx in WSL2.
tags:
- local development
- wsl
- nginx
date: 2021-01-01
publishdate: 2021-01-01
---

Overall, moving from WSL1 to WSL2 has been pretty seamless.  Everyday tasks like compiling assets with Node.js, updating dependencies with Composer, or rebuilding my site with Hugo are noticeably faster.  Of course, these tasks are being run inside the Linux virtual machine packaged with WSL2 instead of inside Windows.  Running these tasks on Windows would be much slower in WSL2 than WSL1.  This virtual machine is lightweight and allows WSL2 to run separate from Windows but still have access to the operating system.  One minor obstacle I run into time and time again is networking.

## The Problem
Each time WSL2 is started, a new virtual machine is provisioned.  This small detail can be troublesome when using named vHosts.  I could access `http://localhost` or `http://localhost:3000` but not named virtual hosts such as `http://site.local`.  Technically, I could assign a port number to each site or application; but I prefer cleaner URLs.  It's easier for me to keep track of hostnames than port numbers and using hostnames feels closer to how the site will be used in production.

WSL1's networking is an extension of Windows networking system.  The process for setting up a new virtual host for Nginx in WSL1 is pretty straightforward.

**1.  Create a new Virtual Host for site.local**
{{< prism bash >}}
server {
    listen 80;
    listen [::]:80;

    root /var/www/html/site;
    index index.html index.htm index.nginx-debian.html;

    server_name site.local;

    location / {
        try_files $uri $uri/ =404;
    }
}
{{< /prism >}}

**2.  Reload NGINX**
{{< prism bash >}}
sudo service nginx reload
{{< /prism >}}

**3.  Update hosts file with site.local**
{{< prism bash >}}
127.0.0.1 site.local
{{< /prism >}}

Then head over to `http://site.local` to see your changes.

Unfortunately with WSL2 the same process no longer works.  What's different?

## Attempt #1:  Retrieve Current IP Address
When WSL2's virtual machine is provisioned, a new IP address is provisioned too.  The simplest, albeit tedious, approach would be to pull the IP address from the current WSL2 instance and update the hosts file.

Using `grep` we can retrieve the current IP address:

{{< prism bash >}}
grep -m 1 nameserver /etc/resolv.conf | awk '{print $2}'
{{< /prism >}}

As an example, the returned IP address from the above command would be `172.29.112.1`.

Now update the hosts file with this IP address to see the site again:
{{< prism bash >}}
172.29.112.1 site.local
{{< /prism >}}

It works!  I can access `http://site.local` in my browser.

Let's say I restart my computer later that day after successfully accessing `http://site.local`.  I start up my local and try to work on `http://site.local` again but cannot see the site any longer.  That's weird it was just working not too long ago.

If we try the earlier `grep` command and update the hosts file again, we see that it works again.  Not the most efficient process.

## Attempt #2:  Update the hosts file in WSL2 and Windows
After using the first attempt for a while, I wanted a better approach.  I started thinking about how similar WSL2 would be to any other Linux server.  My first thought was to update the hosts file within my WSL2 instance.  If it works in Windows why not Linux too?

**1.  Edit /etc/hosts file in WSL2 and add the local site**
{{< prism bash >}}
127.0.0.1 site.local
{{< /prism >}}

**2.  Update the Windows hosts file with the local site**
{{< prism bash >}}
127.0.0.1 site.local
{{< /prism >}}

Much better!  This method works for as long as you use the current distro.  Other distros or reinstalling the current WSL2 distro require editing the hosts file again.
