# Change Log

All notable changes to the "terraform-visualizer" extension will be documented in this file.

## [0.0.5] - 2023-02-05

- Initial release

## [0.0.6] - 2023-02-19

### Added

- Ability to visualize resources as nodes
- Ability to visualize dependencies between resources as edges

## [0.0.7] - 2023-03-02

### Added

- Ability to visualize modules as nodes
- Ability to visualize dependencies between modules as edges
- Color codes and icons to differentiate resources and modules

### Changed

- Stop installing Terraformer as default viewer for *.tf files (let the user explicitly choose it)

## [0.0.8] - 2023-03-02

### Fixed

- An issue that broke the visualizer whenever the value of a field in a resource or module was `null`
