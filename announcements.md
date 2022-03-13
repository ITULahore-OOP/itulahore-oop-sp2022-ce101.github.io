---
layout: page
title: Announcements
nav_order: 1
[//]: # (nav_exclude: true)
description: A feed containing all of the class announcements.
---

# Announcements

{% assign announcements = site.announcements | reverse %}
{% for announcement in announcements %}
{{ announcement }}
{% endfor %}
