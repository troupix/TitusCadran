# Change: Update Time Display to Rounded Bubble Style

## Why
The current time display uses a basic bold font with stroke effects. The design should be updated to use a rounded, bubble-style typography with proper depth effects (inner glow, drop shadow) to create a more polished, friendly aesthetic that matches the playful dog theme of the clockface.

## What Changes
- Update time display font to rounded sans-serif style (Fredoka One or similar)
- Add multi-layered visual effects: inner glow, soft drop shadow, and subtle stroke
- Adjust AM/PM positioning to top-right alignment with reduced size (30-40% of digit height)
- Center the time display properly with improved spacing
- Update color palette to cream/off-white (#FCF9ED) with dark taupe outline (#5D544A)
- Implement tight kerning for professional appearance

## Impact
- Affected specs: clockface-ui
- Affected code: resources/styles.css, resources/index.view
- Visual breaking change - time display will look significantly different
- No functional changes to time logic or data display
```

```markdown:openspec/changes/update-time-display-style/tasks.md
## 1. Update CSS Styles
- [ ] 1.1 Update `.time-text` class with rounded font family and new color scheme
- [ ] 1.2 Add multi-layered text-shadow for depth effect (inner glow + drop shadow)
- [ ] 1.3 Update stroke properties for subtle outline
- [ ] 1.4 Adjust font-size and letter-spacing for proper proportions
- [ ] 1.5 Update `.ampm-text` class for top-aligned small caps styling
- [ ] 1.6 Add positioning adjustments for AM/PM alignment

## 2. Update SVG Layout
- [ ] 2.1 Adjust time label positioning for proper centering
- [ ] 2.2 Update AM/PM label positioning to top-right of digits
- [ ] 2.3 Verify text-length attributes accommodate new styling
- [ ] 2.4 Test layout on different screen sizes

## 3. Testing
- [ ] 3.1 Test on Fitbit Simulator (Atlas/Vulcan targets)
- [ ] 3.2 Verify readability in different lighting conditions
- [ ] 3.3 Check performance impact of layered effects
- [ ] 3.4 Validate 12h and 24h time formats
- [ ] 3.5 Test AM/PM visibility and positioning
```

```markdown:openspec/changes/update-time-display-style/specs/clockface-ui/spec.md
## MODIFIED Requirements

### Requirement: Time Display Typography
The time display SHALL use a rounded, bubble-style sans-serif font with multi-layered visual effects to create depth and improve readability against the textured background.

#### Scenario: Time digits rendered with rounded style
- **WHEN** the clockface displays time
- **THEN** digits SHALL use a rounded sans-serif font (Fredoka One or System equivalent)
- **AND** digits SHALL have a cream/off-white fill color (#FCF9ED)
- **AND** digits SHALL have a dark taupe stroke outline (#5D544A, ~2-3px width)
- **AND** digits SHALL have a soft drop shadow (2-4px offset, rgba(61, 43, 31, 0.4))
- **AND** letter spacing SHALL be tight but non-overlapping

#### Scenario: AM/PM indicator positioned correctly
- **WHEN** 12-hour format is active
- **THEN** AM/PM text SHALL be positioned at top-right of the time digits
- **AND** AM/PM font size SHALL be 30-40% of the digit height
- **AND** AM/PM SHALL use small caps or uppercase styling
- **AND** AM/PM SHALL align vertically with the top of the digits

#### Scenario: Time display centered on screen
- **WHEN** the clockface is rendered
- **THEN** the time display SHALL be horizontally centered
- **AND** the time display SHALL be positioned in the upper portion of the screen
- **AND** the time SHALL remain readable against the parchment texture background

### Requirement: Visual Depth Effects
The time display SHALL implement layered visual effects to create a 3D appearance that makes the text appear to float above the background.

#### Scenario: Multi-layer shadow effect applied
- **WHEN** rendering the time display
- **THEN** a thin faux-outline SHALL be applied using text-shadow (0 0 0.5px)
- **AND** a soft drop shadow SHALL be applied (2px 2px 5px with 40% opacity)
- **AND** the combined effect SHALL create depth without compromising readability
- **AND** the effect SHALL not significantly impact rendering performance
```

Now let's validate the proposal:

```bash
openspec validate update-time-display-style --strict