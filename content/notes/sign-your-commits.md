---
title:  "How to sign your commits"
description: Recently I decided to sign all my commits and decided to share how I did it.
excerpt: Recently I decided to sign all my commits and decided to share how I did it.
toc: false
tags:
  - TIL
  - git
socialShareImage: https://www.aleksnyder.net/img/social-images/sign-your-commits.png
date: 2026-01-03
publishdate: 2026-01-03
---

Recently, I decided to sign all my commits pushed to GitHub and ran into an error.  I wanted to share my process on how
I solved my error in case anyone else runs into the same issue. 

{{< h2 >}}Enable Commit Signing with GPG{{< /h2 >}}

Have you ever seen that “Verified” badge on someone's commits? You’ll need to set up GPG signing.

GPG (GNU Privacy Guard) is an open-source implementation of the PGP (Pretty Good Privacy) standard. It lets you encrypt, decrypt, and—most relevant here—sign things to prove they came from you.

When you generate a GPG key, you get two keys:

* Public key — Share this with the world. Others use it to verify your signature or send you encrypted messages.
* Private key — Keep this secret. It proves your identity when signing things (like commits). Don’t lose it. Don’t leak it.

### Signing commits with GPG

Here’s the basic flow to get going:
1. If using macOS, install `gpg` with Homebrew: `brew install gpg`
2. After installing, we'll need to let Git know which GPG binary to use. In your `.gitconfig`, add this:
   {{< prism ini >}}
   [gpg]
       program = /opt/homebrew/bin/gpg
   {{< /prism >}}
   or run:
   {{< prism bash >}}
   git config --global gpg.program /opt/homebrew/bin/gpg
   {{< /prism >}}
3. Generate a key Run:
   {{< prism bash >}}
   gpg --full-generate-key
   {{< /prism >}}
   Pick the defaults unless you know what you’re doing.
4. List your GPG key ID Run:
   {{< prism bash >}}
   gpg --list-secret-keys --keyid-format=long
   {{< /prism >}}
   Grab the long key ID (XXXXXXXXYYYYZZZZ) for the next step.
5. Tell Git to use it Add this to your Git config:
   {{< prism bash >}}
   git config --global user.signingkey <your-key-id>
   git config --global commit.gpgsign true
   {{< /prism >}}
6. Add your public key to GitHub Export your public key:
   {{< prism bash >}}
   gpg --armor --export <your-key-id>
   {{< /prism >}}
   Then go to [https://github.com/settings/gpg/new](https://github.com/settings/gpg/new), paste it in, and you’re set.

Now when you commit and push, GitHub will show a "Verified" badge.

{{< h2 >}}Fatal (error) encounter{{< /h2 >}}

If you're like me, and you followed the above steps only to see the following error:

{{< prism bash >}}
error: gpg failed to sign the data
fatal: failed to write commit object
{{< /prism >}}

Don't worry, it's a simple fix. Just run:

{{< prism bash >}}
brew install pinentry-mac
{{< /prism >}}

Some IDEs, like Jetbrains products, require this graphical GPG program to properly interact with GPG. For more information
about this error, see this [youtrack issue](youtrack.jetbrains.com/articles/SUPPORT-A-1234).

Oh and if you are using Jetbrains products and you still don't see your commits being signed, make sure you have the
"Sign-off commit" checkbox selected in the commit settings.  It's in the same place as the "Check TODO" and "Analyze code" options.