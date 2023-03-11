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

## [0.1.3] - 2023-03-08

### Added

- Ability to visualize data as nodes
- Ability to visualize dependencies on data as edges

### Changed

- Nodes are now stacked to better utilize space
    >
    > Before now nodes were stacked by type. You couldn't have different nodes on a row. This led to a lot of wasted spaces, as seen below.
    >
    > <img width="573" alt="Screenshot 2023-03-08 at 00 39 47" src="https://user-images.githubusercontent.com/6097630/223591917-81689f80-9734-4a61-afd5-3ea312d5d020.png">
    >
    > Now nodes are stacked in a way to efficiently utilizes available spaces.
    >
    > <img width="1124" alt="Screenshot 2023-03-08 at 01 16 55" src="https://user-images.githubusercontent.com/6097630/223591930-3a51f573-0157-4166-afce-bfab42b70db3.png">

## [0.1.4] - 2023-03-10

### Added

- Ability to upload Terraform files for visualization on the [standalone version](https://terraform-visualizer.netlify.app/).
    >
    > <img width="465" alt="Screenshot 2023-03-10 at 01 28 43" src="https://user-images.githubusercontent.com/6097630/224192196-2d5316c0-8a7f-49ef-9302-b64c1d5e3841.png">
- Color-code nodes in the mini map (bottom right corner of the canvas)
    >
    > <img width="1244" alt="Screenshot 2023-03-10 at 01 37 09" src="https://user-images.githubusercontent.com/6097630/224193358-897e3cff-b8fe-4c02-b63d-4172680efc99.png">

### Fixed

- The canvas now fits into the VS Code window

## [0.1.5] - 2023-03-11

### Added

- Ability to provide the Terraform config by typing it into the in-app text editor on the [standalone version](https://terraform-visualizer.netlify.app/).
    >
    > <img width="1508" alt="Screenshot 2023-03-11 at 02 35 45" src="https://user-images.githubusercontent.com/6097630/224459698-4b3a9435-99c4-4039-9529-c3b52bfe75c7.png">
