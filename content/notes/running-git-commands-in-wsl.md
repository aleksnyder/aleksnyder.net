---
title:  "Running git commands in WSL"
description: Setup git to use with Bash on Windows 10 local development environments.
excerpt: This is part 1 in an ongoing series detailing how to setup Windows Subsystem for Linux, or WSL, for Local Development.  In this section, we'll install, configure, and use git.
categories: blog
tags:
- local development
- git
- wsl
taxonomy:
    tag: [wsl, local development, git]
date: 2017-02-26
publishdate: 2017-02-26
---

This is part 1 in an ongoing series detailing how to setup Windows Subsystem for Linux, or WSL, for Local Development.  In this section, we'll install, configure, and use `git`.

## Background

In the Summer of 2016, Microsoft released the first anniversary update for their Windows 10 operating system.  The anniversary update included a feature sought after by developers for years, a separate, dedicated Linux environment built into Windows.  Microsoft is continually adding new features, commands, and support for web technologies within the Windows Subsystem for Linux.  This post won't go over the process of installing Windows Subsystem for Linux (I'll use WSL from now on), WSL already goes into detail about the installation process.  Below is a list of useful links for reference.

* [WSL Github Repository](https://github.com/Microsoft/BashOnWindows)
* [WSL Documentation](https://msdn.microsoft.com/en-us/commandline/wsl/about)
* [User Voice](https://msdn.microsoft.com/en-us/commandline/wsl/release_notes)
* [WSL Blog](https://blogs.msdn.microsoft.com/wsl)
* [List of Programs that work and don't work](https://github.com/ethanhs/WSL-Programs)
* [Tips and Guides for new BASH users](https://github.com/abergs/ubuntuonwindows)

## Installing Git

Using the `apt` package management tools to update your local package index.  Next, update and install the program.

{{< prism bash >}}
$ sudo apt-get update
$ sudo apt-get install git
{{< /prism >}}

{{< prism bash >}}
sudo a2ensite site.dev.conf
{{< /prism >}}

{{< prism bash >}}
$ sudo apt-get update
$ sudo apt-get install git
{{< /prism >}}

Now with `git` installed, you can run `git` commands throughout your Windows system.  You can even run `git` commands inside your Documents folder by mounting your drive inside WSL like so:

{{< prism bash >}}
$ cd /mnt/c/User/your-username/Documents
$ git init
{{< /prism >}}

In the above command, we mounted the C: drive, navigated the main user folder, and switched to the Documents folder.  After changing to the directory, we initialized a git repository inside the Documents folder.  Make sure to replace `your-username` with your desktop's username, usually first initial and last name.  If you're unsure what your username is open Windows Explorer and navigate to your Users folder in the C: drive.  The username you'll use should be inside there.  WSL can mount any drive recognized by your computer and can access nearly every folder within the selected drive as long as you know the path.

## Setting up Git

Before moving onto an example of using `git` in WSL, we need to configure `git` within our system.  Mainly so our commit messages have a name and email attached to them.

The easiest way of doing this is through the `git config` command. Specifically, we need to provide our name and email address because `git` embeds this information into each commit we do. We can go ahead and add this information by typing:

{{< prism bash >}}
$ git config --global user.name "Your Name"
$ git config --global user.email "youremail@domain.com"
{{< /prism >}}

We can see all items within `git config` object by typing the following command:

{{< prism bash >}}
$ git config --list
{{< /prism >}}

## Using Git in WSL

For this example, we'll clone one of my git repos onto your Windows 10 desktop.  It's a simple application built using AngularJS, which pulls all upcoming trains plus their information using the [WMATA Developer API](https://developer.wmata.com/) and displays the data in a table.

First, let's create a folder to centralize our work.  In later posts in the series we'll use this folder to organize our projects.

{{< prism bash >}}
$ cd /mnt/c/User/your-username/Documents
$ mkdir localdev
$ cd localdev
{{< /prism >}}

Next, we'll clone the git repository to our localdev directory and switch to the `wmata-angular` directory.

{{< prism bash >}}
$ git clone https://github.com/aleksnyder/wmata-angular.git
$ cd wmata-angular
{{< /prism >}}

Make sure to remove the git repos origin and add your own remote origin like so:

{{< prism bash >}}
$ git remote rm origin
$ git remote add origin insert-origin-here
{{< /prism >}}

In your code editor, open `index.html` and make a modification to the file like changing the title.  Then commit those changes.

{{< prism bash >}}
$ git add index.html
$ git commit -m "Modified the title"
{{< /prism >}}

After committing your change, you can push the code changes to origin.  If you created another branch from master, replace master in the push statement below with your branch name.

{{< prism bash >}}
$ git push origin master
{{< /prism >}}

## Conclusion

That's it for setting up Git on your Windows 10 computer.  In the next Windows 10 Local Development post, we'll install Apache and configure `.conf` files to point to your C: drive.  That's right!  A web server built into Windows 10!
