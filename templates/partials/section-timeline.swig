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
{% if title %}
  <h2 id="{{ title|slugify }}">{{ title }}</h2>
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
            {{ card.title|safe }}
          </header>
          <div class="timeline__card-body">
            {{ card.description|safe }}
          </div>
          <div class="timeline__card-footer">
            <p class="timeline__card-footer-year">{{ card.year }}</p>
            <p class="timeline__card-footer-read-more">Read more</p>
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