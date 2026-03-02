# Change: Remove Inline CSS to Stylesheet

## Why
Inline CSS in SVG files makes the UI harder to maintain and update. Centralizing all styles in `resources/styles.css` improves:
- Maintainability: Single source of truth for all visual styling
- Consistency: Easier to ensure uniform styling across components
- Performance: Potentially better rendering performance with external stylesheets
- Developer experience: Easier to find and modify styles

## What Changes
- Extract all inline `style` attributes from SVG elements in `resources/index.view` (or `resources/index.gui`)
- Move extracted styles to `resources/styles.css` with appropriate class names
- Replace inline styles with `class` attributes referencing the stylesheet
- Ensure all visual appearance remains identical after the change

## Impact
- Affected specs: `ui-styling`
- Affected code: 
  - `resources/index.view` or `resources/index.gui` (SVG markup)
  - `resources/styles.css` (stylesheet)
- **No breaking changes**: Visual appearance remains the same
- **No functional changes**: Only refactoring of style definitions
```

```markdown:openspec/changes/remove-inline-css-to-stylesheet/tasks.md
# Implementation Tasks

## 1. Audit Current Inline Styles
- [ ] 1.1 Identify all SVG elements with inline `style` attributes in view file
- [ ] 1.2 Document each inline style and its associated element
- [ ] 1.3 Determine appropriate CSS class names for each style

## 2. Update Stylesheet
- [ ] 2.1 Add new CSS classes to `resources/styles.css` for inline styles
- [ ] 2.2 Ensure class names follow existing naming conventions
- [ ] 2.3 Preserve all style properties exactly as they appear inline

## 3. Update SVG Markup
- [ ] 3.1 Replace inline `style` attributes with `class` attributes
- [ ] 3.2 Remove all inline `style` attributes from SVG elements
- [ ] 3.3 Verify no inline styles remain in the view file

## 4. Testing
- [ ] 4.1 Test in Fitbit Simulator to verify visual appearance unchanged
- [ ] 4.2 Test on target devices (Atlas/Vulcan) if possible
- [ ] 4.3 Verify all UI elements render correctly
- [ ] 4.4 Check for any performance differences

## 5. Documentation
- [ ] 5.1 Update any relevant comments in code
- [ ] 5.2 Ensure CSS classes are well-organized and documented
```

```markdown:openspec/changes/remove-inline-css-to-stylesheet/specs/ui-styling/spec.md
# UI Styling Capability - Delta Specification

## ADDED Requirements

### Requirement: Centralized Stylesheet Management
The clockface SHALL define all visual styling in the external stylesheet (`resources/styles.css`) rather than inline in SVG markup.

#### Scenario: All styles in external stylesheet
- **GIVEN** the clockface UI is rendered
- **WHEN** inspecting the SVG markup in `resources/index.view` or `resources/index.gui`
- **THEN** no elements SHALL contain inline `style` attributes
- **AND** all styling SHALL be applied via `class` attributes referencing `resources/styles.css`

#### Scenario: Visual appearance preserved
- **GIVEN** inline styles have been moved to the stylesheet
- **WHEN** the clockface is displayed on the device
- **THEN** all UI elements SHALL appear visually identical to the previous inline-styled version
- **AND** no visual regressions SHALL be present

### Requirement: CSS Class Naming Convention
CSS classes in the stylesheet SHALL follow a consistent, descriptive naming convention.

#### Scenario: Readable class names
- **GIVEN** a CSS class in `resources/styles.css`
- **WHEN** reviewing the class name
- **THEN** the name SHALL clearly indicate the element or component it styles
- **AND** the name SHALL follow kebab-case convention (e.g., `time-text`, `battery-icon`)

## MODIFIED Requirements

### Requirement: SVG Element Styling
SVG elements in the clockface view SHALL be styled using CSS classes rather than inline styles.

#### Scenario: Class-based styling
- **GIVEN** an SVG element requiring visual styling
- **WHEN** the element is defined in the view file
- **THEN** the element SHALL use a `class` attribute to reference stylesheet classes
- **AND** the element SHALL NOT contain inline `style` attributes

#### Scenario: Multiple classes supported
- **GIVEN** an element requiring multiple style rules
- **WHEN** defining the element's styling
- **THEN** multiple CSS classes MAY be applied via space-separated class names
- **AND** all classes SHALL be defined in `resources/styles.css`
```

Now let me validate the change:

```bash
openspec validate remove-inline-css-to-stylesheet --strict