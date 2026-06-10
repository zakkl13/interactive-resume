// Self-contained resume template.
//
// No external Typst packages. The visual style is inspired by modern-cv /
// Awesome-CV, but everything lives here so the format can be tuned freely.
// Fonts are supplied via --font-path (see scripts/fetch-fonts.sh):
//   Source Sans 3       body text
//   Roboto              the name in the header
//   Font Awesome 7      contact icons
//
// Public API (used by resume.typ):
//   resume(...)          document-level show rule (header + page setup)
//   resume-entry(...)    one job/education entry (title, place, org, dates)
//   resume-item[...]     bullet list under an entry
//   resume-skill-item()  a "Category: a, b, c" skills row

// ---- Palette ---------------------------------------------------------------
#let default-accent = rgb("#102A1A") // headings, name, positions, tech stack, bullets (dark green)
#let link-color = rgb("#1D4ED8") // hyperlinks (header contacts + body links)
#let ink = rgb("#333333") // body text
#let muted = rgb("#5d5d5d") // secondary lines (org, dates)
#let icon-fill = rgb("#131A28") // contact icons

// ---- Icons -----------------------------------------------------------------
// Font Awesome glyphs drawn directly from the vendored faces.
#let fa-solid(cp) = text(font: "Font Awesome 7 Free Solid", fill: icon-fill, cp)
#let fa-brand(cp) = text(font: "Font Awesome 7 Brands", fill: icon-fill, cp)

#let icons = (
  location: fa-solid("\u{f3c5}"), // location-dot
  email: fa-solid("\u{f0e0}"), // envelope
  phone: fa-solid("\u{f095}"), // phone
  globe: fa-solid("\u{f0ac}"), // globe
  github: fa-brand("\u{f09b}"), // github
  linkedin: fa-brand("\u{f08c}"), // linkedin
)

// Strip the scheme so a URL displays as "zakk.io/resume" not "https://...".
#let display-url(u) = u.replace("https://", "").replace("http://", "")

// ---- Document template -----------------------------------------------------
#let resume(
  author: (:),
  accent-color: default-accent,
  font: ("Source Sans 3",),
  header-font: "Roboto",
  name-size: 30pt,
  base-size: 10pt,
  paper-size: "us-letter",
  margin: (x: 15mm, y: 10mm),
  body,
) = {
  if type(accent-color) == str { accent-color = rgb(accent-color) }

  let fullname = author.firstname + " " + author.lastname

  set document(
    author: fullname,
    title: fullname + " Resume",
    keywords: (
      "Senior Software Engineer",
      "Distributed Systems",
      "Data Engineering",
      "Mobile-Cloud Architecture",
      "LLM Applications",
      "Agentic Engineering",
      "Rust",
      "Java",
      "TypeScript",
      "AWS",
    ),
  )
  // hyphenate: false — ATS text extraction chokes on words split across
  // lines with soft hyphens (e.g. "Compe-tencies"), breaking keyword matching.
  set text(font: font, size: base-size, fill: ink, fallback: true, hyphenate: false)
  set page(paper: paper-size, margin: margin)
  set par(spacing: 0.6em, justify: true, leading: 0.56em)
  set heading(numbering: none, outlined: false)

  // Section headers: accent label followed by a rule to the right edge.
  show heading.where(level: 1): it => block(sticky: true, above: 0.7em, below: 0.4em)[
    #grid(
      columns: (auto, 1fr),
      align: horizon,
      column-gutter: 7pt,
      text(size: 14pt, weight: "bold", fill: accent-color, it.body),
      line(length: 100%, stroke: 0.6pt + accent-color),
    )
  ]

  // ---- Header ----
  // One contact item: icon + (optionally linked) text.
  // Clickable items get link-colored text (no underline); the plain location
  // item stays ink, so clickable vs. not reads at a glance.
  let citem(icon, label, dest: none) = box[
    #icon#h(3.5pt)#if dest != none { link(dest, text(fill: link-color, label)) } else { label }
  ]

  let items = ()
  if "location" in author { items.push(citem(icons.location, author.location)) }
  if "email" in author {
    items.push(citem(icons.email, author.email, dest: "mailto:" + author.email))
  }
  if "phone" in author {
    items.push(citem(icons.phone, author.phone, dest: "tel:" + author.phone))
  }
  if "homepage" in author {
    items.push(citem(icons.globe, display-url(author.homepage), dest: author.homepage))
  }
  // Show the handle, not the name again: recruiters and ATS parsers pull the
  // profile from the visible text, and the name is already the header.
  if "linkedin" in author {
    items.push(citem(
      icons.linkedin,
      "in/" + author.linkedin,
      dest: "https://www.linkedin.com/in/" + author.linkedin,
    ))
  }
  if "github" in author {
    items.push(citem(
      icons.github,
      author.github,
      dest: "https://github.com/" + author.github,
    ))
  }

  set align(center)
  block(below: 3pt)[
    #set text(font: header-font, size: name-size)
    #text(fill: accent-color, weight: "thin", author.firstname)
    #h(0.25em)
    #text(fill: ink, weight: "bold", author.lastname)
  ]
  if "positions" in author and author.positions.len() > 0 {
    block(above: 3pt, below: 5pt)[
      #set text(fill: accent-color, size: 9pt, weight: "medium")
      #smallcaps(author.positions.join("  ·  "))
    ]
  }
  block(above: 0pt)[
    #set text(size: 9pt)
    #items.join(h(10pt))
  ]
  set align(left)

  // Body hyperlinks: link-colored + subtly underlined so they read as
  // clickable. Declared after the header so the contact line (already iconed)
  // stays clean.
  show link: it => underline(
    offset: 2pt,
    stroke: 0.4pt + link-color,
    text(fill: link-color, it),
  )

  body
}

