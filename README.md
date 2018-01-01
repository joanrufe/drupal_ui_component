# Drupal UI Components Provider #
This is a drupal module that contain a skeleton to build modern javascript components and provide them through Drupal libraries API. 

## Instalation ##
Clone this repo into your modules drupal directory and execute `npm install` inside module directory.

Enable module and go to admin/structure/layout to place the block in a region.

## Usage ##
Compile a build typing `npm run build` and clear cache to get a new build working in drupal. 

To start development server just type `npm start`.

This project is using [poi](https://poi.js.org) to facilitate webpack transpilation.

### Files and directories ###
- **js-src** Put here all your component javascript
- **dist** Contain build ready for production
- **poi.config.js** Contain poi configuration (see [docs](https://poi.js.org/#/home))
- **drupal_ui_component.libraries.yml** Here you can define libraries

Drupal is connected to the component using whaterwheel.js. In [api.js](./js-src/datepicker/api.js)) file you can change credentials 