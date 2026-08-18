# Bluewaves Museum

Build ONLY the interactive browser-based 3D museum experience for Bluewaves Technology.

Do NOT create a landing page, marketing website, homepage, archive page, about page, pricing page, admin dashboard, or other website sections.

When the application loads, the user should immediately enter the virtual museum.

This is a professional proof-of-concept for a proposed Digital Heritage Archive & Interactive 3D Museum. The purpose is to demonstrate that Bluewaves Technology can create a polished, immersive, browser-based museum experience that works on both desktop and mobile.

The experience should feel like a serious digital museum — not a game, not a basic 3D model viewer, and not a generic Three.js demo.

==================================================
CORE EXPERIENCE
==================================================

The central concept is:

THE USER DOES NOT NEED TO WALK THROUGH THE ENTIRE MUSEUM MANUALLY.

Instead, the museum contains predefined destinations, exhibition spaces and points of interest.

The visitor can open a museum navigation/exhibition menu and select a destination.

When a destination is selected:

1. The interface identifies the destination.
2. The camera smoothly transitions toward that location.
3. The camera moves through the museum/environment naturally.
4. The camera stops at a carefully defined viewing position.
5. The selected exhibit becomes the primary focus.
6. The relevant artwork, artifact, photograph, document or 3D object is presented clearly.
7. The user can interact with the exhibit.

The movement must feel cinematic and intentional.

Do NOT simply teleport instantly from one position to another.

Use smooth camera interpolation/tweening so that the visitor feels like they are being guided through the museum.

However, the system should also provide an option for direct/instant teleportation for users who prefer it.

==================================================
MUSEUM-FIRST INTERFACE
==================================================

The application should open directly into the museum.

The initial screen should be:

A brief, elegant loading experience:

"Preparing Museum Experience"

with a progress indicator.

Once loaded, immediately show the 3D museum.

Do not show a traditional website header.

Do not show a hero section.

Do not show a landing page.

The museum IS the application.

==================================================
3D MUSEUM ENVIRONMENT
==================================================

Build the museum architecture so that it can use a real GLB/GLTF model.

Create a dedicated:

/public/models/

directory.

The architecture should allow a real museum model to be added later, for example:

/models/museum.glb

Create a reusable MuseumScene component.

Do not hard-code the entire environment into the application.

If a real GLB/GLTF model is not available, create a sophisticated temporary museum environment using optimized procedural geometry.

The temporary environment should contain:

- Entrance
- Main gallery
- Gallery A
- Gallery B
- Gallery C
- Exhibition walls
- Display pedestals
- Display cases
- Artwork positions
- 3D artifact positions
- Lighting
- Floors
- Ceilings
- Architectural elements

The environment should feel like a real curated museum.

Avoid floating boxes or primitive objects that make the demo look unfinished.

==================================================
DESTINATION SYSTEM
==================================================

This is one of the most important features.

Create a destination system containing predefined museum locations.

Example destinations:

01 — Museum Entrance
02 — Origins Gallery
03 — Cultural Heritage Gallery
04 — Historical Collection
05 — Featured Exhibition
06 — Artifacts Gallery
07 — Heritage & Legacy

Each destination should have:

- ID
- Name
- Description
- Camera position
- Camera target
- Optional exhibit ID
- Gallery
- Thumbnail/image

Example conceptual structure:

Destination:
"Origins Gallery"

Camera Position:
[x, y, z]

Camera Target:
[x, y, z]

When selected, smoothly move the camera to that position and orientation.

==================================================
EXHIBITION NAVIGATION
==================================================

Create a discreet museum navigation button.

Do not make it look like a normal website hamburger menu.

It should feel like a professional museum navigation system.

When opened, display:

MUSEUM MAP / EXPLORE

01 — Entrance
02 — Origins
03 — Culture & Identity
04 — Historical Collection
05 — Featured Exhibition
06 — Heritage & Legacy

Each destination should have:

- Small preview image
- Destination name
- Short description

When the visitor selects one:

Close the navigation panel.

Animate the camera to the destination.

Highlight the selected exhibition.

==================================================
CAMERA MOVEMENT
==================================================

Camera movement must be extremely smooth.

Use interpolation/tweening rather than abrupt position changes.

The transition should:

- Ease in
- Move naturally
- Ease out
- Avoid sudden rotations
- Avoid clipping through walls
- Avoid exposing the outside of the museum
- Maintain a controlled viewing height
- Preserve a comfortable orientation

The movement should feel similar to being guided through a professional virtual exhibition.

Use appropriate camera constraints.

Prevent users from accidentally moving the camera outside the museum.

==================================================
EXHIBIT FOCUS SYSTEM
==================================================

Each important artifact/artwork should have a predefined viewing position.

When the user selects an exhibit:

The camera should smoothly move toward the exhibit.

Then:

- Frame the object
- Center it appropriately
- Orient the camera toward it
- Slightly zoom in
- Reveal the exhibit information interface

The user should feel like:

