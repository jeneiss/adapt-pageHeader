define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  class PageHeaderView extends ComponentView {

    preRender() {
      this.listenTo(Adapt, {
        "device:changed": this.onDeviceResize,
        "remove": this.remove
      });
    }

    postRender() {
      this.setReadyStatus();

      this.setupInviewCompletion(".pageheader__header");

      this.setStyles();
      this.extendComponentContainer();
      this.removeBlockPadding();
    }

    onDeviceResize() {
      this.setStyles();
    }

    setStyles() {
      this.setBackgroundImages();
      this.setBackgroundStyles();
      this.setMinimumHeight();
    }

    setBackgroundImages() {
      const backgroundImages = this.model.get("_backgroundImage");

      if (!backgroundImages) return;

      let backgroundImage;

      switch (Adapt.device.screenSize) {
        case "large":
          backgroundImage = backgroundImages._large;
          break;
        case "medium":
          backgroundImage = backgroundImages._medium;
          break;
        default:
          backgroundImage = backgroundImages._small;
      }

      if (backgroundImage) {
        this.$el.parent(".component__container")
          .addClass("has-bg-image")
          .css("background-image", `url(${backgroundImage})`);
      } else {
        this.$el.parent(".component__container")
          .removeClass("has-bg-image")
          .css("background-image", "");
      }
    }

    setMinimumHeight() {
      const minimumHeights = this.model.get("_minimumHeights");

      if (!minimumHeights) return;

      let minimumHeight;

      switch (Adapt.device.screenSize) {
        case "large":
          minimumHeight = minimumHeights._large;
          break;
        case "medium":
          minimumHeight = minimumHeights._medium;
          break;
        default:
          minimumHeight = minimumHeights._small;
      }

      if (minimumHeight) {
        this.$el
          .addClass("has-min-height")
          .css("min-height", `${minimumHeight}px`);
      } else {
        this.$el
          .removeClass("has-min-height")
          .css("min-height", "");
      }
    }

    setBackgroundStyles() {
      const backgroundStyles = this.model.get("_backgroundStyles");

      if (!backgroundStyles) return;

      this.$el.parent(".component__container")
        .css({
          backgroundSize: backgroundStyles._backgroundSize,
          backgroundRepeat: backgroundStyles._backgroundRepeat,
          backgroundPosition: backgroundStyles._backgroundPosition
        });
    }

    extendComponentContainer() {
      const extend = this.model.get("_extendComponentContainer");

      if (!extend) return;

      this.$el.parents(".block__inner")
        .css({
          maxWidth: "100%"
        })
    }

    removeBlockPadding() {
      this.$el.parents(".block__inner")
        .css({
          padding: 0
        })
    }

    onRemove() {}
  }

  PageHeaderView.template = 'pageHeader';

  return Adapt.register('pageHeader', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: PageHeaderView
  });

});
