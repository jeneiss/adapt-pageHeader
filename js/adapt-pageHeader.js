define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  class BannerView extends ComponentView {

    preRender() {
      this.listenTo(Adapt, {
        "device:changed": this.onDeviceResize,
        "remove": this.remove
      });
    }

    postRender() {
      this.setReadyStatus();

      if (this.model.get('_setCompletionOn') === 'inview') {
        this.setupInviewCompletion();
      }

      this.setStyles();
    }

    onDeviceResize() {
      this.setStyles();
    }

    setStyles() {
      this.setImage();
      this.setMinimumHeight();
      this.setFullLayoutOptions();
    }

    setImage() {
      const images = this.model.get("_graphic");

      if (!images) return;

      let image;

      switch (Adapt.device.screenSize) {
        case "large":
          image = images.large;
          break;
        case "medium":
          image = images.medium;
          break;
        default:
          image = images.small;
      }

      this.$('.js-banner-set-image-src').attr('src', image);

      this.$('.banner__widget').imageready(() => this.setReadyStatus());
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
          .css("min-height", minimumHeight + "px");
      } else {
        this.$el
          .removeClass("has-min-height")
          .css("min-height", "");
      }
    }

    setFullLayoutOptions() {
      const options = this.model.get("_fullLayoutOptions");

      if (!options || this.model.get("_layout") !== "full") return;

      if (Adapt.device.screenSize === "large") {
        this.$(".banner__header").css({
          top: `${options._top}%`,
          left: `${options._left}%`,
          width: `${options._width}%`
        });
      } else {
        this.$(".banner__header").css({
          top: "",
          left: "",
          width: ""
        });
      }
    }

    onRemove() {}
  }

  BannerView.template = 'banner';

  return Adapt.register('banner', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: BannerView
  });

});
