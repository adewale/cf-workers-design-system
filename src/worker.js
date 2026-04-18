export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const wantsMarkdown = acceptsMarkdown(request.headers.get('Accept'))
    const canNegotiateMarkdown = url.pathname === '/' || url.pathname === '/index.html'

    let assetRequest = request
    let negotiatedMarkdown = false

    if (canNegotiateMarkdown && wantsMarkdown) {
      const markdownUrl = new URL('/site.md', url)
      assetRequest = new Request(markdownUrl.toString(), request)
      negotiatedMarkdown = true
    }

    const assetResponse = await env.ASSETS.fetch(assetRequest)
    const response = new Response(assetResponse.body, assetResponse)
    const isMarkdownResponse = isMarkdownContentType(response.headers.get('content-type'))

    applyDiscoveryHeaders(response.headers, url.origin)

    if (canNegotiateMarkdown) {
      appendVary(response.headers, 'Accept')
    }

    if (isMarkdownResponse) {
      response.headers.set('Content-Signal', 'ai-train=yes, search=yes, ai-input=yes')

      if (request.method !== 'HEAD') {
        const cloned = response.clone()
        const markdown = await cloned.text()
        response.headers.set('X-Markdown-Tokens', String(estimateTokenCount(markdown)))
      }
    }

    if (negotiatedMarkdown) {
      response.headers.set('X-Agent-Markdown', 'negotiated')
    }

    return response
  }
}

function acceptsMarkdown(acceptHeader) {
  if (!acceptHeader) return false
  return acceptHeader.toLowerCase().includes('text/markdown')
}

function isMarkdownContentType(contentType) {
  return String(contentType || '').toLowerCase().includes('text/markdown')
}

function estimateTokenCount(markdown) {
  return Math.max(1, Math.ceil(markdown.length / 4))
}

function appendVary(headers, value) {
  const current = headers.get('Vary')
  if (!current) {
    headers.set('Vary', value)
    return
  }

  const values = current
    .split(',')
    .map(part => part.trim().toLowerCase())

  if (!values.includes(value.toLowerCase())) {
    headers.set('Vary', `${current}, ${value}`)
  }
}

function applyDiscoveryHeaders(headers, origin) {
  const links = [
    `<${origin}/manifest.json>; rel="alternate"; type="application/json"`,
    `<${origin}/llms.txt>; rel="describedby"; type="text/plain"`,
    `<${origin}/agent-index.json>; rel="alternate"; type="application/json"`,
    `<${origin}/examples.json>; rel="alternate"; type="application/json"`,
    `<${origin}/site.md>; rel="alternate"; type="text/markdown"`
  ]

  headers.set('Link', links.join(', '))
}
