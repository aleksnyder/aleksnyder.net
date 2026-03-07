---
title: "3 Useful Go Templates"
description: Go templates make maintaining a large number of Kubernetes pods easier.  Here are my 3 favorite templates.
excerpt: Go templates make maintaining a large number of Kubernetes pods easier.  Here are my 3 favorite templates.
toc: false
tags:
  - TIL
  - go
  - kubernetes
socialShareImage: https://www.aleksnyder.net/img/social-images/3-useful-go-templates.png
date: 2026-03-07T06:33:14-05:00
publishdate: 2026-03-07
---

When you're maintaining a large number of Kubernetes pods, it can become
difficult to debug an issue with multiple pods without checking each pod.
Especially when using Helm.  You might reach for an external tool to monitor
these pods, but I would recommend trying Go templates first.

In these examples, we'll be using `go-template-files` for better readability and
code maintenance.  Otherwise, a developer would need to minify the Go code into a single line and make sure the correct quote
characters are used in the Go template string. For demonstrative purposes, the last example will be run inline to show what it looks
like when not using a template file.

{{< h2 >}}Check for Tainted Nodes{{< /h2 >}}

Use this Go template to identify which nodes have taints configured:

{{< prism go >}}
    {{- define "node-details" -}}
        {{- if $taints := (index .spec "taints") -}}
            {{- println "NODE:" .metadata.name -}}
            {{- println "TAINTS:" -}}
            {{- range $taints -}}
                {{- println " " "Key:" .key -}}
                {{- println " " "Value:" .value -}}
                {{- println " " "Effect:" .effect -}}
            {{- end -}}
        {{- end -}}
    {{- end -}}
            
    {{- block "tainted-nodes" . -}}
        {{- if eq .kind "List" -}}
            {{- range .items -}}
                {{- template "node-details" . -}}
            {{- end -}}
        {{- else -}}
            {{- template "node-details" . -}}
        {{- end -}}
    {{- end -}}
{{< /prism >}}

Then to run the template:
{{< prism bash >}}
    kubectl get nodes -o go-template-file=tainted-nodes.gotemplate
{{< /prism >}}

{{< h2 >}}Error and Warning Event Dashboard{{< /h2 >}}

Use this Go template to print a list of warning/error events, their counts, and the namespace in which they occurred:

{{< prism go >}}
    {{- define "event-details" -}}
        {{- if or (eq .type "Warning") (eq .type "Error") -}}
            {{- println .count "\t" .involvedObject.namespace "\t" .message -}}
        {{- end -}}
    {{- end -}}
        
    {{- block "events" . -}}
        {{- if gt (len .items) 0 -}}
            {{- println "COUNT" "\t" "NAMESPACE" "\t" "MESSAGE" -}}
            {{- range .items -}}
                {{- template "event-details" . -}}
            {{- end -}}
        {{- else -}}
            {{- println "There are no events." -}}
        {{- end -}}
    {{- end -}}
{{< /prism >}}

Then to run the template:
{{< prism bash >}}
kubectl get events -o go-template-file=error-warning-event-dashboard.gotemplate
{{< /prism >}}

{{< h2 >}}Export Kubernetes Secrets{{< /h2 >}}

Use this command to loop through items in a Kubernetes secret and transform those items into the `.env` file format:

{{< prism bash >}}
    kubectl get secret your-secret-name -o go-template='{{range $k, $v := .data}}{{$k}}={{$v | base64decode}}{{"\n"}}{{end}}' > .env
{{< /prism >}}