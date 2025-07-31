# System Patterns

## Architecture Overview
**Core Architecture:** React + TypeScript component-based application with HTML5 drag and drop API + Canvas export system

**Component Hierarchy:**
```
App (main state management)
├── Header (navigation/branding)
├── Sidebar (icon library + search)
└── Canvas (drag target)
    └── DropZoneGrid (grid layout)
        └── GridCell[] (individual drop zones)
└── Footer (undo/redo + export controls)
    ├── DownloadTwitter (Twitter banner export)
    └── DownloadLinkedIn (LinkedIn banner export)
```

**State Management Pattern:**
- **Central State:** App.tsx manages `placedIcons` array and filtering logic
- **Prop Drilling:** State passed down through component hierarchy
- **Callback Pattern:** Child components communicate up via callback functions
- **Dynamic Filtering:** Real-time sidebar icon availability based on placed icons
- **Grid Completion Logic:** Export buttons disabled until all 8 positions filled

## Key Technical Patterns

### Drag and Drop Implementation
**Pattern:** HTML5 native drag and drop with JSON data transfer
- **Drag Source:** Sidebar icons + placed grid icons (for repositioning)
- **Drop Target:** Grid cells with position validation
- **Data Transfer:** JSON payload containing icon metadata + grid context
- **State Updates:** Immediate UI updates with availability recalculation

### Icon State Management
**Pattern:** Availability-based filtering with dynamic updates
- **Available Icons:** Icons not currently placed on grid
- **Placed Icons:** Icons with grid positions and timestamps
- **Search Filtering:** Client-side filtering with case-insensitive matching
- **State Synchronization:** Sidebar updates automatically when grid changes

### Grid Positioning System
**Pattern:** Template-based coordinate mapping
- **Template Configuration:** Predefined tablet dimensions and screen bounds
- **Grid Calculation:** Row/column to pixel coordinate conversion
- **Responsive Scaling:** Automatic scaling based on canvas size
- **Position Validation:** Prevents overlapping and out-of-bounds placement

### Canvas Export System
**Pattern:** HTML5 Canvas-based image generation with platform-specific configurations
- **Canvas Creation:** Dynamic canvas element with high-DPI scaling (2x)
- **Image Composition:** Tablet mockup + positioned tech icons rendered to canvas
- **Platform Formats:** Twitter (1500×500px) and LinkedIn (1584×396px) dimensions
- **Export Process:** Canvas → Blob → File download with automatic naming
- **Error Handling:** Comprehensive image loading and canvas operation error management

### Undo/Redo System
**Pattern:** Command pattern with useReducer for state management
- **Action Types:** PLACE_ICON, REPLACE_ICON, MOVE_ICON, SWAP_ICONS
- **History Management:** 50-action limit with past/present/future state tracking
- **Keyboard Shortcuts:** Cross-platform Ctrl+Z/Y (Cmd+Z/Y on Mac) support
- **State Transitions:** Predictable state changes through reducer functions

## Component Design Patterns

### GridCell Component
**Responsibility:** Individual drop zone with drag/drop handling
- **State:** Local hover and drag-over visual feedback
- **Props:** Position data, placed icon data, event handlers
- **Drag Handling:** Accept drops, validate positions, trigger state updates
- **Visual Feedback:** Hover states, drag previews, placement indicators

### Canvas Component
**Responsibility:** Main tablet mockup and grid container
- **Template Rendering:** Display tablet image with responsive scaling
- **Grid Management:** Create and position GridCell components
- **Drag Coordination:** Handle drag events and coordinate with App state
- **Visual Layout:** Maintain proper aspect ratios and positioning

### Download Components
**Responsibility:** Platform-specific banner export functionality
- **Export Logic:** Generate canvas-based images with proper dimensions
- **Loading States:** Handle export progress and user feedback
- **Grid Validation:** Disable export until all positions are filled
- **Platform Integration:** Twitter/LinkedIn specific formatting and branding

### App Component
**Responsibility:** Central state management and coordination
- **State Management:** Maintain placed icons array and search state
- **Icon Filtering:** Calculate available icons and apply search filters
- **Event Coordination:** Handle drag events and state updates from children
- **Prop Distribution:** Pass state and handlers to child components
- **Export Coordination:** Provide placed icons data to download components

## Critical Implementation Paths

### Current Architecture
1. **Drag & Drop System:** Complete HTML5 native implementation
2. **Grid Management:** Template-based positioning with validation
3. **Icon Lifecycle:** Sidebar → Grid → Repositioning → Replacement cycle
4. **Undo/Redo System:** Full command pattern implementation
5. **Export System:** Canvas-based image generation for social media

### Data Flow Patterns
- **Icon Placement:** Sidebar drag → Grid drop → State update → Sidebar filter
- **Icon Repositioning:** Grid drag → Grid drop → State update → Visual feedback
- **Export Flow:** Grid validation → Canvas generation → Image download
- **History Tracking:** Action dispatch → State update → History management

## Technical Decisions

### Completed Decisions
- **Drag & Drop API:** HTML5 native drag and drop with JSON data transfer
- **State Architecture:** React hooks with useReducer for complex state management
- **Icon Management:** Dynamic filtering with real-time availability tracking
- **Grid System:** Fixed 2x4 grid with absolute positioning
- **Visual Design:** Clean tablet mockup with semi-transparent overlays
- **Export Format:** PNG with high-DPI scaling for quality
- **Platform Support:** Twitter and LinkedIn banner dimensions

### Integration Points
- **Canvas Export Utility:** Shared canvas generation logic across platforms
- **Template System:** Configurable device templates for future expansion
- **Social Media Icons:** Integrated platform branding in download buttons
- **Error Handling:** Comprehensive error management for network and canvas operations
- **Performance Optimization:** Efficient re-rendering and state updates
