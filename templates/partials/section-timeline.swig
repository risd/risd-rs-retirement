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

{% for card in cards %}
  {% if loop.first %}
    <ul>
  {% endif %}

      <li>
        <div>
          <header>
            {{ card.title|safe }}
          </header>
          <div>
            {{ card.description|safe }}
          </div>
          <div>
            <p>{{ card.year }}</p>
          </div>
          {% if card.link %}
            <a href="{{ card.link }}" target="_blank" rel="noopener">read more</a>
          {% endif %}
        </div>
      </li>

  {% if loop.last %}
    </ul>
  {% endif %}
{% endfor %}