"I selected this artifact and the museum brought me directly to it."

Do NOT simply display a modal over a random camera position.

The camera movement itself should be part of the experience.

==================================================
ARTIFACTS / EXHIBITS
==================================================

Create approximately 8–12 demonstration exhibits.

They can represent:

- Historical artifacts
- Sculptures
- Cultural objects
- Paintings
- Photographs
- Documents
- 3D objects

Each exhibit should have metadata:

- Name
- Collection
- Period
- Location
- Description
- Image
- Optional 3D model
- Optional audio
- Optional video

Use placeholder content where necessary, but structure everything so real client content can easily replace it.

==================================================
EXHIBIT INTERACTION
==================================================

When a visitor reaches an exhibit, provide a subtle interface.

Example:

--------------------------------
ANCIENT CULTURAL ARTIFACT

19th Century
Cultural Heritage

A brief description of the artifact...

[ EXPLORE EXHIBIT ]
--------------------------------

Additional options may include:

[ VIEW IMAGES ]
[ LISTEN ]
[ WATCH VIDEO ]
[ MORE INFORMATION ]

The interface should not cover the entire screen.

The museum environment must remain visible.

==================================================
3D OBJECT VIEWER
==================================================

For exhibits that contain a 3D model, provide an option:

"VIEW IN 3D"

When selected, allow the visitor to inspect the object.

Features:

- Rotate
- Zoom
- Pan where appropriate
- Reset view
- Close viewer

The 3D object should appear in a clean museum-style presentation.

Do not make it look like a developer/debug viewer.

==================================================
IMAGE EXHIBITS
==================================================

Some exhibits may consist of photographs, paintings or archival images rather than 3D objects.

When selected:

Move the camera toward the image.

Frame the image properly.

Then provide an elegant information panel.

Allow the visitor to:

- Zoom
- View full image
- Read description
- Browse additional images

==================================================
HOTSPOTS
==================================================

Important museum exhibits should have subtle interactive hotspots.

Do not use large glowing gaming-style markers.

Use elegant museum-inspired indicators.

When the user approaches or hovers over an exhibit:

Show:

"Explore Exhibit"

On click:

Move the camera to the exhibit's predefined viewing position.

==================================================
MUSEUM MAP
==================================================

Create a professional museum map.

The map should appear as an overlay without leaving the 3D environment.

It should show:

- Current location
- Exhibition rooms
- Galleries
- Important exhibits
- Available destinations

Users can select a destination from the map.

Selecting a destination should trigger the same smooth camera movement system.

The map should work on desktop and mobile.

==================================================
DESKTOP EXPERIENCE
==================================================

On desktop, provide a highly immersive experience.

Controls should support:

- Mouse movement
- Mouse drag
- Scroll/zoom where appropriate
- Click interaction
- Optional keyboard navigation

Provide a subtle control hint when the user first enters:

"Click an exhibit or select a destination to explore the museum."

Allow optional free exploration if technically appropriate.

However, guided destination navigation remains the primary experience.

==================================================
MOBILE EXPERIENCE
==================================================

Mobile is extremely important.

The same museum experience must work on:

- iPhone
- Android phones
- Tablets

The conceptual experience must remain the SAME.

A mobile visitor should be able to visit the same galleries and exhibits as a desktop visitor.

However, controls should adapt naturally to the device.

Desktop:

- Mouse
- Click
- Drag
- Keyboard where appropriate

Mobile:

- Touch
- Swipe
- Pinch
- Tap

Do NOT simply shrink the desktop interface.

Create a proper mobile interaction model.

For example:

Desktop:
"Click to explore"

Mobile:
"Tap to explore"

Desktop destination navigation can use a side panel.

Mobile can use a bottom sheet or compact full-screen destination selector.

The actual museum content and destination system must remain consistent across both.

==================================================
MOBILE PERFORMANCE
==================================================

Optimize the museum specifically for mobile devices.

Important:

- Optimize 3D models
- Compress textures
- Reduce unnecessary polygon counts
- Use efficient materials
- Lazy-load heavy assets
- Avoid loading every exhibit simultaneously
- Optimize lighting
- Limit unnecessary real-time effects
- Use appropriate rendering settings
- Reduce expensive post-processing on mobile

The goal is:

HIGH VISUAL QUALITY
+
SMOOTH PERFORMANCE

Do not sacrifice usability for visual effects.

==================================================
LOADING SYSTEM
==================================================

Create a professional loading experience.

Display:

"PREPARING YOUR MUSEUM EXPERIENCE"

Show:

- Loading progress
- Asset loading status where appropriate

Do not show a blank white screen.

If the museum model is large, load it progressively where possible.

==================================================
MUSEUM UI
==================================================

The interface must remain minimal.

Permanent UI elements may include:

Top/Corner:

BLUEWAVES TECHNOLOGY

Bottom/Corner:

Museum navigation button

Map button

Help button

Exit/Reset view

Do not create a traditional website navigation bar.

The museum should remain the dominant visual element.

