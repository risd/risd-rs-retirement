{#
  expects: {
    card: {
      title: wysiwyg,
      description: wysiwyg,
      year: string,
      link: string?
    }
  }
#}

{% if card && card.title && card.description %}
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
{% endif %}