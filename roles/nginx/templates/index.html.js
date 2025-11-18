<!doctype html>
<html>
  <head><meta charset="utf-8"><title>{{ site_name }}</title></head>
  <body>
    <h1>{{ site_name }}</h1>
    <p>{{ site_content }}</p>
    <p>Deployed on {{ ansible_fqdn | default(inventory_hostname) }}</p>
  </body>
</html>
