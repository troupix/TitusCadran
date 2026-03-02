# Project Context

## Purpose
A custom clockface application for Fitbit smartwatches (Versa series and Ionic). This project provides a personalized time display and watch interface for Fitbit wearable devices.

## Tech Stack
- **Fitbit SDK**: ~6.1.0 (clockface development framework)
- **Fitbit SDK CLI**: ^1.7.3 (build and deployment tooling)
- **JavaScript/TypeScript**: Application logic
- **SVG**: UI components and graphics
- **CSS**: Styling for watch interface

## Project Conventions

### Code Style
- Use modern JavaScript/TypeScript syntax
- Follow Fitbit SDK conventions and best practices
- Keep clockface logic simple and battery-efficient
- Minimize memory usage (limited device resources)
- Use clear, descriptive variable names

### Architecture Patterns
- **app/**: Main clockface application code (runs on device)
- **common/**: Shared code between app and companion
- **resources/**: SVG graphics, images, and UI assets
- **companion/**: Companion app code (runs on phone) - if needed
- Separation of concerns: UI rendering, time logic, and settings
- Event-driven architecture for sensor data and user interactions

### Testing Strategy
- Manual testing on Fitbit Simulator
- Device testing on target hardware (Atlas/Vulcan = Versa 3, Sense)
- Battery consumption monitoring
- Performance profiling for smooth 60fps rendering
- Test across different watch faces and screen states

### Git Workflow
- Feature branches for new capabilities
- Descriptive commit messages
- Test on simulator before committing
- Version bumps follow semantic versioning

## Domain Context
- **Build Targets**: Atlas (Versa 3, Sense) and Vulcan (Versa 2)
- **App UUID**: 2f30e411-5024-4850-a06c-2790b517c0d6
- **Display Name**: titus-clock
- **Default Language**: en-US
- Clockfaces run in a resource-constrained environment (limited CPU, memory, battery)
- UI updates should be efficient to preserve battery life
- Always-on display considerations for supported devices

## Important Constraints
- **Memory**: Very limited RAM on device (~4-8MB for app)
- **Battery**: Minimize CPU usage and screen updates
- **File Size**: Keep app bundle small for faster installation
- **API Limitations**: Fitbit SDK has specific APIs for sensors, UI, and settings
- **Permissions**: Currently no special permissions requested (can be added if needed)
- **Screen Size**: Must adapt to different device screen dimensions
- **Refresh Rate**: Balance between smooth updates and battery consumption

## External Dependencies
- Fitbit OS (device operating system)
- Fitbit Mobile App (for installation and settings sync)
- Fitbit Developer Portal (for app submission and distribution)
- No external web APIs or cloud services currently configured
