{#
  expects: {
    title: string,
    cards: [{
      title: wysiwyg,
      description: wysiwyg,
      year: string,
      link: string?
    }]
  }
#}

{% if cards|size >= 1 %}
  <section class="timeline">
  {% if title %}
    {% set headingClass = 'timeline__heading' %}
    {% if title == '1980' %}
      {% set headingClass = headingClass + ' timeline__heading--space-below-1' %}
    {% endif %}
    {% if title == '1970' || title == '1990' %}
      {% set headingClass = headingClass + ' timeline__heading--space-below-2' %}
    {% endif %}
    <header class="timeline__header">
      <div class="timeline__timeline-marker"></div>
      <h2 id="{{ title|replace('&amp;', '')|striptags|slugify }}" class="{{ headingClass }}">{{ title|safe }}</h2>
    </header>
  {% endif %}

  {% if cards|size == 1 %}
    {% set timelineSliderClass = 'timeline--no-slider' %}
    {% set timelineGridClass = 'timeline--no-grid' %}
  {% else %}
    {% set timelineSliderClass = 'timeline--slider' %}
    {% set timelineGridClass = 'timeline--grid' %}
  {% endif %}

  {% for card in cards %}
    {% if loop.first %}
      <ul class="{{ timelineSliderClass }}" data-card-count={{ cards|size }}>
    {% endif %}

      {% include 'templates/partials/timeline-card.swig' with { card: card } only %}

    {% if loop.last %}
      </ul>
    {% endif %}
  {% endfor %}

  {% for card in cards %}
    {% if loop.first %}
      <ul class="{{ timelineGridClass }}" data-card-count={{ cards|size }}>
    {% endif %}

      {% include 'templates/partials/timeline-card.swig' with { card: card } only %}

    {% if loop.last %}
      </ul>
    {% endif %}
  {% endfor %}
  </section>
{% endif %}