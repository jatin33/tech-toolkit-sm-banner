# Project Brief: My Tech Toolkit

## Project Overview
**Project Name:** my-tech-toolkit  
**Type:** React + TypeScript + Vite Web Application  
**Current Status:** Advanced Drag & Drop Canvas Implementation Complete  

## Core Purpose
An interactive tech toolkit visualization application featuring a drag-and-drop canvas for creating tech stack mockups on device templates. Users can organize and arrange tech icons on a tablet mockup interface to create visual representations of their technology toolkit.

## Technical Foundation
- **Framework:** React 19.1.0 with TypeScript
- **Build Tool:** Vite 7.0.4
- **Drag & Drop:** HTML5 native drag and drop API with JSON data transfer
- **State Management:** React hooks with complex placement logic
- **Styling:** CSS with custom design system and responsive scaling
- **Code Quality:** ESLint configuration with React-specific rules

## Current State
The project features:
- **Interactive Canvas:** Tablet mockup with responsive scaling and grid overlay
- **Comprehensive Icon Library:** 26 tech icons covering AI/ML, development tools, and platforms
- **Advanced Drag & Drop:** Multi-source dragging, icon replacement, and grid repositioning
- **Smart State Management:** Dynamic sidebar filtering and availability tracking
- **Modular Architecture:** Canvas/DropZoneGrid/GridCell component system
- **Visual Feedback:** Hover states, drag indicators, and interaction cues

## Goals & Scope
**Primary Goal:** Create an intuitive drag-and-drop interface for tech stack visualization
**Secondary Goals:** 
- Support multiple device templates and layouts
- Enable easy sharing and export of created mockups
- Provide comprehensive tech icon library with categorization
- Maintain smooth performance with large icon sets

## Key Decisions
- **Drag & Drop Implementation:** HTML5 native API for cross-browser compatibility
- **Grid System:** Fixed 2x4 layout with absolute positioning for precise control
- **Icon Management:** Dynamic availability tracking with real-time sidebar updates
- **Template System:** Predefined device templates with configurable parameters
- **Component Architecture:** Modular design for easy feature expansion
- **State Strategy:** Local React hooks for immediate responsiveness
- **Visual Design:** Clean, modern interface with semi-transparent overlays
