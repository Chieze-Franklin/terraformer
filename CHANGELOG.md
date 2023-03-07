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

## [0.0.9] - 2023-03-02

### Fixed

- An issue with edges for resources not showing

## [0.1.0] - 2023-03-05

### Added

- Ability to visualize variables as nodes
- Ability to visualize dependencies on variables as edges
- Better detection of variable references in the form of `a.b` in string values.
    > For instance, from the given expression:
    > `base_api_url_sdworx = jsondecode(module.lepaya_stack.rds_db_dns_address, module.network.network_subnet_groups)`
    > The visualizer can now detect the variables `module.lepaya_stack` and `module.network` so that we have 2 lines originating from the `base_api_url_sdworx` attribute and heading to the modules `lepaya_stack` and `network` (as seen in the image below).
    >
    > <img width="1135" alt="Screenshot 2023-03-05 at 21 23 04" src="https://user-images.githubusercontent.com/6097630/222984403-eb2ffebc-11f4-4255-bdd5-5435331ccf4b.png">

## [0.1.1] - 2023-03-07

### Added

- Ability to visualize locals as nodes
- Ability to visualize dependencies on locals as edges
- A minimap to the bottom right of the page to help visualize your entire graph

### Changed

- Move handles (to which the animated lines are connected) from the left to the right

## [0.1.2] - 2023-03-07

### Changed

- All variables are now visualized in one node instead of different nodes
    >
    > <img width="460" alt="Screenshot 2023-03-07 at 19 47 10" src="https://user-images.githubusercontent.com/6097630/223522140-fc4fe84c-ef85-42c8-b19b-5f5414a254fc.png">
