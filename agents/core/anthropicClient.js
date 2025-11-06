async function callClaude(prompt, { model = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514' } = {}) {
  // Use Claude Sonnet 4 (latest and most powerful)
  // Fallback to correct model names if user specifies old versions
  const modelMap = {
    'claude-4': 'claude-sonnet-4-20250514',
    'claude-sonnet-4': 'claude-sonnet-4-20250514',
    'claude-3-5-sonnet': 'claude-3-5-sonnet-20241022',
    'claude-3-5-sonnet-20241022': 'claude-3-5-sonnet-20241022',
    'claude-3-opus': 'claude-3-opus-20240229'
  }
  model = modelMap[model] || model
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) {
    return { ok: false, error: 'Missing ANTHROPIC_API_KEY in environment', output: '' }
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    })

    if (!response.ok) {
      const error = await response.text()
      return { ok: false, error: `Claude API error: ${response.status} - ${error}`, output: '' }
    }

    const data = await response.json()
    const output = data.content?.[0]?.text || ''
    return { ok: true, output, error: '' }
  } catch (error) {
    return { ok: false, error: `Network error: ${error.message}`, output: '' }
  }
}

module.exports = { callClaude }
