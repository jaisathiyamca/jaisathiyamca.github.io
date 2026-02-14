---
layout: default
title: Blog
---

# Daily Challenges & Learning

Welcome to my blog where I document the challenges I face daily, solutions I discover, and lessons I learn as a Senior Java Developer and Software Architect.

Each post represents a real-world scenario, problem, or insight from my professional journey. I hope these posts help you grow in your development career.

---

## All Blog Posts

<div class="blog-list">
{% for post in site.posts %}
<article class="blog-post-card">
    <div class="date">{{ post.date | date: "%b %d, %Y" }}</div>
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p>{{ post.excerpt | strip_html | truncatewords: 40 }}</p>
    <div class="tags">
        {% for tag in post.tags %}
            <span class="tag">#{{ tag }}</span>
        {% endfor %}
    </div>
    <a href="{{ post.url }}" class="read-more">Read More →</a>
</article>
{% endfor %}
</div>

---

## Categories

{% assign tags = site.posts | map: 'tags' | join: ',' | split: ',' | uniq %}

<div class="skills-grid" style="margin-top: 2rem;">
{% for tag in tags %}
    <div class="skill-category">
        <h3>#{{ tag }}</h3>
        <p>
            {% assign count = site.posts | where_exp: "post", "post.tags contains tag" | size %}
            {{ count }} article{{ count | plus: 0 | minus: 1 | plus: 1 | divided_by: 1 }}
        </p>
    </div>
{% endfor %}
</div>