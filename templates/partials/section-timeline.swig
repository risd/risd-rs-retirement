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
      <h2 id="{{ title|slugify }}" class="{{ headingClass }}">{{ title }}</h2>
      <div class="timeline__timeline-marker"></div>
    </header>
  {% endif %}

  {% if cards|size == 1 %}
    {% set timelineClass = 'timeline--no-slider' %}
  {% else %}
    {% set timelineClass = 'timeline--slider' %}
  {% endif %}

  {% for card in cards %}
    {% if loop.first %}
      <ul class="{{ timelineClass }}" data-card-count={{ cards|size }}>
    {% endif %}

        <li class="timeline__card-container">
          <div class="timeline__card">
            {% if card.link %}
              <a href="{{ card.link }}" target="_blank" rel="noopener" class="timeline__card-link">
            {% endif %}
            <div class="timeline__card-hat">
              <div class="timeline__card-hat-left"></div>
              <div class="timeline__card-hat-center"></div>
              <div class="timeline__card-hat-right"></div>
            </div>
            <header class="timeline__card-header">
              {{ card.title|removeEmptyPTag|safe }}
            </header>
            <div class="timeline__card-body">
              {{ card.description|removeEmptyPTag|safe }}
              {% if card.link %}
                <p class="timeline__card-body-read-more">Read more</p>
              {% endif %}
            </div>
            <div class="timeline__card-footer">
              <p class="timeline__card-footer-year">{{ card.year }}</p>
            </div>
            <div class="timeline__card-shoe">
              <div class="timeline__card-shoe-left"></div>
              <div class="timeline__card-shoe-center"></div>
              <div class="timeline__card-shoe-right"></div>
            </div>
            {% if card.link %}
              </a>
            {% endif %}
          </div>
        </li>

    {% if loop.last %}
      </ul>
    {% endif %}
  {% endfor %}
  </section>
{% endif %}