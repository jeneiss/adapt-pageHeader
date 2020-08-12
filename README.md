# adapt-pageHeader

**pageHeader** is a *presentation component* that can be used at the top of a page to provide page header functionality (text and image or background image).

### When to use
Use **pageHeader** in place of the built-in theme page header functionallity for both the Framework and the Authoring Tool. Use with the built-in v5 theme class 'hide-page-header'.

## Settings Overview

The attributes listed below are used in *components.json* to configure **pageHeader**, and are properly formatted as JSON in [*example.json*](https://github.com/kineojen/adapt-pageHeader/blob/master/example.json).

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**\_component** (string): This value must be: `pageHeader`. (One word.)

**\_classes** (string): CSS class name to be applied to **PageHeader**’s containing `div`. The class must be predefined in one of the Less files (see below). Separate multiple classes with a space.

**\_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.

**instruction** (string): This optional text appears above the component. It is frequently used to guide the learner’s interaction with the component.

**\_extendComponentContainer** (boolean): When true, expands component container to width of block. When false, inherits default component width.

**\_hasTextBelowImage** (boolean): When true, image appears in `img` element above text. When false, image is set as a background-image on the component container.

**\_images** (object): The image that acts as either background to component or an image above text. It contains values for **alt**, **large**, **medium** and **small**.

>**large** (string): File name (including path) of the image used with large device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).

>**medium** (string): File name (including path) of the image used with medium device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).  

>**small** (string): File name (including path) of the image used with small device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).

>**alt** (string): This text becomes the image’s `alt` attribute. Only used when `"_hasTextBelowImage": true`.

**_backgroundStyles** (object): Additional attributes available to customise how background images display. **Only used when `"_hasTextBelowImage": false`.** The backgroundStyles object contains values for **\_backgroundRepeat**, **\_backgroundSize** and **\_backgroundPosition**.

>**\_backgroundRepeat** (string): This attribute defines how the background image repeats. Properties include **repeat**, **repeat-x**, **repeat-y** and **no-repeat**.
Repeat-x: The background image is repeated only horizontally. Repeat-y: The background image is repeated only vertically.

>**\_backgroundSize** (string): This attribute defines the size the background image display. Properties include **auto**, **cover** and **contain**.
Auto: The background image is displayed in its original size. Cover: Resize the background image to cover the entire container, even if it has to stretch or crop the image. Contain: Resize the background image to make sure the image is fully visible.

**_minimumHeights** (object): The minimum heights attribute group specifies the minimum height of the image container at different device widths (`_large`, `_medium`, and `_small`).  **Only used when `"_hasTextBelowImage": false`.**

>**\_large** (number): The minimum height should only be used in instances where the image container height needs to be greater than the content e.g. to prevent a background image being cropped.

>**\_medium** (number): The minimum height should only be used in instances where the image container height needs to be greater than the content e.g. to prevent a background image being cropped.

>**\_small** (number): The minimum height should only be used in instances where the image container height needs to be greater than the content e.g. to prevent a background image being cropped.

### Pre-defined classes

**text-align-vert-center**: Vertically aligns component to center in component container. **Only used when `"_hasTextBelowImage": false`.**

**text-align-vert-bottom**: Vertically aligns component to bottom in component container. **Only used when `"_hasTextBelowImage": false`.**


----------------------------
**Version number:**  1.0.0  
**Framework versions:**  5.3+  
**Vanilla versions:**  5.2+  
**Author / maintainer:**  Kineo  
**Accessibility support:**  WAI AA  
**RTL support:**  Yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 12+13 for macOS/iOS/iPadOS, Opera  