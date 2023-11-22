<script>
  export let appname = import.meta.env
    ? import.meta.env.VITE_APPNAME
    : "(.env) VITE_APPNAME=YourName)";
</script>

<span>{appname}</span>
