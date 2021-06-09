{#
  expects: {
    video: {
      original_url: string,
      width: number,
      height: number,
    },
    classString: 'string'
  }
#}

{% if video %}
  {% set videoID = video.original_url|replace('https://vimeo.com/', '', 'g') %}
  {% set videoWidth = video.width %}
  {% set videoHeight = video.height %}
  {% set videoWidthRatio = videoWidth / videoHeight * 100 %}
  {% set videoHeightRatio = videoHeight / videoWidth  * 100 %}

  <iframe
    class="{{ classString }}"
    src="https://player.vimeo.com/video/{{ videoID }}?background=1"
    frameborder="0"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
    allow=autoplay
    style="min-width: {{ videoWidthRatio }}vh; height: {{ videoHeightRatio }}vw;"></iframe>
}
{% endif %}