==================================================
VISUAL DESIGN
==================================================

Design language:

PREMIUM
CULTURAL
ELEGANT
IMMERSIVE
INSTITUTIONAL
MODERN

Avoid:

- Gaming aesthetics
- Neon colors
- Excessive gradients
- Excessive glassmorphism
- Generic SaaS components
- Huge UI elements
- Excessive animations

Use restrained colors inspired by:

- Museum interiors
- Natural stone
- Dark wood
- Bronze
- Gold
- Neutral tones

The UI should complement the museum rather than compete with it.

==================================================
LIGHTING
==================================================

Lighting is important.

Create museum-style lighting:

- Soft ambient lighting
- Focused exhibit lighting
- Gallery lighting
- Subtle shadows

Important exhibits should naturally draw attention through lighting.

Avoid excessive dynamic lights that reduce performance.

If using a real GLB model, ensure lighting works correctly with the model's materials.

==================================================
AUDIO
==================================================

Create optional audio narration for selected exhibits.

When an exhibit supports audio:

Show:

▶ PLAY NARRATION

Provide:

- Play
- Pause
- Progress
- Volume

Audio must never autoplay unexpectedly.

==================================================
ACCESSIBILITY
==================================================

Provide:

- Clear readable text
- Good contrast
- Keyboard accessibility where practical
- Touch-friendly controls
- Reduced motion consideration

If a visitor does not want animated camera movement, provide:

"Reduce Motion"

When enabled, camera transitions should become shorter and less cinematic.

==================================================
NAVIGATION EXPERIENCE
==================================================

The visitor experience should feel like:

ENTER MUSEUM
↓
SEE MUSEUM ENVIRONMENT
↓
SELECT DESTINATION
↓
CAMERA SMOOTHLY MOVES THERE
↓
ARRIVE AT EXHIBITION
↓
SELECT EXHIBIT
↓
CAMERA MOVES TO EXHIBIT
↓
EXPLORE ARTIFACT
↓
RETURN TO GALLERY
↓
SELECT ANOTHER DESTINATION

The entire journey should feel coherent.

==================================================
TECHNICAL ARCHITECTURE
==================================================

Use:

React
TypeScript
Vite
Three.js
React Three Fiber
@react-three/drei
Tailwind CSS

Use reusable components.

Suggested structure:

/components/museum/
    MuseumScene
    MuseumModel
    DestinationNavigator
    DestinationMenu
    MuseumMap
    Exhibit
    ExhibitHotspot
    ExhibitPanel
    ExhibitViewer
    CameraController
    LoadingScreen
    MuseumControls
    AudioPlayer

/data/
    destinations
    exhibits
    galleries

/public/models/
    museum.glb

/public/assets/
    images
    audio
    textures

Keep museum data separate from UI components.

==================================================
CAMERA SYSTEM
==================================================

Implement a reusable camera controller.

It should support:

goToDestination(destination)

goToExhibit(exhibit)

resetCamera()

The destination data should contain:

position
target
duration
easing

Example conceptual data:

{
  id: "gallery-01",
  name: "Origins Gallery",
  position: [x, y, z],
  target: [x, y, z],
  duration: 1800
}

The exact implementation is up to you.

The key requirement is extremely smooth camera transitions.

==================================================
REAL MODEL SUPPORT
==================================================

The application MUST be ready for a real museum GLB/GLTF model.

Do not build the system around the temporary geometry.

Create a clean integration point where the real model can be inserted.

If a real model is provided later, the museum should be able to use it without rebuilding the entire application.

Also create a way to define exhibit anchor points inside the museum.

For example:

Exhibit:
"Artifact 01"

Anchor:
[x, y, z]

Camera:
[x, y, z]

Target:
[x, y, z]

This allows us to precisely control where visitors are taken when they select an exhibit.

==================================================
DEMO CONTENT
==================================================

Use fictional/demo cultural heritage content.

Do not imply that placeholder artifacts are authentic historical records.

Clearly structure the data so it can later be replaced with real client content.

Create enough exhibits to make the museum feel populated but do not overload it.

==================================================
POLISH
==================================================

The most important requirement is that the final experience feels POLISHED.

Pay special attention to:

- Camera movement
- Transition timing
- Exhibit framing
- UI animations
- Loading experience
- Mobile interaction
- 3D performance
- Typography
- Spacing
- Lighting
- Navigation consistency

Do not stop at making the 3D model appear on screen.

The objective is to demonstrate a COMPLETE INTERACTIVE MUSEUM EXPERIENCE.

==================================================
FINAL REQUIREMENT
==================================================

When the user opens the application, they should immediately feel:

"I am inside a virtual museum."

The experience should demonstrate that Bluewaves Technology understands not only how to create 3D environments, but how to turn them into a professional, accessible, optimized and interactive web museum experience.

Build ONLY the museum experience.

No landing page.
No marketing website.
No homepage.
No blog.
No pricing.
No contact page.

The museum is the entire application. add some images to the museum so guest can see it

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
