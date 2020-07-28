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

      this.processImages();
      this.extendComponentContainer();
      this.removeBlockPadding();
    }

    onDeviceResize() {
      this.processImages();
    }

    processImages() {
      const images = this.model.get("_image");
      const isImg = this.model.get("_textBelowImage");

      if (!images) return;

      let image;

      switch (Adapt.device.screenSize) {
        case "large":
          image = images._large;
          break;
        case "medium":
          image = images._medium;
          break;
        default:
          image = images._small;
      }

      isImg ? this.setImage(image) : this.setBackgroundImage(image);
    }

    setImage(image) {
      this.$(".js-pageheader-image").attr("src", image);
      this.$el.addClass("has-text-below-image");
    }

    setBackgroundImage(image) {
      this.setBackgroundStyles();
      this.setMinimumHeight();

      if (image) {
        this.$el
          .addClass("has-bg-image")
          .css("background-image", `url(${image})`);
      } else {
        this.$el
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

      this.$el
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
        .css({ maxWidth: "100%" })
    }

    removeBlockPadding() {
      this.$el.parents(".block__inner")
        .css({ padding: 0 })
    }

    onRemove() {}
  }

  PageHeaderView.template = 'pageHeader';

  return Adapt.register('pageHeader', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: PageHeaderView
  });

});