// ---- Entries ---------------------------------------------------------------
// One row of an entry: bold title on the left, secondary text on the right.
#let resume-entry(
  title: none,
  location: "",
  date: "",
  description: "",
  title-link: none,
) = {
  let title-content = if title-link != none { link(title-link, title) } else { title }
  block(above: 0.7em, below: 0.35em, breakable: false)[
    #grid(
      columns: (1fr, auto),
      align: (left + horizon, right + horizon),
      column-gutter: 8pt,
      text(size: 11.5pt, weight: "bold", fill: ink, title-content),
      text(size: 10pt, weight: "medium", fill: ink, location),
    )
    #if description != "" or date != "" {
      grid(
        columns: (1fr, auto),
        align: (left + horizon, right + horizon),
        column-gutter: 8pt,
        text(size: 10pt, weight: "regular", fill: muted, smallcaps(description)),
        text(size: 9pt, weight: "light", fill: muted, date),
      )
    }
  ]
}

// Top-of-page professional summary paragraph (under its own = Summary heading).
#let resume-summary(body) = block(above: 0.2em, below: 0.4em)[
  #set text(size: 9.5pt, weight: "light", fill: icon-fill)
  #body
]

// Role summary line under a company entry (italic, muted).
#let resume-lead(body) = block(above: 0.25em, below: 0.3em)[
  #set text(size: 9.5pt, style: "italic", fill: muted)
  #body
]

// A project/initiative within an entry: bold title with accent tech stack on the right.
#let resume-project(title, stack: "") = {
  block(above: 0.5em, below: 0.1em, breakable: false)[
    #grid(
      columns: (1fr, auto),
      align: (left + horizon, right + horizon),
      column-gutter: 8pt,
      text(size: 10.5pt, weight: "bold", fill: ink, title),
      if stack != "" { text(size: 8.5pt, weight: "regular", fill: default-accent, stack) },
    )
  ]
}

// Bullet list under an entry.
#let resume-item(body) = {
  set text(size: 9.5pt, weight: "light", fill: icon-fill)
  set par(leading: 0.52em)
  set list(indent: 0.6em, body-indent: 0.5em, marker: text(fill: default-accent, [•]))
  block(above: 0.3em, below: 0.5em, body)
}

// ---- Skills ----------------------------------------------------------------
#let resume-skill-item(category, items) = block(below: 0.45em)[
  #grid(
    columns: (3fr, 9fr),
    column-gutter: 10pt,
    align: (left + top, left + top),
    // Ragged-right category only: justifying the narrow column stretches
    // short lines ("Architecture   &   Core") once hyphenation is off. The
    // wide value column stays justified so space compression keeps long
    // skill lists on one line.
    par(justify: false, text(size: 10pt, weight: "bold", category)),
    text(size: 10pt, weight: "light", items.join(", ")),
  )
]
