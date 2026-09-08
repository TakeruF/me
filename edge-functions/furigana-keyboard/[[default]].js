const ORIGIN = "https://downloads.hanlu.app";
const PREFIX = "/furigana-keyboard/";
const ALLOWED_METHODS = new Set(["GET", "HEAD"]);

function originUrl(request) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith(PREFIX)) {
    return null;
  }

  return new URL(`${url.pathname}${url.search}`, ORIGIN);
}

function originHeaders(request) {
  const headers = new Headers();
  for (const name of ["accept", "if-modified-since", "if-none-match", "range"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

export async function onRequest(context) {
  const { request } = context;
  if (!ALLOWED_METHODS.has(request.method)) {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  const url = originUrl(request);
  if (!url) return new Response("Not Found", { status: 404 });

  const upstream = await fetch(url, {
    method: request.method,
    headers: originHeaders(request),
    redirect: "error",
  });

  const headers = new Headers(upstream.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "no-referrer");
  return new Response(request.method === "HEAD" ? null : upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}
