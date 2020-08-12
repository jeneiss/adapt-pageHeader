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

      if (!images) return;

      const isImg = this.model.get("_hasTextBelowImage");

      const image = images[`_${Adapt.device.screenSize}`];

      isImg ? this.setImage(image) : this.setBackgroundImage(image);
    }

    setImage(image) {
      this.$(".js-pageheader-image").attr("src", image);
      this.$el.addClass("has-text-below-image");
    }

    setBackgroundImage(image) {
      const $parent = this.$el.parent(".component__container");

      this.setBackgroundStyles($parent);
      this.setMinimumHeight($parent);

      $parent
        .toggleClass(["has-bg-image", "pageheader__container"], Boolean(image))
        .css("background-image", image ? `url(${image})` : "");
    }

    setMinimumHeight($parent) {
      const minimumHeights = this.model.get("_minimumHeights");

      if (!minimumHeights) return;

      const minimumHeight = minimumHeights[`_${Adapt.device.screenSize}`];

      $parent
        .toggleClass("has-min-height", Boolean(minimumHeight))
        .css("min-height", minimumHeight ? `${minimumHeight}px` : "");
    }

    setBackgroundStyles($parent) {
      const backgroundStyles = this.model.get("_backgroundStyles");

      if (!backgroundStyles) return;

      $parent
        .css({
          backgroundSize: backgroundStyles._backgroundSize,
          backgroundRepeat: backgroundStyles._backgroundRepeat,
          backgroundPosition: backgroundStyles._backgroundPosition
        });
    }

    extendComponentContainer() {
      const extend = this.model.get("_extendComponentContainer");

      if (!extend) return;

      this.$el.parents(".block__inner").css("maxWidth", "100%");
    }

    removeBlockPadding() {
      this.$el.parents(".block__inner").css("padding", 0);
    }

    onRemove() {}
  }

  PageHeaderView.template = 'pageHeader';

  return Adapt.register('pageHeader', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: PageHeaderView
  });

});
