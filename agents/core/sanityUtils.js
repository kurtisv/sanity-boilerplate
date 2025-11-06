const RULES = {
  statsNumberIsString: true,
  requireArrayKeys: true,
  featureGridEmojiIcon: true,
  contactFieldTypesWhitelist: ['name','email','phone','company','subject','message','textarea','url','custom']
}

function validateBlock(block) {
  // Minimal stub: extend with schema-aware checks
  return { ok: true, issues: [] }
}

module.exports = { RULES, validateBlock }
